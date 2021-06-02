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
import { Waiting } from '../waiting/entities/waiting.entity';

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
    @Arg('queueId', () => Int) queueId: number,
    @Ctx() { req }: MyContext,
  ) {
    const data = await Queue.findOneOrFail(queueId);
    const onQueue = await data.onQueue;
    const userId = req.session.userId;
    let yourPos = 0;

    if (onQueue.length <= 0) {
      throw new Error('There are no people on this Queue');
    }

    onQueue.some(queue => {
      // if there is only one person on Queue
      // and you are the first person
      if (onQueue.length === 1) {
        if (queue.userId === userId) {
          // update position
          yourPos = 1;
          return yourPos;
        }

        if (queue.userId !== userId) {
          throw new Error('You are not on this Queue');
        }
      }
      yourPos++;
      if (queue.userId === userId) {
        return yourPos;
      }
      return;
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
    const data = await Queue.find({});
    return data;
  }
  @Authorized()
  @Query(() => [Waiting])
  async waiting() {
    // const data = await Queue.find({ where: { category } });
    const data = await Waiting.find();
    return data;
  }

  @Authorized()
  @Query(() => [Queue])
  async search(@Arg('searchString') searchString: string) {
    const data = await Queue.find({});

    const filteredData = data.filter((queue: Queue) =>
      queue.name.toLowerCase().includes(searchString),
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
    const { name, estimatedServingtime, imageUri } = createQueueInput;

    let queue = (await Queue.create({
      name,
      imageUri,
      estimatedServingtime,
      shortestWaitingTime: 0,
      longestWaitingTime: estimatedServingtime,
      creatorId: req.session.userId,
    }).save()) as any;

    // pubSub.publish(CREATE_QUEUE, queue);

    return queue;
  }

  @Mutation(() => String)
  async deleteQueue(@Arg('id') id: number, @Ctx() { req }: MyContext) {
    const userId = req.session.userId;
    const queue = await Queue.findOneOrFail(id);

    if (queue.creatorId !== req.session.userId) {
      throw new Error('Not authorized');
    }

    await Waiting.delete({ queueId: id });

    await Queue.delete({ id, creatorId: userId });

    return 'Queue deleted';
  }

  @Subscription(() => Queue, { topics: CREATE_QUEUE })
  createQueueSub(@Root() queue: Queue) {
    return queue;
  }
}
