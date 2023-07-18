type CarItem = {
  name: string;
  color: string;
  id: number;
};

interface ICarsRequest {
  header?: string | null;
  data: Promise<CarItem[]>;
}

type WinnerItem = {
  id: number;
  wins: number;
  time: number;
};

interface IWinnersRequest {
  header?: string | null;
  data: Promise<WinnerItem[]>;
}

export {
  CarItem,
  WinnerItem,
  ICarsRequest,
  IWinnersRequest,
};
