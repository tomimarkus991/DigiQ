import { MyContext } from '../types';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { JoinQueueInput } from './dto/join-queue.input';

@Resolver()
export class WaitingResolver {
  // Join Queue
  @Mutation(() => Boolean)
  // @UseMiddleware(isAuth, isRegularUser)
  async joinQueue(
    @Arg('joinQueueInput') joinQueueInput: JoinQueueInput,
    @Ctx() { req }: MyContext,
  ): Promise<any> {
    const { queueId, value } = joinQueueInput;
    const isWaiting = value !== -1;
    const realValue = isWaiting ? 1 : -1;
    let userId = req.session.userId;

    await getConnection().query(
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
    return true;
  }
}
