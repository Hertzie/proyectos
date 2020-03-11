import { Component, OnInit } from '@angular/core';
import ActividadesService from '../services/actividades.service';
import Actividad from '../models/Actividad';


@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  private actividades : Actividad[] = [];
  private actividadesFiltradas : Actividad[] = [];

  constructor(private as : ActividadesService) { }

  ngOnInit() {
    this.actividades = this.as.getActividades();
    this.actividadesFiltradas = this.actividades;
  }

  handleBusqueda(event){
    const tecla = event.target.value.toLowerCase();
    this.actividadesFiltradas = this.actividades;
    requestAnimationFrame(() => {
      this.actividadesFiltradas = this.actividadesFiltradas.filter(a => a.descripcionActividad.toLowerCase().indexOf(tecla.trim().toLowerCase()) > -1 );
    });
  }
}
