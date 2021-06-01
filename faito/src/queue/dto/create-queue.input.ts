import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateQueueInput {
  @Field()
  name: string;
  @Field()
  estimatedServingtime: number;
  @Field()
  imageUri: string;
}
