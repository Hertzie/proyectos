import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import Proyecto from '../models/Proyecto';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
})
export class ProyectosPage implements OnInit {

  constructor(public alertController : AlertController, public toastController : ToastController) { }

  public proyectos : Proyecto[] = [];

  ngOnInit() {
    this.cargarProyectos();
  }

  async presentarToastCreado(){
    const toast = await this.toastController.create({
      message : 'Proyecto agregado correctamente',
      duration : 2000
    });

    toast.present();
  }

  async presentNuevoProyecto() {
    const alert = await this.alertController.create({
      header: 'Nuevo proyecto',
      inputs: [
        {
          name: 'nombreProyecto',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'descripcionProyecto',
          type: 'text',
          placeholder: 'Descripción'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Agregar',
          handler: (event) => {
            this.agregarNuevoProyecto(event);
          }
        }
      ]
    });

    await alert.present();
  }

  agregarNuevoProyecto(proyecto){
    let idActual = JSON.parse(localStorage.getItem('idProyectoActual'));
    let proyectosActuales = JSON.parse(localStorage.getItem('proyectos'));
    let nuevoProyecto : Proyecto = {
      idProyecto : ++idActual,
      nombreProyecto : proyecto.nombreProyecto,
      descripcionProyecto : proyecto.descripcionProyecto,
      fechaCreacion : new Date()
    };

    proyectosActuales.push(nuevoProyecto);
    localStorage.setItem('proyectos', JSON.stringify(proyectosActuales));
    localStorage.setItem('idProyectoActual', JSON.stringify(idActual));
    this.cargarProyectos();
    this.presentarToastCreado();
  }

  cargarProyectos(){
    this.proyectos = JSON.parse(localStorage.getItem('proyectos'));
  }

  calcularActividadesProyecto(proyecto){
    const actividades = JSON.parse(localStorage.getItem('actividades'));
    let actividadesProyecto = actividades.filter( a => a.idProyecto == proyecto.idProyecto );
  }

}
