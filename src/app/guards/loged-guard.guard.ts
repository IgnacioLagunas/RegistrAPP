import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session/session.service';	


export const logedGuard: CanActivateFn = async (route, state) => {
  const sessionService = inject(SessionService); // Obtiene el servicio de autenticación
  const router = inject(Router); // Obtiene el enrutador
  
  const user = await sessionService.getUser();
  if (user) {
    console.log(user)
    // Si el usuario esta logeado deja pasar
    return true;
  }
  router.navigate(['']); 
  return false;
};
