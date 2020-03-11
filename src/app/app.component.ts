import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: "Proyectos",
      url: '/proyectos',
      icon: 'archive'
    },
    {
      title: 'Actividades',
      url: '/actividades',
      icon: 'checkmark'
    }
  ];

  public cliente : any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    

    this.inicializarStorage();
  }

  inicializarStorage(){
    if(!localStorage.getItem('proyectos')){
      localStorage.setItem('proyectos', JSON.stringify([]));
    }

    if(!localStorage.getItem('actividades')){
      localStorage.setItem('actividades', JSON.stringify([]));
    }

    if(!localStorage.getItem('comentarios')){
      localStorage.setItem('comentarios', JSON.stringify([]));
    }

    if(!localStorage.getItem('idProyectoActual')){
      localStorage.setItem('idProyectoActual', JSON.stringify(0));
    }

    if(!localStorage.getItem('idActividadActual')){
      localStorage.setItem('idActividadActual', JSON.stringify(0));
    }

    if(!localStorage.getItem('idComentarioActual')){
      localStorage.setItem('idComentarioActual', JSON.stringify(0));
    }
  }
}
