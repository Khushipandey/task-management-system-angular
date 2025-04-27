import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Task } from "../../models/task.model";
import { TaskService } from "../../core/task-list.service";
import { TaskFormComponent } from "../task-form/task-form.component";

@Component({
  selector: "app-task-card",
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  template: `
    <div
      class="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between min-h-[180px]"
    >
      <div>
        <h2 class="text-xl font-semibold text-gray-800">{{ task.title }}</h2>
        <p class="text-sm text-gray-500 mt-2">{{ task.description }}</p>
      </div>

      <div class="flex items-center justify-between mt-4">
        <span
          class="text-xs font-medium px-3 py-1 rounded-full"
          [ngClass]="getCssClassForStatus()"
          >{{ task.status }}</span
        >
        <div class="flex gap-2">
          <button class="text-blue-600 hover:text-blue-800 text-sm" (click)="editTask()">
            Edit
          </button>
          <button class="text-red-500 hover:text-red-700 text-sm" (click)="deleteTask">
            Delete
          </button>
        </div>
      </div>

      <div class="text-xs text-gray-400 mt-2">
        Due: {{ task.dueDate | date }}
      </div>
    </div>

    <app-task-form
      *ngIf="isModalOpen"
      (close)="isModalOpen = false"
      [task]="task"
    />
  `,
})
export class TaskCardComponent {
  @Input() task!: Task;
  protected isModalOpen: boolean = false;

  constructor(private taskService: TaskService) {}

  deleteTask() {
    this.taskService.deleteTask(this.task.id).then(() => {
      this.taskService.refrestTaskListSubject.next();
    });
  }

  editTask() {
    this.isModalOpen = true;
  }

  getCssClassForStatus(): string {
    if(this.task.status === 'In Progress') return 'bg-blue-100 text-blue-600';
    if(this.task.status === 'Completed') return 'bg-green-100 text-green-600'
    return 'bg-purple-100 text-purple-700';
  }
}
