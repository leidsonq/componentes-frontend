import { ConjuntoDTO } from "./conjunto.dto";
import { SubConjuntoDTO } from "./subconjunto.dto";

export interface ComponenteDTO {
    id: string;
    descricao: string;
    codigoD: string;
    conjunto: ConjuntoDTO;
    subConjunto: SubConjuntoDTO;
    imageUrl?: string;
    imageDetailsUrl?: string;
}