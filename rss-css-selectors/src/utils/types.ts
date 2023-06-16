export type LevelItemsT = {
  element: string;
  class?: string;
  id?: string;
  innerElement?: LevelItemsT;
};

export interface ILevelData {
  name: string;
  complete: boolean;
  answer: string;
  items: LevelItemsT[];
}
