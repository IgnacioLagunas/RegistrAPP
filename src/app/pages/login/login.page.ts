import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SessionService} from '../../services/session/session.service';
import {StudentsService} from '../../services/students/students.service';
import {TeachersService} from '../../services/teachers/teachers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  rol?: string | null;
  users: any[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private sessionService: SessionService, private studentsService: StudentsService, private teachersService: TeachersService) {
   
  }

  ngOnInit() {
    this.rol = this.route.snapshot.paramMap.get('rol');
    console.log('ID recibido:', this.rol);
    
  }

  onSubmit(formulario: any) {
    console.log('Formulario enviado:', formulario.value);
    let usuarioEsValidado = false;
    if (this.rol === 'estudiante') {
      usuarioEsValidado = this.validateLogin(formulario.value.username, formulario.value.password, this.studentsService)
    } else if (this.rol === 'docente') {
      usuarioEsValidado = this.validateLogin(formulario.value.username, formulario.value.password, this.teachersService)
    }
    if (usuarioEsValidado) {
      this.router.navigate(['/home']);
    } 
  }

  validateLogin(username: string, password: string, service: any) {
      service.getAll().subscribe((users: any) => {
        console.log(users)
        this.users = users 
      })  
      const user = this.users.find((user: any) => {
        return user.username === username
      })
      if (user && user.password === password) {
        this.sessionService.setUser(user);
        this.errorMessage = '';
        return true;
      } else {
        this.errorMessage = 'Credenciales inválidas';
        return false;
      }    
  }
  
}





