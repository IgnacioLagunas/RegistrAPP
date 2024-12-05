import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro-qr',
  templateUrl: './registro-qr.page.html',
  styleUrls: ['./registro-qr.page.scss'],
})
export class RegistroQrPage implements OnInit {

  id_clase: string= '0';

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit() {
    const id_clase = this.route.snapshot.paramMap.get('id_clase');
    this.id_clase = id_clase ? id_clase : '0';
    console.log('ID recibido:', this.id_clase);
  }

}
