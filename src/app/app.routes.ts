import { Routes } from '@angular/router';
import { AllTasksComponent } from './components/all-task/all-task.component';
import { CompletedTasksComponent } from './components/compleated-task/compleated-task.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: AllTasksComponent },
  { path: 'completed', component: CompletedTasksComponent },
];
