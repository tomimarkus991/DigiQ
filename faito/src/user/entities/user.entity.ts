import { Queue } from '../../queue/entities/queue.entity';
import { Waiting } from '../../waiting/entities/waiting.entity';
import { Authorized, Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Joined } from '../../joined/entities/joined.entity';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Authorized()
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Authorized()
  @Field()
  @Column({ unique: true })
  username!: string;

  @Authorized()
  @Field()
  @Column({ unique: true })
  email!: string;

  @Authorized()
  @Column()
  password!: string;

  @Authorized(['CREATOR'])
  @Field(() => [Waiting])
  @OneToMany(() => Waiting, userOnQueue => userOnQueue.user, {
    lazy: true,
  })
  onQueue: Waiting[];

  @Authorized(['CREATOR'])
  @Field(() => [Queue])
  @OneToMany(() => Queue, queue => queue.creator, { lazy: true })
  createdQueues: Queue[];

  @Authorized()
  @Field(() => [Joined])
  @OneToMany(() => Joined, userJoined => userJoined.user, {
    lazy: true,
  })
  joinedQueues: Joined[];

  @Authorized()
  @Field()
  @Column({ default: false })
  isCreator: boolean;

  @Authorized()
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Authorized()
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
