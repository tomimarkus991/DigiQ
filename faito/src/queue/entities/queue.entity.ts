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
  @Column({ type: 'int', default: 4 })
  estimatedServingtime: number;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @Column()
  imageUri: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.createdQueues, {
    lazy: true,
  })
  creator: User;

  @Authorized()
  @Field(() => [Waiting])
  @OneToMany(() => Waiting, waiting => waiting.queue, {
    lazy: true,
  })
  onQueue: Waiting[];

  @Field()
  @Column({ type: 'int', default: 0 })
  waiting: number;

  @Field()
  @Column()
  shortestWaitingTime: number;

  @Field()
  @Column()
  longestWaitingTime: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
