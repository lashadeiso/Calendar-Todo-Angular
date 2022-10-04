import { TodoModalInfo } from './todo-modal-info.model';

export class TodoFiller {
  hideShowDialog: boolean = false;
  clickDay!: string;
  clickHour!: string;
  todoData: TodoModalInfo[] = [];
}
