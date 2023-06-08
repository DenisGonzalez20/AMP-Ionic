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

interface Usuario {
  fiAccesoAutorizado: number;
  fiIDUsuario: number;
  fcMensaje: string;
  fcNombreCorto: string;
  fiIDEquipo: number;
  fiIDSesion: number;
  fcPuesto: string | null;
  fiEsSupervisor: number;
  fcCorreoElectronico: string;
}
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
    public navCtrl: NavController) {
    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }
  datos: any = []
  async ingresar() {

    var formularioData = this.formularioLogin.value;

    let usuario = formularioData.usuario
    let password = formularioData.password

    let IDApp = 105
    const loginObservable: Observable<any[]> = this.loginService.
      ingresar(IDApp, usuario, password)

    loginObservable.subscribe(
      (response: any[]) => {
        debugger
        const request = response[0]
        console.log(request.state)
      }



    )

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
