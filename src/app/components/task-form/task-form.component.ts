import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { v4 as uuidv4 } from "uuid";
import { CommonModule } from "@angular/common";
import { TaskService } from "../../core/task-list.service";

@Component({
  selector: "app-task-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./task-form.component.html",
})
export class TaskFormComponent {
  @Output() close = new EventEmitter<void>();

  title = "";
  description = "";
  dueDate = "";
  status = "Pending";

  constructor(private taskService: TaskService) {}

  submit() {
    if (this.title && this.dueDate) {
      this.taskService.addTask({
        id: +uuidv4(),
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        status: this.status,
      });
      this.close.emit();
    }
  }
}
