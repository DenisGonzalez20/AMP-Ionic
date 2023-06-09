import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public IdUsuario: number
  public IdApp: number
  public IdSesion: number


  constructor() {
    this.IdApp = 0
    this.IdSesion = 0
    this.IdUsuario = 0
  }
}
