import { MyContext } from '../types';
import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Queue } from './entities/queue.entity';
import { CreateQueueInput } from './dto/create-queue.input';

// @InputType()
// export class CategoryInput {
//   @Field()
//   category!: "Postimaja" | "Turg" | "Meelelahutus";
// }

@Resolver()
export class QueueResolver {
  @Query(() => Queue)
  // @UseMiddleware(isAuth)
  async queue(@Arg('id', () => Int) id: number) {
    const data = await Queue.findOne(id);
    return data;
  }

  @Query(() => [Queue])
  // @UseMiddleware(isAuth)
  // @Arg("category", () => String) category: string
  async queues() {
    // const data = await Queue.find({ where: { category } });
    const data = await Queue.find({ order: { createdAt: 'ASC' } });
    return data;
  }

  // Create Queue
  @Mutation(() => Queue)
  // @UseMiddleware(isAuth, isCreator)
  async createQueue(
    @Arg('createQueueInput') createQueueInput: CreateQueueInput,
    @Ctx() { req }: MyContext,
  ): Promise<Queue> {
    const { name, category } = createQueueInput;
    let queue = (await Queue.create({
      name,
      category,
      creatorId: req.session.userId,
    }).save()) as any;

    return queue;
  }
}
