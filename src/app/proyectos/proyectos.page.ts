import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import Proyecto from '../models/Proyecto';
import Parse from 'parse';
import {appKey, jsKey, apiUrl, masterKey} from '../config/credenciales';
import ParseService from '../services/parse.service';
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
})
export class ProyectosPage implements OnInit {

  constructor(public alertController : AlertController, public toastController : ToastController, private ps : ParseService) {
  }

  public proyectos : Proyecto[] = [];

  ngOnInit() {
    //this.cargarProyectos();
    this.ps.obtenerRest();
  }

  async obtenerProyectos(){
    const data = await this.ps.obtenerTodos('B4aVehicle');
    console.log(data); 
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

  async agregarNuevoProyecto(proyecto){
    let nuevoProyecto : Proyecto = {
      idProyecto : 0,
      nombreProyecto : proyecto.nombreProyecto,
      descripcionProyecto : proyecto.descripcionProyecto,
      fechaCreacion : new Date()
    };

    // const creado = await this.ps.guardarProyecto(nuevoProyecto);
    // if(creado){
    //   this.proyectos = [];
    //   this.cargarProyectos();
    //   this.presentarToastCreado();
    }
  }

  // async cargarProyectos(){
  //   const response = await this.ps.getProyectos();
  //   if(response.length){
  //     response.forEach( p => {
  //       let proyecto : Proyecto = {
  //         idProyecto : p.id,
  //         nombreProyecto : p.attributes.nombreProyecto,
  //         descripcionProyecto : p.attributes.descripcionProyecto,
  //         fechaCreacion : p.attributes.fechaCreacion
  //       };
  
  //       this.proyectos.push(proyecto);
  //     });
  //   }
  // }

  // calcularActividadesProyecto(proyecto){
  //   const actividades = JSON.parse(localStorage.getItem('actividades'));
  //   let actividadesProyecto = actividades.filter( a => a.idProyecto == proyecto.idProyecto );
  // }


