import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { logedGuard } from './guards/loged-guard.guard';
import { notLogedGuard } from './guards/not-loged-guard.guard';

const routes: Routes = [
  
  {
    path: '',
    canActivate: [notLogedGuard],
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'login/:rol',
    canActivate: [notLogedGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reset-password',
    canActivate: [notLogedGuard],
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'home',
    canActivate: [logedGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
