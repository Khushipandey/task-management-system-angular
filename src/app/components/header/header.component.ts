import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TaskFormComponent } from "../task-form/task-form.component";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule, TaskFormComponent, NgIf],
  template: `
    <header class="bg-white shadow-md p-4 flex justify-between items-center">
      <div class="text-2xl font-bold text-purple-700">Task Manager</div>
      <div class="flex items-center gap-4">
        <a routerLink="/tasks" routerLinkActive="font-bold underline text-purple-600"
          >All Tasks</a
        >
        <a
          routerLink="/completed"
          routerLinkActive="font-bold underline text-purple-600"
          >Completed Tasks</a
        >
        <button
          (click)="isModalOpen = true"
          class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
        >
          Add Task
        </button>
      </div>
    </header>
    <app-task-form *ngIf="isModalOpen" (close)="isModalOpen = false" />
  `,
})
export class HeaderComponent {
  isModalOpen = false;
}
