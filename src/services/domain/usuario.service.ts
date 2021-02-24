import { HttpClient, HttpHeaders } from "@angular/common/http";
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

        let tok = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders ({'Authorization': "Bearer " + tok});

        return this.http.get<UsuarioDTO>(
            `${API_CONFIG.baseUrl}/usuarios/email?value=${email}`,
            {'headers': authHeader});
    }

    getImageFromBuket(id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }

}