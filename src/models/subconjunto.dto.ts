import { ConjuntoDTO } from "./conjunto.dto";

export interface SubConjuntoDTO {
    id: string;
    descricao: string;
    conjunto: ConjuntoDTO;
    codigoD: string;

}