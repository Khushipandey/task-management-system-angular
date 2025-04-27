import { InMemoryDbService } from "angular-in-memory-web-api";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      {
        id: 1,
        title: "Task One",
        description: "First task",
        status: "Pending",
        dueDate: "2025-04-30",
      },
      {
        id: 2,
        title: "Task Two",
        description: "Second task",
        status: "In Progress",
        dueDate: "2025-05-05",
      },
      {
        id: 3,
        title: "Task Three",
        description: "Third task",
        status: "Completed",
        dueDate: "2025-05-021",
      },
      {
        id: 4,
        title: "Task Four",
        description: "Fourth task",
        status: "In Progress",
        dueDate: "2025-04-05",
      },
    ];
    return { tasks };
  }
}
