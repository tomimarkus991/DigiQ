import { Queue } from '../../queue/entities/queue.entity';
import { Waiting } from '../../waiting/entities/waiting.entity';
import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => [Waiting])
  @OneToMany(() => Waiting, userOnQueue => userOnQueue.user, {
    lazy: true,
  })
  onQueue: Waiting[];

  @Field(() => [Queue])
  @OneToMany(() => Queue, queue => queue.creator, { lazy: true })
  createdQueues: Queue[];

  @Field()
  @Column({ default: false })
  isCreator: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToMany(() => Queue, (queue) => queue.creator)
  // joinedQueues: Queue[];
}
