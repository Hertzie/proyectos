import Parse from 'parse';
import Proyecto from '../models/Proyecto';
import {appKey, jsKey, apiUrl} from '../config/credenciales';

export default class ProyectosService{
    private Proyectos : any;
    constructor(){
        Parse.serverURL = apiUrl;
        Parse.initialize(appKey, jsKey);
        this.Proyectos = Parse.Object.extend('Proyectos');
    }

    async getProyectos() {
        let query = new Parse.Query(this.Proyectos);
        return await query.find();
    }

    async guardarProyecto(proyecto : Proyecto){
        const project = new this.Proyectos();
        project.set('idProyecto', proyecto.idProyecto);
        project.set('nombreProyecto', proyecto.nombreProyecto);
        project.set('descripcionProyecto', proyecto.descripcionProyecto);
        project.set('fechaCreacion', new Date(proyecto.fechaCreacion));

        return await project.save();
    }

    async obtenerProyecto(idProyecto : string){
        let query = new Parse.Query(this.Proyectos);
        return await query.get(idProyecto);
    }

}