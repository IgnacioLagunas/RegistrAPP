import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

import { IonicModule } from '@ionic/angular';

import { RegistroQrPageRoutingModule } from './registro-qr-routing.module';

import { RegistroQrPage } from './registro-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroQrPageRoutingModule,
    QRCodeModule
  ],
  declarations: [RegistroQrPage]
})
export class RegistroQrPageModule {}
