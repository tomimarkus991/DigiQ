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
  @Query(() => [Queue])
  // @Arg("category", () => String) category: string
  async queues() {
    // const data = await Queue.find({ where: { category } });
    const data = await Queue.find({ order: { createdAt: 'ASC' } });
    return data;
  }

  // Create Queue
  @Authorized(['CREATOR'])
  @Mutation(() => Queue)
  async createQueue(
    @Arg('createQueueInput') createQueueInput: CreateQueueInput,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() { req }: MyContext,
  ): Promise<Queue> {
    const { name, category } = createQueueInput;
    let queue = (await Queue.create({
      name,
      category,
      creatorId: req.session.userId,
    }).save()) as any;

    pubSub.publish(CREATE_QUEUE, queue);

    return queue;
  }

  @Subscription(() => Queue, { topics: CREATE_QUEUE })
  createQueueSub(@Root() queue: Queue) {
    console.log(queue);

    return queue;
  }
}
