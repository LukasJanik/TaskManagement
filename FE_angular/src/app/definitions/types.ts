export interface CommonDialogData {
  title: string;
  description?: string;
  label?: string;
  showInput?: boolean;
}

export enum dialogTypes {
  newBoard,
  deleteBoard,
  newList,
  deleteList,
  newItem,
  deleteItem
}
