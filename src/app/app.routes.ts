import { Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses';
import { ScheduleComponent } from './components/schedule/schedule';

export const routes: Routes = [
  { path: '', redirectTo: 'kurser', pathMatch: 'full' },
  { path: 'kurser', component: CoursesComponent },
  { path: 'ramschema', component: ScheduleComponent },
];
