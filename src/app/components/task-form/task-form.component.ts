import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../models/task.model";
import { TaskService } from "../../core/task-list.service";

@Component({
  selector: "app-task-form",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./task-form.component.html",
})
export class TaskFormComponent {
  @Input() task?: Task;
  @Output() close = new EventEmitter<void>();
  @ViewChild("myForm") myForm!: NgForm;

  title: string = "";
  description: string | undefined = "";
  dueDate: string = "";
  status: string = "";

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    if (this.task) {
      this.title = this.task.title;
      this.description = this.task.description;
      this.dueDate = this.task.dueDate;
      this.status = this.task.status;
    }
  }

  submit() {
    if (this.myForm.valid) {
      const request = {
        id: this.task ? this.task.id : +uuidv4(),
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        status: this.status,
      };

      const promise = this.task
        ? this.taskService.updateTask(request)
        : this.taskService.addTask(request);
      promise.then(() => this.taskService.refrestTaskListSubject.next());
      this.close.emit();
    }
  }
}
