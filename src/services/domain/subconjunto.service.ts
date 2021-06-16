import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { SubConjuntoDTO } from "../../models/subconjunto.dto";

@Injectable()
export class SubConjuntoService{

    constructor(public http: HttpClient) {

    }

    insert(obj: SubConjuntoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/subconjuntos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    findById(subConjunto_id: string) : Observable<SubConjuntoDTO>{
        return this.http.get<SubConjuntoDTO>(`${API_CONFIG.baseUrl}/subconjuntos/${subConjunto_id}`);
    }

    findByConjunto(conjunto_id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/conjuntos/${conjunto_id}`);
}

}