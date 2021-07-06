import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ErrorIterceptorProvider } from '../interceptors/error-interceptor';
import { CategoriaService } from '../services/domain/categoria.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/domain/usuario.service';
import { AuthIterceptorProvider } from '../interceptors/auth-interceptor';
import { ConjuntoService } from '../services/domain/conjunto.service';
import { ComponenteService } from '../services/domain/componente.service';
import { SubConjuntoService } from '../services/domain/subconjunto.service';
import { Camera } from '@ionic-native/camera';
import { ImageUtilService } from '../services/image-util.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoriaService,
    AuthIterceptorProvider,
    ErrorIterceptorProvider,
    AuthService,
    StorageService,
    UsuarioService,
    ConjuntoService,
    ComponenteService,
    SubConjuntoService,
    Camera,
    ImageUtilService
  ]
})
export class AppModule{}
