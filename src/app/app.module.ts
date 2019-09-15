import {routes} from './environment/routing';
import {APP_INITIALIZER, InjectionToken, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ActivatedRouteSnapshot, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/general/home/home.component';
import {ExperimentosPageComponent} from './pages/dev/experimentos-page/experimentos-page.component';
import {TittlebarComponent} from './components/windowsbar/tittlebar.component';
import {VisualizerComponent} from './tools/visualizer/visualizer.component';
import {FormsModule} from '@angular/forms';
import {VerTendenciasPageComponent} from './pages/por_def/ver-tendencias-page/ver-tendencias-page.component';
import {StructuresPageComponent} from './pages/caracteristicas-page/structures-page.component';
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
import {AngularFirestore} from '@angular/fire/firestore';
import {PortadaPageComponent} from './pages/general/portada-page/portada-page.component';
import {ConfigMaderaComponent} from './components/config-madera/config-madera.component';
import {AngularFireModule} from '@angular/fire';
import {TrendCntComponent} from './components/resources/trend-cnt/trend-cnt.component';
import {FormButtonComponent} from './components/resources/form-button/form-button.component';
import {NoticiasPageComponent} from './pages/noticias-page/noticias-page.component';
import {OpCntComponent} from './components/op-cnt/op-cnt.component';
import {PublicSeasonsComponent} from './pages/por_def/tipos-tendencias-page/seasons.component';
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
import {WatchSettingCardComponent} from './watch-setting-card/watch-setting-card.component';
import {ItemConfigComponent} from './item-config/item-config.component';
import {SelectFormComponent} from './select-form/select-form.component';
import {ConfigCollectionsComponent} from './config-collections/config-collections.component';
import {PushInputComponent} from './push-input/push-input.component';
import {ConfigWatchConfigComponent} from './config-watch-config/config-watch-config.component';
import {WatchStructurePageComponent} from './watch-structure-page/watch-structure-page.component';
import {InventoryWatchConfigPageComponent} from './inventory-model-page/inventory-watch-config-page.component';
import {InventoryCasePageComponent} from './inventory-watch-config/inventory-case-page.component';
import {LotsPageComponent} from './lots-page/lots-page.component';
import {UnitsPageComponent} from './units-page/units-page.component';
import {ProvidersPageComponent} from './providers-page/providers-page.component';
import {LotsCasesComponent} from './lots-cases/lots-cases.component';
import {ObservableSelectComponent} from './observable-select/observable-select.component';
import {NgContentDirective} from './ng-content.directive';
import {UnitsLeatherComponent} from './units-leather/units-leather.component';
import {LotsBuncklesComponent} from './lots-bunckles/lots-bunckles.component';
import {LotsCasebacksComponent} from './lots-casebacks/lots-casebacks.component';
import {LotsCrystalsComponent} from './lots-crystals/lots-crystals.component';
import {AngularFireFunctionsModule, FunctionsRegionToken} from '@angular/fire/functions';
import {WatchersPageComponent} from './watchers-page/watchers-page.component';
import {ElectronService} from './electron.service';
import {DaterPipe} from './dater.pipe';
import {WatchStrategiesComponent} from './watch-strategies/watch-strategies.component';
import {WatchFinancialStateComponent} from './watch-financial-state/watch-financial-state.component';
import {WatchReportsComponent} from './watch-reports/watch-reports.component';
import {PageComponent} from './page/page.component';
import {AssignableOdersPageComponent} from './active-orders-page/assignable-oders-page.component';
import {AssignableProductCntComponent} from './assignable-product-cnt/assignable-product-cnt.component';
import {PackableOrdersPageComponent} from './packable-orders-page/packable-orders-page.component';
import {DistpachableOrdersPageComponent} from './distpachable-orders-page/distpachable-orders-page.component';
import {FinishedOrdersPageComponent} from './finished-orders-page/finished-orders-page.component';
import {ClockWebCollectionsPageComponent} from './clock-web-collections-page/clock-web-collections-page.component';
import {RawMaterialPageComponent} from './raw-material-page/raw-material-page.component';
import {SuppliesPageComponent} from './suplies-page/supplies-page.component';
import {FurnishingsPageComponent} from './furnishings-page/furnishings-page.component';
import {AppliancesPageComponent} from './appliances-page/appliances-page.component';
import {EndowmentsPageComponent} from './endowments-page/endowments-page.component';
import {RoundsLocalInventoryPageComponent} from './rounds-local-inventory-page/rounds-local-inventory-page.component';
import {CasesLocalInventoryPageComponent} from './cases-local-inventory-page/cases-local-inventory-page.component';
import {FullWatchlocalInventoryPageComponent} from './full-watchlocal-inventory-page/full-watchlocal-inventory-page.component';
import {ArmedLocalInventoryPageComponent} from './armed-local-inventory-page/armed-local-inventory-page.component';
import {CustomSelectComponent} from './custom-select/custom-select.component';
import {ProductWatchCatalogPageComponent} from './product-watch-catalog-page/product-watch-catalog-page.component';
import {MarketingWatchCollectionsPageComponent} from './marketing-watch-collections-page/marketing-watch-collections-page.component';
import {CardCollectionConfigComponent} from './card-collection-config/card-collection-config.component';
import {InventoryConfigItemComponent} from './inventory-config-item/inventory-config-item.component';
import {SettingsModalPageComponent} from './settings-modal-page/settings-modal-page.component';
import {AccountModalPageComponent} from './account-modal-page/account-modal-page.component';
import {PaymentsPageComponent} from './payments-page/payments-page.component';
import {NaturalPersonPageComponent} from './natural-person-page/natural-person-page.component';
import {JuridicPersonPageComponent} from './juridic-person-page/juridic-person-page.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
// ng build --prod --base-href https://moena1989.github.io/moenaDbApp/
// npx ngh --dir=dist/moenaDbApp
const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

export function currentServiceFactory(provider: CurrentStorageService): () => Promise<any> {
  return (): Promise<any> => provider.beforeInit();
}

@NgModule({
  declarations: [
    AppComponent, SidebarComponent, LoginComponent, MainComponent,
    WorkerRegComponent, SnackbarComponent, RegistroComponent,
    RelojBuscadoComponent, PortadaPageComponent, MSelectComponent, VisualizerComponent,
    HomeComponent, RegistroPageComponent, ExperimentosPageComponent, InventarioPageComponent,
    PublicacionesPageComponent, VentasPageComponent, InputComponent, FormButtonComponent,
    VerLoteComponent, TittlebarComponent, TopBarComponent, LoadbarComponent,
    OAuthCallbackComponent, TendenciasPageComponent, TrendCntComponent, NoticiasPageComponent,
    PublicSeasonsComponent, VerTendenciasPageComponent, VerTendenciaPageComponent,
    VerTiposProductosComponent, OpCntComponent, StructuresPageComponent, TabsComponent,
    ConfigStrapPageComponent, ConfigMovementPageComponent,
    ConfigMaderaComponent, ConfigModelPageComponent,
    ConfigCasebackPageComponent, ConfigBuncklePageComponent,
    ConfigCrownPageComponent, AdderComponent, UsuariosPageComponent, VerticalBarComponent,
    ConfigCasePageComponent, ConfigCrystalPageComponent,
    AjustesWebComponent, PedidosPageComponent, WatchSettingCardComponent,
    ItemConfigComponent, SelectFormComponent,
    ConfigCollectionsComponent, PushInputComponent,
    ConfigWatchConfigComponent, WatchStructurePageComponent,
    InventoryWatchConfigPageComponent, InventoryCasePageComponent,
    LotsPageComponent, UnitsPageComponent, ProvidersPageComponent,
    LotsCasesComponent, ObservableSelectComponent, NgContentDirective,
    UnitsLeatherComponent, LotsBuncklesComponent, LotsCasebacksComponent,
    LotsCrystalsComponent, WatchersPageComponent, DaterPipe,
    WatchStrategiesComponent, WatchFinancialStateComponent,
    WatchReportsComponent, PageComponent, AssignableOdersPageComponent, AssignableProductCntComponent,
    PackableOrdersPageComponent, DistpachableOrdersPageComponent, FinishedOrdersPageComponent,
    ClockWebCollectionsPageComponent, RawMaterialPageComponent, SuppliesPageComponent, FurnishingsPageComponent,
    AppliancesPageComponent, EndowmentsPageComponent, RoundsLocalInventoryPageComponent,
    CasesLocalInventoryPageComponent, FullWatchlocalInventoryPageComponent, ArmedLocalInventoryPageComponent,
    CustomSelectComponent, ProductWatchCatalogPageComponent, MarketingWatchCollectionsPageComponent, CardCollectionConfigComponent, InventoryConfigItemComponent, SettingsModalPageComponent, AccountModalPageComponent, PaymentsPageComponent, NaturalPersonPageComponent, JuridicPersonPageComponent
  ],
  imports: [
    AngularFireFunctionsModule, PdfViewerModule,
    RouterModule.forRoot(routes, {enableTracing: false}),
    AngularFireModule.initializeApp(DBS.public, 'public'),
    AngularFireModule.initializeApp(DBS.main, 'main'),
    AngularFireDatabaseModule, BrowserAnimationsModule,
    AngularFireAuthModule, AngularFireStorageModule, HttpClientModule, AngularFireModule,
    BrowserModule, FormsModule, NgxSmartModalModule.forRoot(), Ng2ImgMaxModule, FontAwesomeModule
  ],
  providers: [
    {provide: FunctionsRegionToken, useValue: 'us-central1'},
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
    ModelsSevice, AngularFireDatabase,
    ElectronService, DbMainService, DBPublicService,
    AuthService, ToolsServices, AngularFirestore, HasherService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
  }
}
