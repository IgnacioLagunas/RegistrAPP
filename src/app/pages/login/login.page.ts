import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  rol?: string | null;
  users: any[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private sessionService: SessionService) {
    this.users = [
      {
        username: 'docente1',
        password: '1234',
        rol: 'docente'
      },
      {
        username: 'estudiante1',
        password: '1234',
        rol: 'estudiante'
      },
      {
        username: 'docente2',
        password: '1234',
        rol: 'docente'
      },
      {
        username: 'estudiante2',
        password: '1234',
        rol: 'estudiante'
      }
    ]
  }

  ngOnInit() {
    this.rol = this.route.snapshot.paramMap.get('rol');
    console.log('ID recibido:', this.rol);
    
  }

  onSubmit(formulario: any) {
    console.log('Formulario enviado:', formulario.value);
    console.log(this.users)
    if (this.validateLogin(formulario.value.username, formulario.value.password)) {
      this.router.navigate(['/home']);
    } 
  }

  validateLogin(username: string, password: string) {
    const user = this.users.find(u => u.username === username);
    if(!user){
      this.errorMessage = 'Credenciales inválidas';
      return false;
    }
    if(user.rol !== this.rol){
      this.errorMessage = 'Usuario no autorizado';
      return false
    }
    if (user && user.password === password) {
      this.sessionService.setUser(user);
      return true;
    } else {
      this.errorMessage = 'Credenciales inválidas';
      return false;
    }
  }
}





