import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ComponenteDTO } from "../../models/componente.dto";

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

    findBySubStartWith(inicio: string): Observable<ComponenteDTO[]> {
        return this.http.get<ComponenteDTO[]>(`${API_CONFIG.baseUrl}/componentes/inicio?inicio=${inicio}`);
    }

    findByChave(chave: string): Observable<ComponenteDTO[]> {
        return this.http.get<ComponenteDTO[]>(`${API_CONFIG.baseUrl}/componentes/chave?chave=${chave}`);
    }

    findById(componente_id: string) {
        return this.http.get<ComponenteDTO>(`${API_CONFIG.baseUrl}/componentes/${componente_id}`);
    }

    getSmallImageFromBucket (codDatasul: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/${codDatasul}-small.jpg`
        return this.http.get(url,{responseType: 'blob'});
    }

    getImageFromBucket (codDatasul: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/${codDatasul}.jpg`
        return this.http.get(url,{responseType: 'blob'});
    }

    getDetailsImageFromBucket (codDatasul: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/${codDatasul}-details.jpg`
        return this.http.get(url,{responseType: 'blob'});
    }

    insert(obj: ComponenteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/componentes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}