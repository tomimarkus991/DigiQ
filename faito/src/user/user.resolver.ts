import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { MyContext } from '../types';
import argon2 from 'argon2';
import { getConnection } from 'typeorm';
import { COOKIE_NAME } from '../constants';
import { User } from './entities/user.entity';
import { LoginUserInput } from './dto/login-user.input';
import { UserResponse } from './dto/user.response';
import { RegisterUserInput } from './dto/register-user.input';
import { validateRegister } from './utils/validateRegister';

@Resolver(User)
export class UserResolver {
  // Get current user
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    req.session.userId;
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }
    console.log('meUser');
    return User.findOne(req.session.userId);
  }
  // Get one User
  @Query(() => User, { nullable: true })
  user(@Arg('id', () => Int) id: number): Promise<User | undefined> {
    return User.findOne(id);
  }

  // Register
  @Mutation(() => UserResponse)
  async register(
    @Arg('registerUserInput') registerUserInput: RegisterUserInput,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    // check if there are errors
    const errors = validateRegister(registerUserInput);

    const { username, email, password, isCreator } = registerUserInput;

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
          isCreator,
        })
        .returning('*')
        .execute();
      user = result.raw[0];
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
    const user = await User.findOne(
      usernameOrEmail.includes('@')
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } },
    );
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
    const valid = await argon2.verify(user.password, password);
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
}
