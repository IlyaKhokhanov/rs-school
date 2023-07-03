export type LevelItemsT = {
  element: string;
  class?: string | string[];
  id?: string;
  innerElement?: LevelItemsT;
};

export interface ILevelData<T> {
  name: string;
  description: string;
  answer: string[];
  items: T[];
  complete: boolean;
  help?: boolean;
}
