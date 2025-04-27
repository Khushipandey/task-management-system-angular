// app/components/header.component.ts
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
      <div class="text-2xl font-bold text-indigo-600">Task Manager</div>
      <div class="flex items-center gap-4">
        <a routerLink="/tasks" routerLinkActive="text-indigo-600 font-semibold"
          >All Tasks</a
        >
        <a
          routerLink="/completed"
          routerLinkActive="text-indigo-600 font-semibold"
          >Completed Tasks</a
        >
        <button
          (click)="isModalOpen = true"
          class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
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
