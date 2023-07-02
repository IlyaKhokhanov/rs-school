export type LevelItemsT = {
  element: string;
  class?: string | string[];
  id?: string;
  innerElement?: LevelItemsT;
};

export interface ILevelData {
  name: string;
  description: string;
  answer: string[];
  items: LevelItemsT[];
  complete: boolean;
  help?: boolean;
}
