import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NuevoIngresoRelojComponent} from './tools/nuevo-ingreso-reloj/nuevo-ingreso-reloj.component';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainComponent} from './main/main.component';
import {WorkerRegComponent} from './_main_routes/worker-reg/worker-reg.component';
import {SnackbarComponent} from './tools/snackbar/snackbar.component';
import {AuthGuardService} from './_services/auth-guard.service';
import {RelojBuscadoComponent} from './tools/reloj-buscado/reloj-buscado.component';
import {MSelectComponent} from './tools/m-select/m-select.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {VisualizerComponent} from './tools/visualizer/visualizer.component';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import {CurrentStorageService} from './_services/current-storage.service';
import {LoginComponent} from './_main_routes/login/login.component';
import {HomeComponent} from './_main_routes/home/home.component';
import {NavbarComponent} from './_main_routes/navbar/navbar.component';
import {RegistroComponent} from './_main_routes/registro/registro.component';
import {BusquedaComponent} from './_main_routes/busqueda/busqueda.component';
import {Ng2ImgMaxModule} from 'ng2-img-max';
import {RegistroPageComponent} from './registro-page/registro-page.component';
import {NuevaCajaComponent} from './nueva-caja/nueva-caja.component';
import {InputComponent} from './input/input.component';
import {FormButtonComponent} from './form-button/form-button.component';
import {ModelCajasService} from './model-cajas.service';

// ng build --prod --base-href https://moena1989.github.io/moena_reg_page/
// npx ngh --dir=dist/moena1989

const appRoutes: Routes = [
  {path: 'logIn', component: LoginComponent},
  {path: 'sign_up', component: WorkerRegComponent},
  {
    path: '', component: MainComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: HomeComponent},
      {path: 'busqueda', component: BusquedaComponent},
      {
        path: 'registro', component: RegistroComponent, children:
          [
            {path: 'nuevo_reloj', component: NuevoIngresoRelojComponent},
            {path: 'nueva_caja', component: NuevaCajaComponent}
          ]
      },
    ]
  }
];

// REAL DATABASE
// const config = {
//   apiKey: 'AIzaSyAh48TUW_EdI6fI6om3EMRCdlCC4U3n9U8',
//   authDomain: 'moenamaindb.firebaseapp.com',
//   databaseURL: 'https://moenamaindb.firebaseio.com',
//   projectId: 'moenamaindb',
//   storageBucket: 'moenamaindb.appspot.com',
//   messagingSenderId: '427343243507'
// };

// TEST DATABASE

const config = {
  apiKey: 'AIzaSyD3mN3H_wzfhYtDsyzb0N4ToVI22Wdu4ME',
  authDomain: 'moenadbtst.firebaseapp.com',
  databaseURL: 'https://moenadbtst.firebaseio.com',
  projectId: 'moenadbtst',
  storageBucket: 'moenadbtst.appspot.com',
  messagingSenderId: '574556298528'
};

// var
// current_opciones
// current_opciones
@NgModule({
  declarations: [
    AppComponent,
    NuevoIngresoRelojComponent,
    NavbarComponent,
    BusquedaComponent,
    LoginComponent,
    MainComponent,
    WorkerRegComponent,
    SnackbarComponent,
    RegistroComponent,
    RelojBuscadoComponent,
    MSelectComponent, VisualizerComponent, HomeComponent, RegistroPageComponent, NuevaCajaComponent, InputComponent, FormButtonComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule, AngularFireStorageModule,
    BrowserModule, FormsModule, NgxSmartModalModule.forRoot(), Ng2ImgMaxModule, ReactiveFormsModule
  ],
  providers: [NgxSmartModalService, CurrentStorageService, ModelCajasService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
