import {BrowserModule} from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NuevoRelojComponent} from './tools/nuevo-reloj/nuevo-reloj.component';
import {ActivatedRouteSnapshot, RouterModule, Routes} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FormsModule} from '@angular/forms';
import {MainComponent} from './main/main.component';
import {WorkerRegComponent} from './_main_routes/worker-reg/worker-reg.component';
import {SnackbarComponent} from './tools/snackbar/snackbar.component';
import {AuthGuardService} from './_services/auth-guard.service';
import {RelojBuscadoComponent} from './tools/reloj-buscado/reloj-buscado.component';
import {MSelectComponent} from './tools/m-select/m-select.component';
import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';
import {VisualizerComponent} from './tools/visualizer/visualizer.component';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import {CurrentStorageService} from './_services/current-storage.service';
import {LoginComponent} from './_main_routes/login/login.component';
import {HomeComponent} from './_main_routes/secures/home/home.component';
import {SidebarComponent} from './_main_routes/sidebar/sidebar.component';
import {RegistroComponent} from './_main_routes/registro/registro.component';
import {BusquedaComponent} from './_main_routes/secures/busqueda/busqueda.component';
import {Ng2ImgMaxModule} from 'ng2-img-max';
import {RegistroPageComponent} from './registro-page/registro-page.component';
import {NuevaCajaComponent} from './nueva-caja/nueva-caja.component';
import {InputComponent} from './input/input.component';
import {FormButtonComponent} from './form-button/form-button.component';
import {ModelCajasService} from './model-cajas.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {VerLoteComponent} from './ver-lote/ver-lote.component';
import {TittlebarComponent} from './tittlebar/tittlebar.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {ExperimentosPageComponent} from './experimentos-page/experimentos-page.component';
import {InventarioPageComponent} from './inventario-page/inventario-page.component';
import {PublicacionesPageComponent} from './publicaciones-page/publicaciones-page.component';
import {VentasPageComponent} from './ventas-page/ventas-page.component';
import {HttpClientModule} from '@angular/common/http';
import {LoadbarComponent} from './loadbar/loadbar.component';
import {AuthService} from './auth.service';
import {ToolsService} from './_services/tools.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DbManagerFirestoreService} from './db-manager-firestore.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {HasherService} from './_services/hasher.service';
import {OAuthCallbackComponent} from './o-auth-callback/o-auth-callback.component';

// ng build --prod --base-href https://moena1989.github.io/moenaDbApp/
// ng build --prod --base-href https://moena-1989.firebaseapp.com/
// npx ngh --dir=dist/moenaDbApp

// canActivate: [AuthGuardService],
const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
const appRoutes: Routes = [
  {path: '', redirectTo: 'logIn', pathMatch: 'full'},
  {path: 'logIn', component: LoginComponent},
  {path: 'sign_up', component: WorkerRegComponent},
  {path: 'OAuthCallBack', component: OAuthCallbackComponent},
  {
    path: '', component: MainComponent, canActivate: [AuthGuardService], children: [
      {path: 'home', component: HomeComponent},
      {path: 'busqueda', component: BusquedaComponent},
      {
        path: 'registro', component: RegistroComponent, children:
          [
            {path: 'nuevo_reloj', component: NuevoRelojComponent},
            {path: 'nueva_caja', component: NuevaCajaComponent}
          ]
      },
      {path: 'inventario', component: InventarioPageComponent},
      {path: 'experimentos', component: ExperimentosPageComponent},
      {path: 'ventas', component: VentasPageComponent},
      {path: 'publicaciones', component: PublicacionesPageComponent},
    ]
  }, {
    path: 'externalRedirect',
    resolve: {
      url: externalUrlProvider,
    },
    // We need a component here because we cannot define the route otherwise
    component: LoginComponent,
  }];

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

const firebaseConfig = {
  apiKey: 'AIzaSyC2yKQPYRZeTnF1rqFNtWkAC8JVBAXEMTI',
  authDomain: 'moena-1989.firebaseapp.com',
  databaseURL: 'https://moena-1989.firebaseio.com',
  projectId: 'moena-1989',
  storageBucket: 'moena-1989.appspot.com',
  messagingSenderId: '641564036734'
};


@NgModule({
  declarations: [
    AppComponent,
    NuevoRelojComponent,
    SidebarComponent,
    BusquedaComponent,
    LoginComponent,
    MainComponent,
    WorkerRegComponent,
    SnackbarComponent,
    RegistroComponent,
    RelojBuscadoComponent,
    MSelectComponent, VisualizerComponent,
    HomeComponent, RegistroPageComponent,
    ExperimentosPageComponent, InventarioPageComponent,
    PublicacionesPageComponent, VentasPageComponent,
    NuevaCajaComponent, InputComponent, FormButtonComponent,
    VerLoteComponent, TittlebarComponent, TopBarComponent, LoadbarComponent, OAuthCallbackComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, BrowserAnimationsModule,
    AngularFireAuthModule, AngularFireStorageModule, HttpClientModule, AngularFireModule,
    BrowserModule, FormsModule, NgxSmartModalModule.forRoot(), Ng2ImgMaxModule, FontAwesomeModule
  ],
  providers: [{
    provide: externalUrlProvider,
    useValue: (route: ActivatedRouteSnapshot) => {
      const externalUrl = route.paramMap.get('externalUrl');
      window.open(externalUrl, '_self');
    },
  }, NgxSmartModalService, CurrentStorageService, {provide: StorageBucket, useValue: 'testing-this-shit'},
    ToolsService, ModelCajasService, AuthService, DbManagerFirestoreService, AngularFirestore, HasherService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // TODO simplificaar y utilizar iconos base
    library.add(fas, far);
  }
}
