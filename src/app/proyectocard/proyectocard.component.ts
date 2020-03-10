import { Component, OnInit, Input } from '@angular/core';
import Actividad from '../models/Actividad';

@Component({
  selector: 'proyecto-card',
  templateUrl: './proyectocard.component.html',
  styleUrls: ['./proyectocard.component.scss'],
})
export class ProyectocardComponent implements OnInit {
  @Input() proyecto: any;
  private actividades : Actividad[] = [];
  private totales : number = 0;
  private proceso : number = 0;
  private terminadas : number = 0;
  private sinEmpezar : number = 0;
  private avance : string = '0.0';

  constructor() { }

  ngOnInit() {}

  ngAfterContentInit(){
    this.cargarLabels();
  }

  cargarLabels(){
    const actividades = JSON.parse(localStorage.getItem('actividades'));
    this.actividades = actividades.filter( a => a.idProyecto == this.proyecto.idProyecto );
    this.totales = this.actividades.length;
    this.proceso = this.actividades.filter( a => a.estatus == 'En proceso').length;
    this.terminadas = this.actividades.filter( a => a.estatus == 'Terminada' ).length;
    this.sinEmpezar = this.actividades.filter( a => a.estatus == 'Sin comenzar' ).length;
    this.avance = ((this.terminadas * 100) / this.totales).toFixed(2);
  }

  ngAfterContentChecked(){
    this.cargarLabels();
  }

}
