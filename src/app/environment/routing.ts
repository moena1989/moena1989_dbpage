import {Routes} from '@angular/router';
import {VentasPageComponent} from '../pages/por_def/ventas-page/ventas-page.component';
import {HomeComponent} from '../pages/general/home/home.component';
import {VerTiposProductosComponent} from '../components/ver-tipos-productos/ver-tipos-productos.component';
import {ExperimentosPageComponent} from '../pages/dev/experimentos-page/experimentos-page.component';
import {WorkerRegComponent} from '../pages/worker-reg/worker-reg.component';
import {LoginComponent} from '../pages/general/login/login.component';
import {RegistroComponent} from '../pages/por_def/registro/registro.component';
import {TendenciasPageComponent} from '../components/products/tendencias-page.component';
import {AuthGuardService} from '../services/auth-guard.service';
import {VerTendenciasPageComponent} from '../pages/por_def/ver-tendencias-page/ver-tendencias-page.component';
import {BusquedaComponent} from '../pages/general/busqueda/busqueda.component';
import {NewCaseComponent} from '../components/nueva-caja/new-case.component';
import {StructuresPageComponent} from '../pages/caracteristicas-page/structures-page.component';
import {MainComponent} from '../components/main/main.component';
import {PublicacionesPageComponent} from '../pages/marketing/publicaciones-page/publicaciones-page.component';
import {PortadaPageComponent} from '../pages/general/portada-page/portada-page.component';
import {NoticiasPageComponent} from '../pages/noticias-page/noticias-page.component';
import {NuevoRelojComponent} from '../tools/nuevo-reloj/nuevo-reloj.component';
import {SeasonsComponent} from '../pages/por_def/tipos-tendencias-page/seasons.component';
import {InventarioPageComponent} from '../pages/accounting/inventario-page/inventario-page.component';
import {UsuariosPageComponent} from '../usuarios-page/usuarios-page.component';
import {AjustesWebComponent} from '../idiomas-page/ajustes-web.component';
import {PedidosPageComponent} from '../pedidos-page/pedidos-page.component';
import {ConfigMovementPageComponent} from '../components/visualizador-config-maq/config-movement-page.component';
import {ConfigCasePageComponent} from '../components/visualizador-config-caja/config-case-page.component';
import {ConfigCasebackPageComponent} from '../components/visualizador-config-tapa/config-caseback-page.component';
import {ConfigCrownPageComponent} from '../components/visualizador-config-corona/config-crown-page.component';
import {ConfigBuncklePageComponent} from '../components/visualizador-config-hebilla/config-bunckle-page.component';
import {ConfigStrapPageComponent} from '../components/visualizador-config-pulso/config-strap-page.component';
import {ConfigCrystalPageComponent} from '../config-cristal/config-crystal-page.component';
import {LotsPageComponent} from '../lots-page/lots-page.component';
import {UnitsPageComponent} from '../units-page/units-page.component';
import {ProvidersPageComponent} from '../providers-page/providers-page.component';
import {ConfigCollectionsComponent} from '../config-collections/config-collections.component';
import {ConfigModelPageComponent} from '../components/visualizador-config-modelo-caja/config-model-page.component';
import {LotsCasesComponent} from '../lots-cases/lots-cases.component';
import {UnitsLeatherComponent} from '../units-leather/units-leather.component';
import {LotsCrystalsComponent} from '../lots-crystals/lots-crystals.component';
import {LotsCasebacksComponent} from '../lots-casebacks/lots-casebacks.component';
import {InventoryWatchConfigPageComponent} from '../inventory-model-page/inventory-watch-config-page.component';
import {LotsBuncklesComponent} from '../lots-bunckles/lots-bunckles.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'sign_up', component: WorkerRegComponent},
  {
    path: 'watch', children: [{
      path: '', component: MainComponent, canActivate: [AuthGuardService], children: [
        {path: 'home', component: HomeComponent},
        {path: 'busqueda', component: BusquedaComponent},
        {
          path: 'lots', component: LotsPageComponent, children: [
            {path: 'cases', component: LotsCasesComponent},
            {path: 'leathers', component: UnitsLeatherComponent},
            {path: 'bunckles', component: LotsBuncklesComponent},
            {path: 'casebacks', component: LotsCasebacksComponent},
            {path: 'crystals', component: LotsCrystalsComponent}
          ]
        }, {
          path: 'providers',
          component: ProvidersPageComponent,
          children: []
        }, {
          path: 'units',
          component: UnitsPageComponent,
          children: [
            {path: 'leather', component: UnitsLeatherComponent},
            {path: 'watchConfig', component: InventoryWatchConfigPageComponent}]
        }, {
          path: 'registro', component: RegistroComponent, children:
            [
              {path: 'nuevo_reloj', component: NuevoRelojComponent},
              {path: 'nueva_caja', component: NewCaseComponent}
            ]
        }, {
          path: 'web', component: RegistroComponent, children: [
            {path: 'inicio', component: PortadaPageComponent},
            {
              path: 'temporadas', component: TendenciasPageComponent,
              children: [
                {path: '', component: VerTiposProductosComponent},
                {
                  path: ':tipoProductoSeleccionado',
                  component: SeasonsComponent,
                },
                {
                  path: ':tipoProductoSeleccionado/:selectedSeason',
                  component: VerTendenciasPageComponent,
                }
              ]
            },
            {path: 'noticias', component: NoticiasPageComponent}]
        }, {path: 'ajustes-web', component: AjustesWebComponent},
        {path: 'pedidos', component: PedidosPageComponent},
        {path: 'experimentos', component: ExperimentosPageComponent},
        {path: 'ventas', component: VentasPageComponent},
        {
          path: 'inventory/watch', component: InventarioPageComponent
        },
        {path: 'equipo', component: UsuariosPageComponent},
        {path: 'publicaciones', component: PublicacionesPageComponent}, {
          path: 'structures', component: StructuresPageComponent,
          children: [
            {path: 'movements', component: ConfigMovementPageComponent},
            {path: 'cases', component: ConfigCasePageComponent},
            {path: 'straps', component: ConfigStrapPageComponent},
            {path: 'crowns', component: ConfigCrownPageComponent},
            {path: 'crystals', component: ConfigCrystalPageComponent},
            {path: 'bunckles', component: ConfigBuncklePageComponent},
            {path: 'casebacks', component: ConfigCasebackPageComponent},
            {path: 'bunckles', component: ConfigCollectionsComponent},
            {path: 'models', component: ConfigModelPageComponent}
          ]
        }
      ]
    }]
  }];

