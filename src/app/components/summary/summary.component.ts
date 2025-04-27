import { Component } from "@angular/core";
import { NgIf } from "@angular/common";
import { TaskService } from "../../core/task-list.service";

@Component({
  selector: "app-summary",
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="bg-white p-4 rounded-lg shadow-md flex justify-around">
      <div>
        <span class="font-semibold">Pending:</span> {{ summary.pending }}
      </div>
      <div>
        <span class="font-semibold">In Progress:</span> {{ summary.inProgress }}
      </div>
      <div>
        <span class="font-semibold">Completed:</span> {{ summary.completed }}
      </div>
    </div>
  `,
})
export class SummaryComponent {
  protected summary: any = {
    pending: 0,
    inProgress: 0,
    completed: 0,
  };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().then((taskList) => {
      this.summary["pending"] = taskList.filter(
        (t) => t.status === "Pending"
      ).length;
      this.summary["inProgress"] = taskList.filter(
        (t) => t.status === "In Progress"
      ).length;
      this.summary["completed"] = taskList.filter(
        (t) => t.status === "Completed"
      ).length;
    });
  }
}
