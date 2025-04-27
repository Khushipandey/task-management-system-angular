import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgBusyModule } from "ng-busy";
import { TaskService } from "../../core/task-list.service";
import { TaskCardComponent } from "../task-card/task-card.component";

@Component({
  selector: "app-all-tasks",
  standalone: true,
  imports: [CommonModule, TaskCardComponent, NgBusyModule],
  templateUrl: "./compleated-task.component.html",
})
export class CompletedTasksComponent implements OnInit {
  protected taskList: any;
  protected busy: Promise<any>[] = [];
  
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    const promise = this.taskService.getTasks().then((taskList) => {
      this.taskList = taskList.filter((task) => task.status === "Completed");
    });
    this.busy.push(promise);
  }
}
