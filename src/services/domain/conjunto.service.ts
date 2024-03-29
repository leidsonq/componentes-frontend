import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ConjuntoDTO } from "../../models/conjunto.dto";

@Injectable()
export class ConjuntoService{

    constructor(public http: HttpClient) {

    }

    findByModelo(modelo_id: string) {
            return this.http.get(`${API_CONFIG.baseUrl}/modelos/${modelo_id}`);
    }

    insert(obj: ConjuntoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/conjuntos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    findById(conjunto_id: string) : Observable<ConjuntoDTO>{
        return this.http.get<ConjuntoDTO>(`${API_CONFIG.baseUrl}/conjuntos/${conjunto_id}`);
    }

    delete(id: string): Observable<any> {
        return this.http.delete<any>(`${API_CONFIG.baseUrl}/conjuntos/${id}`);
    }

    update(obj: ConjuntoDTO, id: string) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/conjuntos/${id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    findByPalavraChave(palavra: string, modelo_id: string) : Observable<ConjuntoDTO[]>{
        return this.http.get<ConjuntoDTO[]>(`${API_CONFIG.baseUrl}/conjuntos/buscar?inicio=${palavra}&id=${modelo_id}`);
    }
}