import Parse from 'parse';
import {appKey, jsKey, apiUrl, restApiKey} from '../config/credenciales';

export default class ParseService{
    public cliente : any;
    constructor(){
        Parse.serverURL = apiUrl;
        Parse.initialize(appKey, jsKey);
    }

    obtenerTodos(clase : string) : any[]{
        let query = new Parse.Query(clase);
        return query.find();
    }

    obtenerRest(){
        const data = {
            where : {
                objectId : 'YZOeoO3bx6'
            }
        };

        fetch('https://proyectos.back4app.io/classes/Proyectos', {
            headers : {
                'X-Parse-Application-Id' : appKey,
                'X-Parse-REST-API-Key' : restApiKey
            }
        }).then(resp => resp.json()).catch(err => console.log(err)).then(response => console.log(response));
    }

}