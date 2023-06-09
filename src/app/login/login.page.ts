import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms"
import { AlertController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Respuesta } from './models/respuesta.model';
import { UserService } from '../services/user.service';
import { Usuario } from './models/usuario.model';

interface ResponseData {
  request: {
    state: string
    result: Usuario
  }
}


let algo
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  errorMensaje: string = '';
  usuarios: Usuario[] = [];
  formularioLogin: FormGroup;
  constructor(public fb: FormBuilder, private loginService: LoginService, public alertController: AlertController,
    public navCtrl: NavController, private userService: UserService) {
    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async ingresar() {

    var formularioData = this.formularioLogin.value;

    let usuario = formularioData.usuario
    let password = formularioData.password

    const IDApp: number = 105
    const loginObservable: Observable<Respuesta> = this.loginService.
      ingresar(IDApp, usuario, password)

    loginObservable.subscribe(
      (response: Respuesta) => {
        let AccesoAutorizado: number = response.request[0].result[0].fiAccesoAutorizado

        if (AccesoAutorizado == 1) {

          this.userService.IdUsuario = response.request[0].result[0].fiIDUsuario
          this.userService.IdApp = IDApp
          this.userService.IdSesion = response.request[0].result[0].fiIDSesion

          this.navCtrl.navigateRoot('menu')
        }
        else {
          alert("negativo")
        }
      }



    )


    //array=[url:"url",nombre:"youtube"]

    // this.loginService.ingresar(IDApp, usuario, password)
    //   .subscribe(response => {

    //     this.datos = response
    //     console.log(this.datos)



    //     // if (Number(3) != 1) {
    //     //   this.navCtrl.navigateRoot('menu')
    //     // }
    //     /*  else {

    //      } */


    //   }, (error) => {
    //     console.error(error)
    //   })




  }

}
