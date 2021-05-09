export type LineTime = {
  fastestTime: number;
  longestTime: number;
};
export type DataType = {
  title: string;
  data: {
    name: string;
    times: {
      shortestWaitingTime: number;
      longestWaitingTime: number;
    };
  }[];
}[];

export type MiniQueueDataType = {
  name: string;
  times: {
    shortestWaitingTime: number;
    longestWaitingTime: number;
  };
};
