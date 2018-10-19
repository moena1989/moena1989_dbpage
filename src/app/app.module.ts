import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NuevoIngresoRelojComponent} from './nuevo-ingreso-reloj/nuevo-ingreso-reloj.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SelecterComponent} from './utils/selecter/selecter.component';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {BusquedaComponent} from './busqueda/busqueda.component';


const appRoutes: Routes = [
  {path: '', component: NuevoIngresoRelojComponent},
  {path: 'busqueda', component: BusquedaComponent}];

const config = {
  apiKey: 'AIzaSyAh48TUW_EdI6fI6om3EMRCdlCC4U3n9U8',
  authDomain: 'moenamaindb.firebaseapp.com',
  databaseURL: 'https://moenamaindb.firebaseio.com',
  projectId: 'moenamaindb',
  storageBucket: 'moenamaindb.appspot.com',
  messagingSenderId: '427343243507'
};

@NgModule({
  declarations: [
    AppComponent,
    NuevoIngresoRelojComponent,
    NavbarComponent,
    SelecterComponent,
    BusquedaComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
