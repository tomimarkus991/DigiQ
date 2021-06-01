import {
  Arg,
  Args,
  Ctx,
  Int,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import { MyContext } from '../types';
import argon2 from 'argon2';
import { getConnection } from 'typeorm';
import { COOKIE_NAME, REGISTER_USER } from '../constants';
import { User } from './entities/user.entity';
import { LoginUserInput } from './dto/login-user.input';
import { UserResponse } from './dto/user.response';
import { RegisterUserInput } from './dto/register-user.input';
import { validateRegister } from './utils/validateRegister';

@Resolver(User)
export class UserResolver {
  // Get current user
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    const userId = req.session.userId;
    // you are not logged in
    if (!userId) {
      return null;
    }
    return await User.findOne(userId);
  }
  // Get one User
  @Query(() => User, { nullable: true })
  user(@Arg('id', () => Int) id: number): Promise<User | undefined> {
    return User.findOne(id);
  }

  // Get one User
  @Query(() => User, { nullable: true })
  userByEmail(
    @Arg('email', () => String) email: string,
  ): Promise<User | undefined> {
    return User.findOneOrFail({ where: { email } });
  }

  // Register
  @Mutation(() => UserResponse)
  async register(
    @Arg('registerUserInput') registerUserInput: RegisterUserInput,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    // check if there are errors
    const errors = validateRegister(registerUserInput);

    const { username, email, password } = registerUserInput;

    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(password);
    let user;

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username,
          email,
          password: hashedPassword,
        })
        .returning('*')
        .execute();
      user = result.raw[0];
      await pubSub.publish(REGISTER_USER, user);
    } catch (error) {
      if (error.code === '23505') {
        if (error.detail.includes('username')) {
          return {
            errors: [
              {
                field: 'username',
                message: 'Username already taken',
              },
            ],
          };
        } else if (error.detail.includes('email')) {
          return {
            errors: [
              {
                field: 'email',
                message: 'Email already taken',
              },
            ],
          };
        }
      }
    }

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id;

    return { user };
  }
  // Login
  @Mutation(() => UserResponse)
  async login(
    @Arg('loginUserInput') loginUserInput: LoginUserInput,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const { usernameOrEmail, password } = loginUserInput;
    // finds user
    const user = await User.findOne(
      usernameOrEmail.includes('@')
        ? // finds user based on email
          { where: { email: usernameOrEmail } }
        : // finds user based on username
          { where: { username: usernameOrEmail } },
    );
    // if user with that username or email doesn't exist
    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: "that username or email doesn't exist",
          },
        ],
      };
    }

    // gets true when hashed password(user.password)
    // is equal to user entered password(password)
    const valid = await argon2.verify(user.password, password);
    // if its wrong, return error
    if (!valid) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'username or password incorrect',
          },
        ],
      };
    }

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id;

    return { user };
  }
  //Log out
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise(resolve =>
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      }),
    );
  }

  @Mutation(() => Boolean)
  async makeUserCreator(@Ctx() { req }: MyContext) {
    const id = req.session.userId;
    const user = await User.findOneOrFail(id);
    const userQueues = await user.onQueue[0];

    if (userQueues) {
      return false;
    }
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ isCreator: true })
      .where('id = :id', { id })
      .execute();
    return true;
  }

  @Subscription(() => User, { topics: REGISTER_USER })
  registerUserSub(@Root() user: User) {
    return user;
  }
}
