import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private USER_KEY = 'user';
  // Guarda el usuario actual
  private usuarioActualSubject = new BehaviorSubject<any>(null); 

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Inicializa el almacenamiento
    const storage = await this.storage.create();
    const usuarioLogeado = await storage.get(this.USER_KEY);
    if (usuarioLogeado) {
      this.usuarioActualSubject.next(usuarioLogeado);  // Emitimos el usuario guardado si existe
    }
  }

  // Obtener el observable del usuario actual para suscribir en los componentes necesarios
  getUserObservable() {
    return this.usuarioActualSubject.asObservable(); // Devuelve el observable del usuario
  }

  // Guardar los detalles del usuario
  async setUser(user: any) {
    await this.storage?.set(this.USER_KEY, user);
    this.usuarioActualSubject.next(user);
  }

  // Obtener los detalles del usuario
  async getUser() {
    return await this.storage?.get(this.USER_KEY);
  }

  // Limpiar los detalles del usuario al hacer logout
  async logout() {
    await this.storage?.remove(this.USER_KEY);
    this.usuarioActualSubject.next(null);
  }
}