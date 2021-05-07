import { Queue } from '../../queue/entities/queue.entity';
import { User } from '../../user/entities/user.entity';
import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Waiting extends BaseEntity {
  // if user joins +1 if user leaves -1
  @Field()
  @Column({ type: 'int' })
  value: number;

  @Field()
  @PrimaryColumn()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.onQueue, {
    lazy: true,
  })
  user: User;

  @Field()
  @PrimaryColumn()
  queueId: number;

  @Field(() => Queue)
  @ManyToOne(() => Queue, queue => queue.onQueue, {
    lazy: true,
  })
  queue: Queue;
}
