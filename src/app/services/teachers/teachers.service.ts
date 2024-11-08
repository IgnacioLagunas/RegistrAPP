import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Teacher } from '../../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeachersService extends BaseService<Teacher> {
  constructor(http: HttpClient) {
    super(http, 'teachers');
  }
}