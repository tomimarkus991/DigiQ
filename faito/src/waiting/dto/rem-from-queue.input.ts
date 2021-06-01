import { Field, InputType } from 'type-graphql';

@InputType()
export class RemoveUserFromQueueInput {
  @Field()
  queueId: number;
  @Field()
  userId: number;
}
