import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";

@Injectable()
export class CategoriaService{

    constructor(public http: HttpClient){
    }

    findAll() : Observable<CategoriaDTO[]>{
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/modelos`);
    }


    sendDecomposicao(id: string, email: String): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/modelos/decomposicao?id=${id}&email=${email}`);
    }

    sendEstrategicas(id: string, email: String): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/modelos/estrategica?id=${id}&email=${email}`);
    }
    
    insert(obj: CategoriaDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/modelos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    findById(modelo_id: string) : Observable<CategoriaDTO>{
        return this.http.get<CategoriaDTO>(`${API_CONFIG.baseUrl}/modelos/${modelo_id}`);
    }
}