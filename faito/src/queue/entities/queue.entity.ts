import { User } from '../../user/entities/user.entity';
import { Authorized, Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Waiting } from '../../waiting/entities/waiting.entity';
import { Joined } from '../../joined/entities/joined.entity';

@Entity()
@ObjectType()
export class Queue extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ type: 'int' })
  estimatedServingtime: number = 4;

  // @Field()
  // @Column()
  // category: string;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.createdQueues, {
    lazy: true,
  })
  creator: User;

  @Authorized(['CREATOR'])
  @Field(() => [Waiting])
  @OneToMany(() => Waiting, waiting => waiting.queue, {
    lazy: true,
  })
  onQueue: Waiting[];

  @Authorized()
  @Field(() => [Joined])
  @OneToMany(() => Joined, userJoined => userJoined.queue, {
    lazy: true,
  })
  joinedQueues: Joined[];

  @Field()
  @Column({ type: 'int' })
  waiting: number = 0;

  @Field()
  @Column()
  shortestWaitingTime: number = this.estimatedServingtime * this.waiting;

  @Field()
  @Column()
  longestWaitingTime: number =
    this.estimatedServingtime * this.waiting + this.estimatedServingtime;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
