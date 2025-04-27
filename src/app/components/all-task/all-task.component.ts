import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";
import { TaskService } from "../../core/task-list.service";
import { TaskCardComponent } from "../task-card/task-card.component";
import { SummaryComponent } from "../summary/summary.component";

@Component({
  selector: "app-all-tasks",
  standalone: true,
  imports: [CommonModule, TaskCardComponent, SummaryComponent],
  templateUrl: "./all-task.component.html",
})
export class AllTasksComponent {
  protected taskList: any;
  private subscription!: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.subscribeEditTaskEvent();
    this.getTaskList();
  }

  getTaskList() {
    this.taskService.getTasks().then((tasks) => {
      this.taskList = tasks;
    });
  }

  subscribeEditTaskEvent() {
    this.subscription = this.taskService.refrestTaskListSubject.subscribe(
      () => {
        this.getTaskList();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
