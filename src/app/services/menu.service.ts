import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { menuRespuesta } from '../menu/models/menu.model';
import { DetalleRespuesta } from '../menu/models/detalle-respuesta-menu.model';
import { IMenu } from '../menu/models/menu-respuesta.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _url = 'https://www.miprestadito.com'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  obtenerMenu(IDApp: number, IDusuario: number, IDSesion: number) {
    debugger

    const url = `${this._url}/APIsMoviles/APPAMP/api.php`;

    const parametros = {
      procedimiento: 'sp_CoreMovil_MenuUsuario',
      parametros: `'${IDSesion}','${IDApp}','${IDusuario}'` // Utilizar la contraseña encriptada
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: parametros
    };

    return this.http.get<IMenu>(url, options);
  }


}
