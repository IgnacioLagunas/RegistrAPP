import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_ENDPOINT = new InjectionToken<string>('API_ENDPOINT');

@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => new BaseService(http, 'default-endpoint'),
  deps: [HttpClient]
})
export class BaseService<T> {
  constructor(private readonly http: HttpClient, @Inject(API_ENDPOINT) private endpoint: string) { }

  private readonly apiUrl = 'http://localhost:3000';

  // Obtener todos los elementos
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${this.endpoint}`);
  }

  // Obtener un elemento por su ID
  get(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }

  // Crear un nuevo elemento
  post(item: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${this.endpoint}`, item);
  }

  // Actualizar un elemento existente
  put(id: string | number, item: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${this.endpoint}/${id}`, item);
  }

  // Eliminar un elemento
  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.endpoint}/${id}`);
  }
}