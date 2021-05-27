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

    insertNewModelo(fabMod: CategoriaDTO): Observable<any> {
        return this.http.post<any>(`${API_CONFIG.baseUrl}/modelos/insert`);
    }
}