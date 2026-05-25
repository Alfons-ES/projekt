import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursesService, Course } from '../../services/courses';
import { ScheduleService } from '../../services/schedule';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class CoursesComponent implements OnInit {
  allCourses: Course[] = [];
  filteredCourses = signal<Course[]>([]);

  filterText = '';
  selectedSubject = '';
  sortColumn = 'courseCode';
  sortAsc = true;
  subjects: string[] = [];

  constructor(private coursesService: CoursesService, public scheduleService: ScheduleService) { }

  //när sidan laddas in 
  ngOnInit(): void {
    setTimeout(() => {
      this.coursesService.getCourses().subscribe(data => {
        this.allCourses = data;
        this.subjects = [...new Set(data.map(course => course.subject))].sort();
        this.applyFilters();
      });
    }, 100);
  }

  applyFilters(): void {
    // Börja alla kurser
    let coursesToShow = [...this.allCourses];

    // Filtrera på söktext om det skrivits något
    if (this.filterText.trim() !== '') {
      const searchTextLower = this.filterText.toLowerCase();

      coursesToShow = coursesToShow.filter(course => {
        const courseCodeLower = course.courseCode.toLowerCase();
        const courseNameLower = course.courseName.toLowerCase();

        return courseCodeLower.includes(searchTextLower) ||
          courseNameLower.includes(searchTextLower);
      });
    }

    // Filtrera på valt ämne om något är valt
    if (this.selectedSubject !== '') {
      coursesToShow = coursesToShow.filter(course =>
        course.subject === this.selectedSubject
      );
    }

    // Sortera kurserna
    coursesToShow = this.sortCourses(coursesToShow);

    // Uppdatera signal
    this.filteredCourses.set(coursesToShow);
  }

  sortCourses(courses: Course[]): Course[] {
    return courses.sort((courseA, courseB) => {
      const valueA = (courseA as any)[this.sortColumn];
      const valueB = (courseB as any)[this.sortColumn];

      if (valueA < valueB) {
        return this.sortAsc ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortAsc ? 1 : -1;
      }
      return 0;
    });
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      // Om man klickar på samma kolumn vänds sorteringsordningen
      this.sortAsc = !this.sortAsc;
    } else {
      // Ny kolumn sorteras
      this.sortColumn = column;
      this.sortAsc = true;
    }

    this.applyFilters();
  }

  //visar symbolen baserat på vilket håll vi sorterar
  sortIndicator(col: string): string {
    if (this.sortColumn !== col) return '';
    return this.sortAsc ? ' ▲' : ' ▼';
  }

  //lägger till i vår schedule, localstorage etc
  addToSchedule(course: Course): void {
    this.scheduleService.addCourse(course);
  }
}