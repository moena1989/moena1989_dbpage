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
import {PartesPageComponent} from './pages/caracteristicas-page/partes-page.component';
import {SnackbarComponent} from './tools/snackbar/snackbar.component';
import {PublicacionesPageComponent} from './pages/marketing/publicaciones-page/publicaciones-page.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {ConfigModeloComponent} from './components/visualizador-config-modelo-caja/config-modelo.component';
import {VerTendenciaPageComponent} from './pages/por_def/ver-tendencia-page/ver-tendencia-page.component';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {InventarioPageComponent} from './pages/accounting/inventario-page/inventario-page.component';
import {DbMainService} from './services/routes/db-main.service';
import {ConfigPulsoComponent} from './components/visualizador-config-pulso/config-pulso.component';
import {ConfigHebillaComponent} from './components/visualizador-config-hebilla/config-hebilla.component';
import {VerTiposProductosComponent} from './components/ver-tipos-productos/ver-tipos-productos.component';
import {TabsComponent} from './components/resources/tabs/tabs.component';
import {HasherService} from './services/hasher.service';
import {RegistroComponent} from './pages/por_def/registro/registro.component';
import {ModelsSevice} from './services/models/model-cajas.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NuevaCajaComponent} from './components/nueva-caja/nueva-caja.component';
import {MainComponent} from './components/main/main.component';
import {RelojBuscadoComponent} from './tools/reloj-buscado/reloj-buscado.component';
import {LoadbarComponent} from './components/resources/loadbar/loadbar.component';
import {ConfigTapaComponent} from './components/visualizador-config-tapa/config-tapa.component';
import {VerLoteComponent} from './components/resources/ver-lote/ver-lote.component';
import {CurrentStorageService} from './services/current-storage.service';
import {Ng2ImgMaxModule} from 'ng2-img-max';
import {VentasPageComponent} from './pages/por_def/ventas-page/ventas-page.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {LoginComponent} from './pages/general/login/login.component';
import {MSelectComponent} from './tools/m-select/m-select.component';
import {AuthService} from './services/routes/auth.service';
import {RegistroPageComponent} from './pages/por_def/registro-page/registro-page.component';
import {TopBarComponent} from './components/environment/top-bar/top-bar.component';
import {SidebarComponent} from './components/environment/sidebar/sidebar.component';
import {InputComponent} from './components/resources/input/input.component';
import {OAuthCallbackComponent} from './components/o-auth-callback/o-auth-callback.component';
import {ConfigMaqComponent} from './components/visualizador-config-maq/config-maq.component';
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
import {ConfigCoronaComponent} from './components/visualizador-config-corona/config-corona.component';
import {AdderComponent} from './components/resources/adder/adder.component';
import {HttpClientModule} from '@angular/common/http';
import {DBS} from './environment/enviroment';
import {AngularFireDatabaseModule} from '@angular/fire/database-deprecated';
import {AngularFireDatabase} from '@angular/fire/database';
import {UsuariosPageComponent} from './usuarios-page/usuarios-page.component';
import {VerticalBarComponent} from './vertical-bar/vertical-bar.component';
import {ConfigCristalComponent} from './config-cristal/config-cristal.component';
import {AjustesWebComponent} from './idiomas-page/ajustes-web.component';
import {PedidosPageComponent} from './pedidos-page/pedidos-page.component';
import {ConfigCajaComponent} from './components/visualizador-config-caja/config-caja.component';
import {DBPublicService} from './services/routes/d-b-public.service';
import {ToolsServices} from './services/tools-services.service';
// ng build --prod --base-href https://moena1989.github.io/moenaDbApp/
// npx ngh --dir=dist/moenaDbApp
const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

export function currentServiceFactory(provider: CurrentStorageService): () => Promise<any> {
  return (): Promise<any> => provider.init();
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
    VerTiposProductosComponent, OpCntComponent, PartesPageComponent, TabsComponent,
    ConfigPulsoComponent, ConfigMaqComponent,
    ConfigMaderaComponent, ConfigModeloComponent,
    ConfigTapaComponent, ConfigHebillaComponent,
    ConfigCoronaComponent, AdderComponent, UsuariosPageComponent, VerticalBarComponent,
    ConfigCajaComponent, ConfigCristalComponent, AjustesWebComponent, PedidosPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {enableTracing: false}),
    AngularFireModule.initializeApp(DBS.public, 'public'),
    AngularFireModule.initializeApp(DBS.main, 'main'),
    AngularFireDatabaseModule, BrowserAnimationsModule,
    AngularFireAuthModule, AngularFireStorageModule, HttpClientModule, AngularFireModule,
    BrowserModule, FormsModule, NgxSmartModalModule.forRoot(), Ng2ImgMaxModule, FontAwesomeModule
  ],
  providers: [
    {
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
    }, NgxSmartModalService,
    ModelsSevice, AuthService, AngularFireDatabase, DbMainService, DBPublicService, ToolsServices, AngularFirestore, HasherService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
  }
}
