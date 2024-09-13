import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';	


export const notLogedGuard: CanActivateFn = async (route, state) => {
  const sessionService = inject(SessionService); // Obtiene el servicio de autenticación
  const router = inject(Router); // Obtiene el enrutador

  const user = await sessionService.getUser();
  if (!user) {
    // Si el usuario NO esta logeado deja pasar.
    return true;
  }
  router.navigate(['/home']); 
  return false;
};
