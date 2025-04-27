import { Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgBusyModule } from "ng-busy";
import { TaskService } from "../../core/task-list.service";
import { Task } from "../../models/task.model";
import { TaskCardComponent } from "../task-card/task-card.component";
import { SummaryComponent } from "../summary/summary.component";

@Component({
  selector: "app-all-tasks",
  standalone: true,
  imports: [CommonModule, FormsModule, TaskCardComponent, SummaryComponent, NgBusyModule],
  templateUrl: "./all-task.component.html",
})
export class AllTasksComponent implements OnInit, OnDestroy {
  protected taskList: Task[] = [];
  protected filteredTaskList: Task[] = [];

  protected filterStatus: string = 'All';
  protected sortOrder: string = 'asc';

  protected busy: Promise<any>[]= [];

  private subscription!: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.subscribeEditTaskEvent();
    this.getTaskList();
  }

  getTaskList() {
    const promise = this.taskService.getTasks().then((tasks) => {
      this.taskList = tasks;
      this.filterStatus = 'All';
      this.sortOrder = 'asc';
      this.onFilterChange();
    });

    this.busy.push(promise);
  }

  subscribeEditTaskEvent() {
    this.subscription = this.taskService.refrestTaskListSubject.subscribe(
      () => {
        this.getTaskList();
      }
    );
  }

  onFilterChange() {
    let filtered = this.taskList;
    if(this.filterStatus != 'All') {
      filtered = filtered.filter(t => t.status === this.filterStatus);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    this.filteredTaskList = filtered;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
