import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { 
  ClasesService
 } from 'src/app/services/clases/clases.service';
import { Clase } from 'src/app/models/clase.model';
import { Registro } from 'src/app/models/registro.model';

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
      nombre: 'Clase 1', registros: [],
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
    const scannedId = this.escanearQr();
    this.clasesService.getOne(scannedId).subscribe({
      next: (clase) => {
        let claseRegistro: Clase = clase;

        // Verificar si la asistencia ya está registrada
        if (this.asistenciaRepetida(claseRegistro)) {
          console.log('Asistencia ya registrada para el alumno', this.user.id);
          return;
        }

        // Crear un nuevo registro de asistencia
        const nuevoRegistro: Registro = {
          alumno_id: this.user.id,
          date: new Date(),
        };

        // Agregar el nuevo registro a la lista
        claseRegistro.registros.push(nuevoRegistro);

        // Actualizar la clase en el backend
        this.clasesService.updateOne(scannedId, claseRegistro).subscribe({
          next: (updatedClase) => {
            console.log('ASISTENCIA REGISTRADA:', updatedClase);
          },
          error: (err) => {
            console.error('Error al registrar asistencia:', err);
          },
        });
      },
      error: (err) => {
        console.error(`Error: clase con id ${scannedId} no existe`);
      },
    });
  }

  asistenciaRepetida(clase: Clase) {
    console.log({clase})
    const registroEncontrado = clase.registros.find((registro: Registro) => {
      return registro.alumno_id === this.user.id
    })
    console.log({registroEncontrado})
    return registroEncontrado;
  }


  escanearQr(){
    const claseId = '24da';
    return claseId;
  }

}
