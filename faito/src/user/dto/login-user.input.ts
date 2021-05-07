import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginUserInput {
  @Field()
  usernameOrEmail: string;

  @Field()
  password: string;
}
