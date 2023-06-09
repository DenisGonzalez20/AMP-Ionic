import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MenuService } from '../services/menu.service';
import { menuRespuesta } from './models/menu.model';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { DetalleRespuesta } from './models/detalle-respuesta-menu.model';


interface MenuItem {
  name: string;
  url: string;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

export class MenuPage implements OnInit {
  selectedUrl: SafeResourceUrl = ''

  // menuItems: MenuItem[] = [
  //   { name: 'Elemento 1', url: 'https://miprestadito.com' },
  //   { name: 'Elemento 2', url: 'https://musicca.com' },
  //   { name: 'Elemento 3', url: 'https://crediflashauto.com' },
  // ];
  menuItems: menuRespuesta[] = [];


  openMenuItem(url: string) {

    // Implementa la lógica para abrir la URL o realizar otra acción
    console.log('Abrir URL:', url);
    this.selectedUrl = this.dom.bypassSecurityTrustResourceUrl(url)
  }
  constructor(private dom: DomSanitizer,
    private menuservice: MenuService, private userService: UserService) {
    this.obtenerMenu()
  }

  ngOnInit() {
  }

  async obtenerMenu() {
    const IDApp: number = 105
    const menuObservable: Observable<Array<DetalleRespuesta>> = this.menuservice.
      obtenerMenu(this.userService.IdApp, this.userService.IdUsuario, this.userService.IdSesion)

    menuObservable.subscribe(
      (response: Array<DetalleRespuesta>) => {
        console.log(response)
        this.menuItems = response[0].result

      }



    )
  }


}
