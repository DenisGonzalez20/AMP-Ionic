import { Usuario } from "./usuario.model";

export interface DetalleRespuesta {
    state: string;
    result: Array<Usuario>
}