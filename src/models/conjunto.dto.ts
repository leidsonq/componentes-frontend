import { CategoriaDTO } from "./categoria.dto";

export interface ConjuntoDTO {
    id: string;
    descricao: string;
    fabricanteModelo: CategoriaDTO;
    codigoD: string;

}