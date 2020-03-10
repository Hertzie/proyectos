import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProyectosPageRoutingModule } from './proyectos-routing.module';

import { ProyectosPage } from './proyectos.page';
import { ProyectocardComponent } from '../proyectocard/proyectocard.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProyectosPageRoutingModule
  ],
  declarations: [ProyectosPage, ProyectocardComponent],
  entryComponents: [ProyectocardComponent]
})
export class ProyectosPageModule {}
