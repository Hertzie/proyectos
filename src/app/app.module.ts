import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComentariosPage } from './comentarios/comentarios.page';
import {LongPressModule} from 'ionic-long-press';
import ParseService from './services/parse.service';
import ProyectosService from './services/proyectos.service';


@NgModule({
  declarations: [AppComponent, ComentariosPage],
  entryComponents: [ComentariosPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    LongPressModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ProyectosService,
    ParseService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector : Injector){
  }
}
