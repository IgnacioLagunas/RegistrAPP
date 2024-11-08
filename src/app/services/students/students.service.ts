import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Student } from '../../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService extends BaseService<Student> {
  constructor(http: HttpClient) {
    super(http, 'students');
  }
}