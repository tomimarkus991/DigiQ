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
import { getConnection, getManager } from 'typeorm';
import { JoinQueueInput } from './dto/join-queue.input';
import { Queue } from '../queue/entities/queue.entity';
import { JOIN_QUEUE } from '../constants';
import { isRegularUser } from '../middleware/isRegularUser';
import { Waiting } from './entities/waiting.entity';
import { RemoveUserFromQueueInput } from './dto/rem-from-queue.input';

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

    const waiting = await Waiting.findOne({
      where: { queueId, userId },
    });

    // the user has voted on the post before
    // and they are changing their vote
    if (waiting && waiting.value !== realValue) {
      await getConnection().transaction(async tm => {
        await tm.query(
          `update waiting
           set value = $1
           where "queueId" = $2 and "userId" = $3`,
          [realValue, queueId, userId],
        );
        await tm.query(
          `      update queue
        set waiting = waiting + $1,
        "shortestWaitingTime" = "estimatedServingtime" * waiting,
        "longestWaitingTime" = "estimatedServingtime" * waiting + "estimatedServingtime"
        where id= $2`,
          [realValue, queueId],
        );
      });

      await Waiting.delete({ queueId, userId });
      // user is not on the queue
    } else if (!waiting) {
      await getConnection().transaction(async tm => {
        await tm.query(
          `insert into waiting ("userId", "queueId", value) values($1, $2, $3);`,
          [userId, queueId, realValue],
        );
        await tm.query(
          `      update queue
        set waiting = waiting + $1,
        "shortestWaitingTime" = "estimatedServingtime" * waiting,
        "longestWaitingTime" = "estimatedServingtime" * waiting + "estimatedServingtime"
        where id= $2`,
          [realValue, queueId],
        );
      });
    }
    const updatedQueue = await Queue.findOneOrFail(queueId);

    pubSub.publish(JOIN_QUEUE, updatedQueue);
    return updatedQueue;
  }

  @Mutation(() => String)
  async removeUserFromQueue(
    @Arg('removeUserFromQueueInput')
    removeUserFromQueueInput: RemoveUserFromQueueInput,
    @Ctx() { req }: MyContext,
  ) {
    const { queueId, userId } = removeUserFromQueueInput;
    const queue = await Queue.findOneOrFail(queueId);
    const value = -1;

    // check if you are the creator of this queue
    if (queue.creatorId !== req.session.userId) {
      throw new Error('Not authorized');
    }

    await getConnection().query(
      `
      update queue
      set waiting = waiting + ${value},
      "shortestWaitingTime" = "estimatedServingtime" * waiting,
      "longestWaitingTime" = "estimatedServingtime" * waiting + "estimatedServingtime"
      where id= ${queueId};
      `,
    );
    await Waiting.delete({ queueId, userId });

    return 'User removed';
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
