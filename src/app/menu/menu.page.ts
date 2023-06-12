import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MenuService } from '../services/menu.service';
import { menuRespuesta } from './models/menu.model';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { DetalleRespuesta } from './models/detalle-respuesta-menu.model';
import { IMenu } from './models/menu-respuesta.model';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { ViewChild, ElementRef } from '@angular/core';

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
  selectedUrlString: string = ''
  selectedUrl: SafeResourceUrl = ''
  tituloVentana: string = ''

  // menuItems: MenuItem[] = [
  //   { name: 'Elemento 1', url: 'https://miprestadito.com' },
  //   { name: 'Elemento 2', url: 'https://musicca.com' },
  //   { name: 'Elemento 3', url: 'https://crediflashauto.com' },
  // ];
  menuItems: Array<menuRespuesta> = [];
  // refrescarIframe() {
  //   const iframe: HTMLIFrameElement = this.miIframe.nativeElement;
  //   iframe.contentWindow.location.reload();
  // }

  openMenuItem(url: string, tituloVentana: string) {

    this.selectedUrl = this.dom.bypassSecurityTrustResourceUrl(url)
    this.tituloVentana = tituloVentana
    this.menu.close()
  }
  constructor(private dom: DomSanitizer,
    private menuservice: MenuService, private userService: UserService,
    public navCtrl: NavController, private menu: MenuController) {
    this.obtenerMenu()
  }

  ngOnInit() {
  }

  async obtenerMenu() {
    const IDApp: number = 105
    const menuObservable: Observable<IMenu> = this.menuservice.
      obtenerMenu(this.userService.IdApp, this.userService.IdUsuario, this.userService.IdSesion)

    menuObservable.subscribe(
      (response: IMenu) => {
        var MenuItemsRespuesta: Array<menuRespuesta> = response.request[0].result
        this.menuItems = MenuItemsRespuesta;
        this.tituloVentana = MenuItemsRespuesta[0].fcTituloVentana
        this.selectedUrl = this.dom.bypassSecurityTrustResourceUrl(MenuItemsRespuesta[0].fcURL)
        this.selectedUrlString = MenuItemsRespuesta[0].fcURL

      }



    )
  }
  async Logout() {
    this.navCtrl.navigateRoot('login')
    this.userService.IdApp = 0
    this.userService.IdSesion = 0
    this.userService.IdUsuario = 0
  }
  async Refresh() {
  }
}
