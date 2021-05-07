import { Field, InputType } from 'type-graphql';

@InputType()
export class JoinQueueInput {
  @Field()
  queueId: number;
  @Field()
  value: number;
}
