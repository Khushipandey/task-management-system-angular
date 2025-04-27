import { Component, OnInit } from "@angular/core";
import { NgIf } from "@angular/common";
import { TaskService } from "../../core/task-list.service";

@Component({
  selector: "app-summary",
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg shadow text-center">
        <div class="text-sm text-gray-500">Pending</div>
        <div class="text-xl font-bold text-purple-700">{{ pendingCount }}</div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow text-center">
        <div class="text-sm text-gray-500">In Progress</div>
        <div class="text-xl font-bold text-blue-600">{{ inProgressCount }}</div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow text-center">
        <div class="text-sm text-gray-500">Completed</div>
        <div class="text-xl font-bold text-green-600">{{ completedCount }}</div>
      </div>
    </div>
  `,
})
export class SummaryComponent implements OnInit {
  pendingCount: number = 0;
  inProgressCount: number = 0;
  completedCount: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().then((taskList) => {
      this.pendingCount = taskList.filter(
        (t) => t.status === "Pending"
      ).length;
      this.inProgressCount = taskList.filter(
        (t) => t.status === "In Progress"
      ).length;
      this.completedCount = taskList.filter(
        (t) => t.status === "Completed"
      ).length;
    });
  }
}
