import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskService } from "../../core/task-list.service";
import { TaskCardComponent } from "../task-card/task-card.component";

@Component({
  selector: "app-all-tasks",
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: "./all-task.component.html",
})
export class AllTasksComponent {
  protected taskList: any;
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.taskList = tasks;
    });
  }
}
