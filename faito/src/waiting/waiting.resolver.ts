import { MyContext } from '../types';
import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { JoinQueueInput } from './dto/join-queue.input';
import { Queue } from '../queue/entities/queue.entity';
import { JOIN_QUEUE } from '../constants';

@Resolver()
export class WaitingResolver {
  // Join Queue
  @Mutation(() => Boolean)
  // @UseMiddleware(isAuth, isRegularUser)
  async joinQueue(
    @Arg('joinQueueInput') joinQueueInput: JoinQueueInput,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() { req }: MyContext,
  ): Promise<any> {
    const { queueId, value } = joinQueueInput;
    const isWaiting = value !== -1;
    const realValue = isWaiting ? 1 : -1;
    let userId = req.session.userId;

    const asi = await getConnection().query(
      `
      START TRANSACTION;

      insert into waiting ("userId", "queueId", value)
      values(${userId},${queueId},${realValue});

      update queue
      set waiting = waiting + ${realValue},
      "shortestWaitingTime" = "estimatedServingtime" * waiting,
      "longestWaitingTime" = "shortestWaitingTime" + "estimatedServingtime"
      where id= ${queueId};

      COMMIT;
      `,
    );
    const updatedQueue = await Queue.findOneOrFail(queueId);

    pubSub.publish(JOIN_QUEUE, updatedQueue);

    return true;
  }
  @Subscription(() => Queue, { topics: JOIN_QUEUE })
  joinQueueSub(@Root() queue: Queue) {
    console.log(queue);

    return queue;
  }
}
