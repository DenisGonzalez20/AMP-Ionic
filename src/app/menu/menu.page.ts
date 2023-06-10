import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MenuService } from '../services/menu.service';
import { menuRespuesta } from './models/menu.model';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { DetalleRespuesta } from './models/detalle-respuesta-menu.model';
import { IMenu } from './models/menu-respuesta.model';
import { NavController } from '@ionic/angular';
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
  selectedUrl: SafeResourceUrl = ''
  @ViewChild('IframeOpciones',) miIframe: ElementRef;

  // menuItems: MenuItem[] = [
  //   { name: 'Elemento 1', url: 'https://miprestadito.com' },
  //   { name: 'Elemento 2', url: 'https://musicca.com' },
  //   { name: 'Elemento 3', url: 'https://crediflashauto.com' },
  // ];
  menuItems:Array< menuRespuesta> = [];
  refrescarIframe() {
    const iframe: HTMLIFrameElement = this.miIframe.nativeElement;
    iframe.contentWindow.location.reload();
  }

  openMenuItem(url: string) {

    // Implementa la lógica para abrir la URL o realizar otra acción
  
    this.selectedUrl = this.dom.bypassSecurityTrustResourceUrl(url)
  }
  constructor(private dom: DomSanitizer,
    private menuservice: MenuService, private userService: UserService,public navCtrl: NavController) {
    this.obtenerMenu()
  }

  ngOnInit() {
  }

  async obtenerMenu() {
    const IDApp: number = 105
    const menuObservable: Observable<IMenu> = this.menuservice.
      obtenerMenu(this.userService.IdApp, this.userService.IdUsuario, this.userService.IdSesion)

    menuObservable.subscribe(
      (response:IMenu) => {
        var MenuItemsRespuesta:Array<menuRespuesta> =response.request[0].result
        this.menuItems=MenuItemsRespuesta;
        this.selectedUrl=this.dom.bypassSecurityTrustResourceUrl(MenuItemsRespuesta[0].fcURL)
         

      }



    )
  }
  async Logout(){
    this.navCtrl.navigateRoot('login')
  }
  async Refresh(url:string){
    
  }


}
