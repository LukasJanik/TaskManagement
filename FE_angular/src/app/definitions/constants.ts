import { CommonDialogData, dialogTypes } from './types';

export const dialogData: { [key in dialogTypes]: CommonDialogData; } = {
  [dialogTypes.newBoard]: {
    title: 'New board',
    label: 'Board name',
    showInput: true
  },
  [dialogTypes.deleteBoard]: {
    title: 'Delete board',
    description: 'Do you really want to delete this board?'
  },
  [dialogTypes.newList]: {
    title: 'New list',
    label: 'List name',
    showInput: true
  },
  [dialogTypes.deleteList]: {
    title: 'Delete list',
    description: 'Do you really want to delete this list?'
  },
  [dialogTypes.newItem]: {
    title: 'New item',
    label: 'Item Name',
    showInput: true
  },
  [dialogTypes.deleteItem]: {
    title: 'Delete list',
    description: 'Do you really want to delete this list?'
  },
};


