import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskService } from "../../core/task-list.service";
import { TaskCardComponent } from "../task-card/task-card.component";

@Component({
  selector: "app-all-tasks",
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: "./compleated-task.component.html",
})
export class CompletedTasksComponent {
  protected taskList: any;
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().then((taskList) => {
      this.taskList = taskList.filter((task) => task.status === "Compleated");
    });
  }
}
