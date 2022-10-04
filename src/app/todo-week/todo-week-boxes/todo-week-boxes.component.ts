import { Component, OnInit } from '@angular/core';
import { ScheduleHours } from 'src/app/shared/models/schedule-hours.model';
import { ScheduleDays } from 'src/app/shared/models/schedule-days.model';
import { TodoFiller } from 'src/app/shared/models/todo-filler.model';
import { TodoModalInfo } from 'src/app/shared/models/todo-modal-info.model';

@Component({
  selector: 'app-todo-week-boxes',
  templateUrl: './todo-week-boxes.component.html',
  styleUrls: ['./todo-week-boxes.component.css'],
})
export class TodoWeekBoxesComponent implements OnInit {
  dialog: TodoFiller = new TodoFiller();
  dragItem!: HTMLElement;

  // export class TodoFiller {
  //   hideShowDialog: boolean = false; << ამის მიხედვით იხსნება ან იხურება მოდალი
  //   clickDay!: string;               << ეს არის დაკლიკებული უჯრის დღე
  //   clickHour!: string;              << ეს არის დაკლიკებული უჯრის საათი
  //   todoData: TodoModalInfo[] = [];  << აი აქ ინახება ყველაფერი რასაც უკვე მოდალის filler იდან შევიყვანთ
  // }

  // export class TodoModalInfo {
  //   todo!: string;                  << აქ ინახება todo ს თათლი,ანუ რაც უნდა გავკეთოთ იმის ტექსტი
  //   days!: string;                  <<
  //   hours!: string;                 <<
  //   selectStatusColor!: string;     << აქ ინახება როგორც სტატუსი ასევე მისი ფერიც
  //   alertText!: string;             <<
  // }

  hoursData: ScheduleHours[] = [
    { title: 'WeekDays', className: 'text-info' },
    { title: '6 AM', className: 'tealcolor' },
    { title: '7 AM', className: 'tealcolor' },
    { title: '8 AM', className: 'tealcolor' },
    { title: '9 AM', className: 'tealcolor' },
    { title: '10 AM', className: 'tealcolor' },
    { title: '11 AM', className: 'tealcolor' },
    { title: '12 AM', className: 'tealcolor' },
    { title: '1 PM', className: 'redcolor' },
    { title: '2 PM', className: 'redcolor' },
    { title: '3 PM', className: 'redcolor' },
    { title: '4 PM', className: 'redcolor' },
    { title: '5 PM', className: 'redcolor' },
    { title: '6 PM', className: 'redcolor' },
    { title: '7 PM', className: 'redcolor' },
    { title: '8 PM', className: 'redcolor' },
    { title: '9 PM', className: 'redcolor' },
    { title: '10 PM', className: 'redcolor' },
  ];

  daysData: ScheduleDays[] = [
    { title: 'Monday', className: 'thred', classNameTr: 'trred' },
    { title: 'Tuesday', className: 'thteal', classNameTr: 'trteal' },
    { title: 'Wednesday', className: 'thred', classNameTr: 'trred' },
    { title: 'Thursday', className: 'thteal', classNameTr: 'trteal' },
    { title: 'Friday', className: 'thred', classNameTr: 'trred' },
    { title: 'Saturday', className: 'thteal', classNameTr: 'trteal' },
    { title: 'Sunday', className: 'thred', classNameTr: 'trred' },
  ];

  openDialog(day: string, hour: string) {
    this.dialog.hideShowDialog = !this.dialog.hideShowDialog;
    this.dialog.clickDay = day;
    this.dialog.clickHour = hour;
  }

  constructor() {}

  ngOnInit(): void {}

  // Drag & Drop

  onDragStart(event: DragEvent) {
    let p = event.target as HTMLElement;
    this.dragItem = p;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    let td = event.target as HTMLElement;
    if (
      td.getElementsByTagName('p').length == 0 &&
      td.tagName.toLowerCase() == 'td'
    ) {
      td.appendChild(this.dragItem);
    }
  }

  onDragEnd(event: DragEvent, data: TodoModalInfo) {
    let p = event.target as HTMLElement;
    let td = p.parentElement as HTMLElement;

    let day = td.getAttribute('day');
    let hour = td.getAttribute('hour');

    data.hours = hour != null ? hour : data.hours;
    data.days = day != null ? day : data.days;
  }
}
