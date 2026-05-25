import { Injectable } from '@angular/core';
import { Course } from './courses';

//skickas till schedule. Hanterar localstorage mm

//nyckeln för localstorage
const STORAGE_KEY = 'ramschema';


@Injectable({ providedIn: 'root' })
export class ScheduleService {

  //alla kurser användaren har lagt i sitt 
  private courses: Course[] = [];

  constructor() {
    //när hemsidan laddas in hämtar vi det sparade schemat från localstorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      this.courses = JSON.parse(saved);
    }
  }

  //returnerar kurserna i localstorage 
  getSchedule(): Course[] {
    return this.courses;
  }

  //lägg till kurs
  addCourse(course: Course): boolean {
    if (this.courses.find(c => c.courseCode === course.courseCode)) {
      return false; // kollar om den redan finns
    }
    this.courses.push(course);
    this.save();
    return true;
  }

  //tar bort kurs från localstorage
  removeCourse(courseCode: string): void {
    this.courses = this.courses.filter(c => c.courseCode !== courseCode);
    this.save();
  }

  //kollar om den redan finns. 
  isInSchedule(courseCode: string): boolean {
    return !!this.courses.find(c => c.courseCode === courseCode);
  }

  //räkna ut hp för att visa längst ner 
  getTotalPoints(): number {
    return this.courses.reduce((sum, c) => sum + c.points, 0);
  }

  //sparar schemat till localstorage
  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.courses));
  }
}
