import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScheduleService } from '../../services/schedule';
import { Course } from '../../services/courses';

@Component({
  selector: 'app-schedule',
  imports: [CommonModule, RouterLink],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css'
})
export class ScheduleComponent {
  constructor(public scheduleService: ScheduleService) { }

  //returnerar alla kurser som ligger i schedule
  get courses(): Course[] {
    return this.scheduleService.getSchedule();
  }

  //ta bort kurs som ligger i schedule
  remove(courseCode: string): void {
    this.scheduleService.removeCourse(courseCode);
  }
}
