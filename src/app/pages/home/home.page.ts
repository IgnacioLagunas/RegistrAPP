import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { 
  ClasesService
 } from 'src/app/services/clases/clases.service';
import { Clase } from 'src/app/models/clase.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: any;
  api_url = 'http://localhost:3000';

  constructor(private sessionService: SessionService, route: ActivatedRoute, private router: Router, private clasesService: ClasesService ) { }

  ngOnInit() {
    this.sessionService.getUserObservable().subscribe((user) => {
      this.user = user
    })
  }
  empezarClase(){
    this.clasesService.createOne({
      nombre: 'Clase 1', alumnos: [],
    }).subscribe({
      next: (clase) => {
        console.log('Clase creada:', clase);
        this.router.navigate(['/registro-qr', clase.id]);
      },
      error: (err) => {
        console.error('Error al crear la clase:', err);
      },
    });
  }

  listarClases(){
    console.log("listar clases")
  }

  registrarAsistencia(){
    const scannedId = '0';
    let claseRegistro: Clase = {
      nombre: '',
      alumnos: [],
    };
    this.clasesService.getOne(scannedId).subscribe({
      next: (clase) => {
        claseRegistro = clase
      },
      error: (err) => {
        console.error(`Error clase con id ${scannedId} no existe `);
        return;
      },
    })
    if (this.asistenciaRepetida(claseRegistro)) {
      console.log('Asistencia ya registrada para el alumno', this.user.id);
      return;
    }
    claseRegistro.alumnos.push(this.user.id)
    this.clasesService.updateOne(scannedId, claseRegistro).subscribe({
      next: (clase) => {
        console.log('ASISTENCIA REGISTRADA:', clase);
      },
      error: (err) => {
        console.error('Error al registrar asistencia:', err);
        return
      },
    });
  }

  asistenciaRepetida(clase: { alumnos?: any; }) {
    if (clase.alumnos.includes(this.user.id)) {
      
      return true;
    }
    return false;
  }

}
