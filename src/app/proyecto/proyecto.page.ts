import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Proyecto from '../models/Proyecto';
import Comentario from '../models/Comentario';
import Actividad from '../models/Actividad';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { ComentariosPage } from '../comentarios/comentarios.page';
import ProyectosService from '../services/proyectos.service';


@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.page.html',
  styleUrls: ['./proyecto.page.scss'],
})
export class ProyectoPage implements OnInit {

  public idProyecto : string;
  public proyecto : Proyecto;
  public actividades : Actividad[] = [];


  constructor(private activatedRoute : ActivatedRoute, private prompt : AlertController, private toast : ToastController, private modalController : ModalController, private ps : ProyectosService) { 
    this.idProyecto = this.activatedRoute.snapshot.paramMap.get('id');
    this.cargarProyecto();
  }

  ngOnInit() {
    
    //let proyectos = JSON.parse(localStorage.getItem('proyectos'));
    //let proyecto = proyectos.filter( p => p.idProyecto == this.idProyecto );
    //this.proyecto = proyecto[0];
    //console.log("Id proyecto: ", this.idProyecto);
    //this.cargarProyecto(this.idProyecto);
    //this.cargarActividadesProyecto();
    //console.log("Actividades: ", this.actividades);
  }

  async cargarProyecto(){
    const proyecto = await this.ps.obtenerProyecto(this.idProyecto);
    this.proyecto = {
      idProyecto : proyecto.id,
      nombreProyecto : proyecto.attributes.nombreProyecto,
      descripcionProyecto : proyecto.attributes.descripcionProyecto,
      fechaCreacion : proyecto.attributes.fechaCreacion
    };

    console.log("Proyecto: ", this.proyecto);
  }

  cargarActividadesProyecto(){
    let actividades = JSON.parse(localStorage.getItem('actividades'));
    this.actividades = actividades.filter( a => a.idProyecto == this.idProyecto );
  }

  async presentarPromptEliminarActividad(act){
    const prompt = await this.prompt.create({
      header : 'Eliminar actividad',
      message : 'Esta acción eliminará la actividad y sus comentarios. ¿Desea continuar?',
      buttons : [
        {
          text : 'Cancelar',
          role : 'cancel',
          handler : () => {
            console.log("Cancelo eliminacion");
          }
        },
        {
          text : 'Aceptar',
          handler : () => {
            this.eliminarActividad(act);
          }
        }
      ]
    });

    await prompt.present();
  }

  eliminarActividad(act){
    let comentarios = JSON.parse(localStorage.getItem('comentarios'));
    let actividades = JSON.parse(localStorage.getItem('actividades'));
    let comentariosRestantes = comentarios.filter( c => c.idActividad != act.idActividad );
    let actividadesRestantes = actividades.filter( a => a.idActividad != act.idActividad );
    localStorage.setItem('comentarios', JSON.stringify(comentariosRestantes));
    localStorage.setItem('actividades', JSON.stringify(actividadesRestantes));
    this.cargarActividadesProyecto();
    this.presentarToast('Actividad eliminada correctamente');
  }

  asignarActividad(actividad){
    let idActual = JSON.parse(localStorage.getItem('idActividadActual'));
    let actividadesActuales = JSON.parse(localStorage.getItem('actividades'));
    let comentarios : Comentario[] = [];
    let nuevaActividad : Actividad = {
      idActividad : ++idActual,
      idProyecto : parseInt(this.idProyecto),
      estatus : 'Sin comenzar',
      color : 'danger',
      descripcionActividad : actividad.contenidoActividad,
      comentarios : comentarios
    }

    actividadesActuales.push(nuevaActividad);
    localStorage.setItem('actividades', JSON.stringify(actividadesActuales));
    localStorage.setItem('idActividadActual', JSON.stringify(idActual));

    this.cargarActividadesProyecto();
    this.presentarToast('Actividad asignada correctamente');
  }

  async cambiarEstatusActividad(actividad){
    if(actividad.estatus != 'Terminada'){
      let mensaje = '';
      let color = actividad.color;
      let estatus = actividad.estatus;
      if(actividad.estatus == 'Sin comenzar'){
        mensaje = `Esta acción empezará la actividad seleccionada <strong>${actividad.descripcionActividad}</strong>`;
        actividad.estatus = 'En proceso';
        actividad.color = 'primary';
        
      }else{
        mensaje = `Esta acción finalizará la actividad seleccionada <strong>${actividad.descripcionActividad}</strong>`;
        actividad.estatus = 'Terminada';
        actividad.color = 'success';
      }

      const alert = await this.prompt.create({
        header: `Empezar actividad`,
        message: mensaje,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              actividad.estatus = estatus;
              actividad.color = color;
              this.cargarActividadesProyecto();
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.presentarToast('Estatus de actividad actualizado correctamente');
              let actividades = JSON.parse(localStorage.getItem('actividades'));
              let actividadActual = actividades.findIndex( a => a.idActividad == actividad.idActividad );
              actividades[actividadActual] = actividad;
              localStorage.setItem('actividades', JSON.stringify(actividades));
              this.cargarActividadesProyecto();
            }
          }
        ]
      });

      await alert.present();
    }else{
      this.presentarToast('La actividad ya ha sido finalizada');
    }
  }

  async presentarToast(mensaje){
    const toast = await this.toast.create({
      message : mensaje,
      duration : 2000
    });

    toast.present();
  }

  async levantarModalComentarios(actividad){
    if(actividad.estatus == 'En proceso' || actividad.estatus == 'Terminada'){
      const modal = await this.modalController.create({
        component : ComentariosPage,
        componentProps : {
          'actividad' : actividad
        }
      });

      return await modal.present();
    }else{
      this.presentarToast('No puedes agregar comentarios si no se inicia la actividad');
    }
  }

  async presentarActividadPrompt(){
    const prompt = await this.prompt.create({
      header : 'Asignar actividad',
      inputs : [
        {
          name : 'contenidoActividad',
          type : 'text',
          placeholder : 'Descrición'
        }
      ],
      buttons : [
        {
          text : 'Cancelar',
          role : 'cancel',
          cssClass : 'secondary',
          handler : () => {
            console.log("Cancelo actividad");
          }
        },
        {
          text : 'Asignar',
          handler : (event) => {
            this.asignarActividad(event);
          }
        }
      ]
    });

    await prompt.present();
  }




}
