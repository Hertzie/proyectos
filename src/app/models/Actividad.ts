import Comentario from './Comentario';

export default interface Actividad{
    idActividad : number,
    idProyecto : number,
    estatus : string,
    color : string,
    descripcionActividad : string,
    comentarios : Comentario[]
}