import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ComponenteService{

    constructor(public http: HttpClient) {

    }

    findByConjunto(conjunto_id: string) {
            return this.http.get(`${API_CONFIG.baseUrl}/conjuntos/${conjunto_id}`);
    }

    findBySubConjunto(subconjunto_id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/subconjuntos/${subconjunto_id}`);
    }

}