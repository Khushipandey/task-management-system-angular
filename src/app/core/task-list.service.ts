import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Task } from "../features/task/task.model";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class TaskService {
  private apiUrl = "api/tasks";
  refrestTaskListSubject = new Subject<void>();
  taskToEditSource = new Subject<Task | null>();

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
