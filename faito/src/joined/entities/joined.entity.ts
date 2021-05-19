import { Queue } from '../../queue/entities/queue.entity';
import { User } from '../../user/entities/user.entity';
import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Joined extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.joinedQueues, {
    lazy: true,
  })
  user: User;

  @Field()
  @PrimaryColumn()
  queueId: number;

  @Field(() => Queue)
  @ManyToOne(() => Queue, queue => queue.joinedQueues, {
    lazy: true,
  })
  queue: Queue;
}
