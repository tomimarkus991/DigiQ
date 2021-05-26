import { MyContext } from '../types';
import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import { Queue } from './entities/queue.entity';
import { CreateQueueInput } from './dto/create-queue.input';
import { CREATE_QUEUE } from '../constants';
import { User } from '../user/entities/user.entity';

// @InputType()
// export class CategoryInput {
//   @Field()
//   category!: "Postimaja" | "Turg" | "Meelelahutus";
// }

@Resolver()
export class QueueResolver {
  @Authorized()
  @Query(() => Queue)
  async queue(@Arg('id', () => Int) id: number) {
    const data = await Queue.findOneOrFail(id);
    return data;
  }

  @Authorized()
  @Query(() => Int)
  async positionInQueue(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext,
  ) {
    const data = await Queue.findOneOrFail(id);
    const onQueue = await data.onQueue;
    const userId = req.session.userId;
    let yourPos = 0;

    if (onQueue.length <= 0) {
      throw new Error('There are no people on this Queue');
    }

    onQueue.forEach(queue => {
      if (onQueue.length === 1 && queue.userId === userId) {
        yourPos++;
      }
      if (queue.userId === userId) {
        return yourPos;
      }
      yourPos++;
      console.log(yourPos);
    });
    return yourPos;
  }

  @Authorized()
  @Query(() => Boolean)
  async hasUserJoinedThisQueue(
    @Arg('queueId', () => Int) queueId: number,
    @Ctx() { req }: MyContext,
  ) {
    const userId = req.session.userId;
    const user = await User.findOneOrFail(userId);
    const joinedQueues = await user.onQueue;

    for (let i = 0; i < joinedQueues.length; i++) {
      const element = joinedQueues[i];

      if (element.queueId === queueId) {
        return true;
      }
    }

    return false;
  }

  @Authorized()
  @Query(() => [Queue])
  // @Arg("category", () => String) category: string
  async queues() {
    // const data = await Queue.find({ where: { category } });
    const data = await Queue.find({ order: { createdAt: 'ASC' } });
    return data;
  }

  @Authorized()
  @Query(() => [Queue])
  async search(@Arg('searchString') searchString: string) {
    const data = await Queue.find({});

    const filteredData = data.filter((queue: Queue) =>
      queue.name.includes(searchString),
    );

    return filteredData;
  }

  // Create Queue
  @Authorized(['CREATOR'])
  @Mutation(() => Queue)
  async createQueue(
    @Arg('createQueueInput') createQueueInput: CreateQueueInput,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() { req }: MyContext,
  ): Promise<Queue> {
    const { name, imageUri } = createQueueInput;
    let queue = (await Queue.create({
      name,
      imageUri,
      creatorId: req.session.userId,
    }).save()) as any;

    pubSub.publish(CREATE_QUEUE, queue);

    return queue;
  }

  @Subscription(() => Queue, { topics: CREATE_QUEUE })
  createQueueSub(@Root() queue: Queue) {
    return queue;
  }
}
