import { Component, Input, OnInit } from '@angular/core';
import { TodoFiller } from 'src/app/shared/models/todo-filler.model';
import { TodoModalInfo } from 'src/app/shared/models/todo-modal-info.model';
import { StatusInfo } from 'src/app/shared/models/status-info.model';

@Component({
  selector: 'app-todo-week-modal',
  templateUrl: './todo-week-modal.component.html',
  styleUrls: ['./todo-week-modal.component.css'],
})
export class TodoWeekModalComponent implements OnInit {
  @Input() todoFiller!: TodoFiller;

  // export class TodoFiller {
  //   hideShowDialog: boolean = false; << ამის მიხედვით იხსნება ან იხურება მოდალი
  //   clickDay!: string;               << ეს არის დაკლიკებული უჯრის დღე
  //   clickHour!: string;              << ეს არის დაკლიკებული უჯრის საათი
  //   todoData: TodoModalInfo[] = [];  << აი აქ ინახება ყველაფერი რასაც უკვე მოდალის filler იდან შევიყვანთ
  // }

  todoItem: TodoModalInfo = new TodoModalInfo();

  // export class TodoModalInfo {
  //   todo!: string;                  << ამას ვავსებ უშუალოდ მოდალის filler იდან,ngModel ით.
  //   days!: string;                  << ესეც ივსება იმ box ის დღით რომელზეც დაკელკება
  //   hours!: string;                 << ესეც ივსება იმ box ის საათით რომელზეც დაკელკება
  //   selectStatusColor!: string;     << ამას ვავსებ უშუალოდ მოდალის filler იდან,ngModel ით.
  //   alertText!: string;             <<
  // }

  statusInfo: StatusInfo[] = [
    { statusSelector: 'ToDo', statusColor: 'blue' },
    { statusSelector: 'InProgress', statusColor: 'yellow' },
    { statusSelector: 'Done', statusColor: 'green' },
  ];

  // ეხლა განვმარტოთ აქამდე რა წერია:
  //  todoFiller ში input დეკორატორით მივიღეთ ობიექტი რომელიც მოგვაწოდა მისმა მშობელმა,
  // ანუ სადაც ვიძახებთ მას. შესაბამისად მისი მშობელი გახლავთ todo-week-boxes კომპონენტი.
  // TodoFiller ის ობიექტი ივსება და უკვე შევსებული გადმოგვეწოდება როდესაც მოხდება
  // ნებისმიერ კალნდრულ უჯრაზე დაკლეკვა.ხოლო ეს მონაცემებია:
  //  hideShowDialog =true თუ კი მოდალი გაიხსნა ხოლო close ზე დაჭერით false
  //  clickDay= box ის შესაბამის დღე
  //  clickHour= box ის შესაბამის საათი
  //  todoData= ეს ობიექტი ცარიელია,როგორც ზემოთ აღვნიშნე
  // აქ უნდა ჩაჯდეს ყველა იმ ფროფერთის მნიშვნელობა
  // რომელიც modal ის ამოვარდნის შემდეგ filler იდან უნდა შევიყვანოთ.

  // აი ეხლა ვნახოთ როგორ შევავსებთ ამ უკანასკნელს
  // პირველ რიგში დავიწყოთ saveChangeDialogBtn ფუნქციის განხილვა
  // რახან if პირობაში გვიწერია რომ this.todoItem.days != undefined
  //ესეიგი ეს არ შესრულდებ,რადგან თავიდან როგორც 21 ხაზზე გვიწერია
  // todoItem არის სუფთა ცარიელი ობიექტი.
  //ამიტო გადავიდეთ პირდაპირ  else ზე
  //ანუ todoItem ის დღეს და საათს ვავსებთ იმ box ის დღით და საათით
  //რომელზეც დაეკლიკება.
  //შემდეგ გვიწერია   this.todoFiller.todoData.push(this.todoItem);
  // მემგონი გასაგებია ყველაფერი
  //ეხლა რო ჩავიხეთოდ todoFiller ში გვექნება შემდეგი რამ:
  // todoFiller{
  //     hideShowDialog: boolean = false;
  //     clickDay!: box ის დღე;
  //     clickHour!: box ის საათი;
  //     todoData: TodoModalInfo[] = [
  //                {
  //                   todo!: string;
  //                   days!: box ის დღე;
  //                   hours!: box ის საათი;
  //                   selectStatusColor!: string;
  //                   alertText!: string;
  //               }
  //             ];
  // }

  constructor() {}

  ngOnInit(): void {
    let filterTodo: TodoModalInfo = this.todoFiller.todoData.filter(
      (item) =>
        item.days == this.todoFiller.clickDay &&
        item.hours == this.todoFiller.clickHour
    )[0];
    if (filterTodo != undefined) {
      this.todoItem = filterTodo;
    } else console.log(filterTodo);
  }

  saveChangeDialogBtn() {
    if (this.todoItem.days != undefined) {
      this.todoFiller.todoData.forEach((item) => {
        // აქ ხდება დააბდეითება todo და selectStatusColor
        if (
          item.days == this.todoFiller.clickDay &&
          item.hours == this.todoFiller.clickHour
        ) {
          this.todoItem.todo = item.todo;
          this.todoItem.selectStatusColor = item.selectStatusColor;
        }
      });
    } else {
      this.todoItem.days = this.todoFiller.clickDay;
      this.todoItem.hours = this.todoFiller.clickHour;
      this.todoFiller.todoData.push(this.todoItem);
    }

    this.closeDialog();
  }
  deleteTodoBtn() {
    var index = this.todoFiller.todoData.indexOf(this.todoItem);
    this.todoFiller.todoData.splice(index, 1);
    this.closeDialog();
  }

  closeDialog() {
    this.todoFiller.hideShowDialog = !this.todoFiller.hideShowDialog;
  }
}
