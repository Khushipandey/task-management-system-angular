// app/components/task-card.component.ts
import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskService } from "../../core/task-list.service";
import { Task } from "../../features/task/task.model";

@Component({
  selector: "app-task-card",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
    >
      <div>
        <h3 class="text-lg font-bold">{{ task.title }}</h3>
        <p class="text-sm text-gray-600">{{ task.description }}</p>
        <p class="text-xs text-gray-400 mt-2">Due: {{ task.dueDate }}</p>
        <span
          class="inline-block mt-2 px-2 py-1 text-xs rounded bg-indigo-100 text-indigo-600"
        >
          {{ task.status }}
        </span>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button
          (click)="deleteTask()"
          class="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  `,
})
export class TaskCardComponent {
  @Input() task!: Task;

  constructor(private taskService: TaskService) {}

  deleteTask() {
    this.taskService.deleteTask(this.task.id);
  }
}
