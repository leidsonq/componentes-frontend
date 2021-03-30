import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { UsuarioDTO } from "../../models/usuario.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class UsuarioService{

    constructor(public http: HttpClient, public storage: StorageService){
    }

    findByEmail(email: string) : Observable<UsuarioDTO> {


        return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuarios/email?value=${email}`);
    }

    getImageFromBuket(id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }

    insert(obj: UsuarioDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/usuarios`,
            obj,
            {
             observe:'response',
             responseType: 'text'
            }
        ) ;
    }

}