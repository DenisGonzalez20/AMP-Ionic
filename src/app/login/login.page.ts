import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms"
import { AlertController, NavController } from '@ionic/angular';

interface ApiResponse {
  state: string,
  result: any
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

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

  async ingresar() {
    var formularioData = this.formularioLogin.value;

    let usuario = formularioData.usuario
    let password = formularioData.password
    let IDApp = 105

    this.loginService.ingresar(IDApp, usuario, password)
      .subscribe((response: any) => {
        debugger
        console.log(response)
        let test = response
        let state: string = response
        if (Number(state) != 1) {

        }
        else {
          this.navCtrl.navigateRoot('menu')
        }


      }, (error) => {
        console.error(error)
      })


  }

}
