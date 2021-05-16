import { MyContext } from '../types';
import { User } from '../user/entities/user.entity';
import { MiddlewareFn } from 'type-graphql';

export const isRegularUser: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const user = await User.findOne(context.req.session.userId);
  if (user)
    if (user.isCreator === true) {
      throw new Error('Ainult tavakasutajad saavad järjekorraga ühineda');
    }
  return next();
};
