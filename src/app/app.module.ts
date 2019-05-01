import {routes} from './environment/routing';
import {APP_INITIALIZER, InjectionToken, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NuevoRelojComponent} from './tools/nuevo-reloj/nuevo-reloj.component';
import {ActivatedRouteSnapshot, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/general/home/home.component';
import {ExperimentosPageComponent} from './pages/dev/experimentos-page/experimentos-page.component';
import {TittlebarComponent} from './components/windowsbar/tittlebar.component';
import {VisualizerComponent} from './tools/visualizer/visualizer.component';
import {FormsModule} from '@angular/forms';
import {VerTendenciasPageComponent} from './pages/por_def/ver-tendencias-page/ver-tendencias-page.component';
import {CaracteristicasPageComponent} from './pages/caracteristicas-page/caracteristicas-page.component';
import {SnackbarComponent} from './tools/snackbar/snackbar.component';
import {PublicacionesPageComponent} from './pages/marketing/publicaciones-page/publicaciones-page.component';
import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';
import {far} from '@fortawesome/free-regular-svg-icons';
import {VisualizadorConfigModeloCajaComponent} from './components/visualizador-config-modelo-caja/visualizador-config-modelo-caja.component';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {VerTendenciaPageComponent} from './pages/por_def/ver-tendencia-page/ver-tendencia-page.component';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {InventarioPageComponent} from './pages/accounting/inventario-page/inventario-page.component';
import {DbMainService} from './services/routes/db-main.service';
import {VisualizadorConfigPulsoComponent} from './components/visualizador-config-pulso/visualizador-config-pulso.component';
import {VisualizadorConfigHebillaComponent} from './components/visualizador-config-hebilla/visualizador-config-hebilla.component';
import {VerTiposProductosComponent} from './components/ver-tipos-productos/ver-tipos-productos.component';
import {TabsComponent} from './components/resources/tabs/tabs.component';
import {HasherService} from './services/hasher.service';
import {RegistroComponent} from './pages/por_def/registro/registro.component';
import {ModelsSevice} from './services/models/model-cajas.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NuevaCajaComponent} from './components/nueva-caja/nueva-caja.component';
import {MainComponent} from './components/main/main.component';
import {SettingsService} from './services/settings.service';
import {RelojBuscadoComponent} from './tools/reloj-buscado/reloj-buscado.component';
import {LoadbarComponent} from './components/resources/loadbar/loadbar.component';
import {VisualizadorConfigTapaComponent} from './components/visualizador-config-tapa/visualizador-config-tapa.component';
import {VerLoteComponent} from './components/resources/ver-lote/ver-lote.component';
import {CurrentStorageService} from './services/current-storage.service';
import {Ng2ImgMaxModule} from 'ng2-img-max';
import {VentasPageComponent} from './pages/por_def/ventas-page/ventas-page.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {LoginComponent} from './pages/general/login/login.component';
import {VisualizadorConfigCajaComponent} from './components/visualizador-config-caja/visualizador-config-caja.component';
import {MSelectComponent} from './tools/m-select/m-select.component';
import {library} from '@fortawesome/fontawesome-svg-core';
import {AuthService} from './services/routes/auth.service';
import {RegistroPageComponent} from './pages/por_def/registro-page/registro-page.component';
import {TopBarComponent} from './components/environment/top-bar/top-bar.component';
import {SidebarComponent} from './components/environment/sidebar/sidebar.component';
import {InputComponent} from './components/resources/input/input.component';
import {OAuthCallbackComponent} from './components/o-auth-callback/o-auth-callback.component';
import {VisualizadorConfigMaqComponent} from './components/visualizador-config-maq/visualizador-config-maq.component';
import {WorkerRegComponent} from './pages/worker-reg/worker-reg.component';
import {TendenciasPageComponent} from './components/products/tendencias-page.component';
import {BrowserModule} from '@angular/platform-browser';
import {BusquedaComponent} from './pages/general/busqueda/busqueda.component';
import {AngularFirestore} from '@angular/fire/firestore';
import {PortadaPageComponent} from './pages/general/portada-page/portada-page.component';
import {ConfigMaderaComponent} from './components/config-madera/config-madera.component';
import {AngularFireModule} from '@angular/fire';
import {TrendCntComponent} from './components/resources/trend-cnt/trend-cnt.component';
import {FormButtonComponent} from './components/resources/form-button/form-button.component';
import {NoticiasPageComponent} from './pages/noticias-page/noticias-page.component';
import {OpCntComponent} from './components/op-cnt/op-cnt.component';
import {TemporadasRelojComponent} from './pages/por_def/tipos-tendencias-page/temporadas-reloj.component';
import {VisualizadorConfigCoronaComponent} from './components/visualizador-config-corona/visualizador-config-corona.component';
import {AdderComponent} from './components/resources/adder/adder.component';
import {HttpClientModule} from '@angular/common/http';
import {environment} from './environment/dbs';
import {AngularFireDatabaseModule} from '@angular/fire/database-deprecated';
import {AngularFireDatabase} from '@angular/fire/database';
import {UsuariosPageComponent} from './usuarios-page/usuarios-page.component';
import {VerticalBarComponent} from './vertical-bar/vertical-bar.component';
import {ConfigCajaComponent} from './config-caja/config-caja.component';
import {ConfigCristalComponent} from './config-cristal/config-cristal.component';
import {AjustesWebComponent} from './idiomas-page/ajustes-web.component';
import {PedidosPageComponent} from './pedidos-page/pedidos-page.component';
// ng build --prod --base-href https://moena1989.github.io/moenaDbApp/
// npx ngh --dir=dist/moenaDbApp
const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

export function currentServiceFactory(provider: CurrentStorageService) {
  return () => provider.iniciar();
}

@NgModule({
  declarations: [
    AppComponent, NuevoRelojComponent, SidebarComponent,
    BusquedaComponent, LoginComponent, MainComponent,
    WorkerRegComponent, SnackbarComponent, RegistroComponent,
    RelojBuscadoComponent, PortadaPageComponent, MSelectComponent, VisualizerComponent,
    HomeComponent, RegistroPageComponent, ExperimentosPageComponent, InventarioPageComponent,
    PublicacionesPageComponent, VentasPageComponent, NuevaCajaComponent, InputComponent, FormButtonComponent,
    VerLoteComponent, TittlebarComponent, TopBarComponent, LoadbarComponent,
    OAuthCallbackComponent, TendenciasPageComponent, TrendCntComponent, NoticiasPageComponent,
    TemporadasRelojComponent, VerTendenciasPageComponent, VerTendenciaPageComponent,
    VerTiposProductosComponent, OpCntComponent, CaracteristicasPageComponent, TabsComponent,
    VisualizadorConfigCajaComponent,
    VisualizadorConfigPulsoComponent, VisualizadorConfigMaqComponent,
    ConfigMaderaComponent, VisualizadorConfigModeloCajaComponent,
    VisualizadorConfigTapaComponent, VisualizadorConfigHebillaComponent,
    VisualizadorConfigCoronaComponent, AdderComponent, UsuariosPageComponent, VerticalBarComponent,
    ConfigCajaComponent, ConfigCristalComponent, AjustesWebComponent, PedidosPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {enableTracing: false}),
    AngularFireModule.initializeApp(environment.public, 'public'),
    AngularFireModule.initializeApp(environment.main, 'main'),
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
  }, {
    provide: APP_INITIALIZER,
    useFactory: currentServiceFactory,
    deps: [CurrentStorageService],
    multi: true
  }, NgxSmartModalService, {provide: StorageBucket, useValue: 'testing-this-shit'},
    SettingsService, ModelsSevice, AuthService, AngularFireDatabase, DbMainService, AngularFirestore, HasherService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
    // TODO simplificaar y utilizar iconos base
    library.add(fas, far);
  }
}
