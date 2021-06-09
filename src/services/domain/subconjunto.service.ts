import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

}