import { MyContext } from '../types';
import {
  Arg,
  ArgsType,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { JoinQueueInput } from './dto/join-queue.input';
import { Queue } from '../queue/entities/queue.entity';
import { JOIN_QUEUE } from '../constants';
import { isRegularUser } from '../middleware/isRegularUser';

@ArgsType()
export class JoinQueueArgs {
  id: number;
}

@Resolver()
export class WaitingResolver {
  // Join Queue
  @UseMiddleware(isRegularUser)
  @Mutation(() => Queue)
  async joinQueue(
    @Arg('joinQueueInput') joinQueueInput: JoinQueueInput,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() { req }: MyContext,
  ): Promise<Queue> {
    const { queueId, value } = joinQueueInput;
    const isWaiting = value !== -1;
    const realValue = isWaiting ? 1 : -1;
    let userId = req.session.userId;

    await getConnection().query(
      `
      START TRANSACTION;

      insert into waiting ("userId", "queueId", value)
      values(${userId},${queueId},${realValue});

      insert into joined ("userId", "queueId")
      values(${userId},${queueId});

      update queue
      set waiting = waiting + ${realValue},
      "shortestWaitingTime" = "estimatedServingtime" * waiting,
      "longestWaitingTime" = "estimatedServingtime" * waiting + "estimatedServingtime"
      where id= ${queueId};

      COMMIT;
      `,
    );
    const updatedQueue = await Queue.findOneOrFail(queueId);

    pubSub.publish(JOIN_QUEUE, updatedQueue);

    return updatedQueue;
  }

  @Subscription(() => Queue, {
    topics: JOIN_QUEUE,
    filter: ({ payload, args }: { payload: Queue; args: JoinQueueArgs }) =>
      payload.id === args.id,
  })
  joinQueueSub(@Root() queue: Queue, @Arg('id') _: number): Queue {
    return queue;
  }
}
