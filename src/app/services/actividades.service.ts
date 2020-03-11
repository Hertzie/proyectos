import Actividad from '../models/Actividad';

export default class ActividadesService{
    constructor(){
        
    }

    getActividades() : Actividad[]{
        return JSON.parse(localStorage.getItem('actividades'));
    }

    agregarActividad(actividad : Actividad) : void{
        let actividades = JSON.parse(localStorage.getItem('actividades'));
        actividades.push(actividad);
        localStorage.setItem('actividades', JSON.stringify(actividades));
        localStorage.setItem('idActividadActual', JSON.stringify(actividad.idActividad));
    }
}