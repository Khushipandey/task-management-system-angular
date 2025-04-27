import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom, Subject } from "rxjs";
import { Task } from "../models/task.model";

@Injectable({ providedIn: "root" })
export class TaskService {
  private apiUrl = "api/tasks";
  refrestTaskListSubject = new Subject<void>();
  taskToEditSource = new Subject<Task | null>();

  constructor(private http: HttpClient) {}

  getTasks(): Promise<Task[]> {
    return firstValueFrom(this.http.get<Task[]>(this.apiUrl));
  }

  addTask(task: Task): Promise<Task> {
    return firstValueFrom(this.http.post<Task>(this.apiUrl, task));
  }

  updateTask(task: Task): Promise<Task> {
    return firstValueFrom(
      this.http.put<Task>(`${this.apiUrl}/${task.id}`, task)
    );
  }

  deleteTask(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
}
