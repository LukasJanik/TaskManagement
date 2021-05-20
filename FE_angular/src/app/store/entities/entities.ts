export interface Board {
  name: string;
  id: number;
  lists: List[];
}

export interface List {
  itemsList: Item[];
}

export interface Item {
  name: string;
  id: number;
}
