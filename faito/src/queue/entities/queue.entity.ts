import { User } from '../../user/entities/user.entity';
import { Field, ObjectType } from 'type-graphql';
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

  @Field()
  @Column()
  category: string;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.createdQueues, {
    lazy: true,
  })
  creator: User;

  @Field(() => [Waiting])
  @OneToMany(() => Waiting, waiting => waiting.queue, {
    lazy: true,
  })
  onQueue: Waiting[];

  @Field()
  @Column({ type: 'int' })
  waiting: number = 0;

  @Field()
  @Column()
  shortestWaitingTime: number = this.estimatedServingtime * this.waiting;

  @Field()
  @Column()
  longestWaitingTime: number = this.shortestWaitingTime + this.estimatedServingtime;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
