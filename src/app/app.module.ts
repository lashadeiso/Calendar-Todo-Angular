import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoWeekComponent } from './todo-week/todo-week.component';
import { TodoWeekBoxesComponent } from './todo-week/todo-week-boxes/todo-week-boxes.component';
import { TodoWeekModalComponent } from './todo-week/todo-week-modal/todo-week-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TodoWeekComponent,
    TodoWeekBoxesComponent,
    TodoWeekModalComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
