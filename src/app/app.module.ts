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
import {ConfigModelPageComponent} from './components/visualizador-config-modelo-caja/config-model-page.component';
import {VerTendenciaPageComponent} from './pages/por_def/ver-tendencia-page/ver-tendencia-page.component';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {InventarioPageComponent} from './pages/accounting/inventario-page/inventario-page.component';
import {DbMainService} from './services/routes/db-main.service';
import {ConfigStrapPageComponent} from './components/visualizador-config-pulso/config-strap-page.component';
import {ConfigBuncklePageComponent} from './components/visualizador-config-hebilla/config-bunckle-page.component';
import {VerTiposProductosComponent} from './components/ver-tipos-productos/ver-tipos-productos.component';
import {TabsComponent} from './components/resources/tabs/tabs.component';
import {HasherService} from './services/hasher.service';
import {RegistroComponent} from './pages/por_def/registro/registro.component';
import {ModelsSevice} from './services/models/model-cajas.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NewCaseComponent} from './components/nueva-caja/new-case.component';
import {MainComponent} from './components/main/main.component';
import {RelojBuscadoComponent} from './tools/reloj-buscado/reloj-buscado.component';
import {LoadbarComponent} from './components/resources/loadbar/loadbar.component';
import {ConfigCasebackPageComponent} from './components/visualizador-config-tapa/config-caseback-page.component';
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
import {ConfigMovementPageComponent} from './components/visualizador-config-maq/config-movement-page.component';
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
import {SeasonsComponent} from './pages/por_def/tipos-tendencias-page/seasons.component';
import {ConfigCrownPageComponent} from './components/visualizador-config-corona/config-crown-page.component';
import {AdderComponent} from './components/resources/adder/adder.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireDatabaseModule} from '@angular/fire/database-deprecated';
import {AngularFireDatabase} from '@angular/fire/database';
import {UsuariosPageComponent} from './usuarios-page/usuarios-page.component';
import {VerticalBarComponent} from './vertical-bar/vertical-bar.component';
import {ConfigCrystalPageComponent} from './config-cristal/config-crystal-page.component';
import {AjustesWebComponent} from './idiomas-page/ajustes-web.component';
import {PedidosPageComponent} from './pedidos-page/pedidos-page.component';
import {ConfigCasePageComponent} from './components/visualizador-config-caja/config-case-page.component';
import {DBPublicService} from './services/routes/d-b-public.service';
import {ToolsServices} from './services/tools-services.service';
import {DBS} from '../environments/environment';
import { WatchSettingCardComponent } from './watch-setting-card/watch-setting-card.component';
import { ItemConfigComponent } from './item-config/item-config.component';
import { SelectFormComponent } from './select-form/select-form.component';
import { ConfigCollectionsComponent } from './config-collections/config-collections.component';
import { PushInputComponent } from './push-input/push-input.component';
// ng build --prod --base-href https://moena1989.github.io/moenaDbApp/
// npx ngh --dir=dist/moenaDbApp
const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

export function currentServiceFactory(provider: CurrentStorageService): () => Promise<any> {
  return (): Promise<any> => provider.beforeInit();
}

@NgModule({
  declarations: [
    AppComponent, NuevoRelojComponent, SidebarComponent,
    BusquedaComponent, LoginComponent, MainComponent,
    WorkerRegComponent, SnackbarComponent, RegistroComponent,
    RelojBuscadoComponent, PortadaPageComponent, MSelectComponent, VisualizerComponent,
    HomeComponent, RegistroPageComponent, ExperimentosPageComponent, InventarioPageComponent,
    PublicacionesPageComponent, VentasPageComponent, NewCaseComponent, InputComponent, FormButtonComponent,
    VerLoteComponent, TittlebarComponent, TopBarComponent, LoadbarComponent,
    OAuthCallbackComponent, TendenciasPageComponent, TrendCntComponent, NoticiasPageComponent,
    SeasonsComponent, VerTendenciasPageComponent, VerTendenciaPageComponent,
    VerTiposProductosComponent, OpCntComponent, PartesPageComponent, TabsComponent,
    ConfigStrapPageComponent, ConfigMovementPageComponent,
    ConfigMaderaComponent, ConfigModelPageComponent,
    ConfigCasebackPageComponent, ConfigBuncklePageComponent,
    ConfigCrownPageComponent, AdderComponent, UsuariosPageComponent, VerticalBarComponent,
    ConfigCasePageComponent, ConfigCrystalPageComponent, AjustesWebComponent, PedidosPageComponent, WatchSettingCardComponent, ItemConfigComponent, SelectFormComponent, ConfigCollectionsComponent, PushInputComponent
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
    ModelsSevice, AngularFireDatabase, DbMainService, DBPublicService, AuthService, ToolsServices, AngularFirestore, HasherService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
  }
}
