import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
  courseCode: string;
  subjectCode: string;
  level: string;
  progression: string;
  courseName: string;
  points: number;
  institutionCode: string;
  subject: string;
  syllabus: string;
}
//denna kommer skickas som en service till courses och schedule, vilket gör att jag slipper ladda ner filen :)
@Injectable({ providedIn: 'root' })
export class CoursesService {
  private url = 'https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }
}
