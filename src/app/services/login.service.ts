import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _url = 'https://www.miprestadito.com'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  ingresar(IDApp: number, usuario: string, clave: string) {
    debugger
    const passwordHash = Md5.hashStr(clave).toString(); // Encriptar la contraseña a MD5

    const url = `${this._url}/APIsMoviles/APPAMP/api.php`;

    const parametros = {
      procedimiento: 'sp_MasterLoginMovilSinEMEI',
      parametros: `'${IDApp}','${usuario}','${passwordHash}'` // Utilizar la contraseña encriptada
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: parametros
    };

    return this.http.get<any[]>(url, options);
  }

  ObtenerMenu() {


  }
}
