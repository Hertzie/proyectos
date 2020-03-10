import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController, ToastController } from '@ionic/angular';
import Actividad from '../models/Actividad';
import Comentario from '../models/Comentario';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

  private actividad : Actividad;
  private comentarios : Comentario[] = [];

  constructor(private modalController : ModalController, private navParams : NavParams, private promptController : AlertController, private toastController : ToastController) {
    this.actividad = navParams.get('actividad');
  }

  ngOnInit() {
      console.log("Actividad: ", this.actividad);
      this.cargarComentarios();
      console.log("Comentarios: ", this.comentarios);
  }

  cargarComentarios(){
    let comentarios = JSON.parse(localStorage.getItem('comentarios'));
    this.comentarios = comentarios.filter( c => c.idActividad == this.actividad.idActividad );
  }

  cerrarModal(){
    this.modalController.dismiss();
  }

  agregarComentario(comentario){
    let idActual = JSON.parse(localStorage.getItem('idComentarioActual'));
    let comentariosActuales = JSON.parse(localStorage.getItem('comentarios'));
    let comentarioNuevo : Comentario = {
      idComentario : ++idActual,
      idActividad : this.actividad.idActividad,
      idProyecto : this.actividad.idProyecto,
      contenido : comentario.contenido,
      fechaComentario : new Date()
    };

    comentariosActuales.push(comentarioNuevo);
    localStorage.setItem('comentarios', JSON.stringify(comentariosActuales));
    localStorage.setItem('idComentarioActual', idActual);
    this.cargarComentarios();
    this.presentarToastCreado();

  }

  async presentarToastCreado(){
    const toast = await this.toastController.create({
      message : 'Comentario agregado correctamente',
      duration : 2000
    });

    toast.present();
  }

  async presentarPromptComentario(){
    const prompt = await this.promptController.create({
      header : 'Ingrese comentario',
      inputs : [
        {
          name : 'contenido',
          type : 'text',
          placeholder : 'Contenido'
        }
      ],
      buttons : [
        {
          text : 'Cancelar',
          role : 'cancel',
          handler : () => {
            console.log("Comentario cancelado");
          }
        },
        {
          text : 'Guardar',
          handler : (event) => {
            this.agregarComentario(event);
          }
        }
      ]
    });
    await prompt.present();
  }

}
