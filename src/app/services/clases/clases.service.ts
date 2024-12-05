import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Clase } from 'src/app/models/clase.model';

@Injectable({
  providedIn: 'root'
})
export class ClasesService extends BaseService<Clase> {
  constructor(http: HttpClient) {
    super(http, 'clases');
  }
  
}