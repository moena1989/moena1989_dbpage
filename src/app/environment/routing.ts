import {Routes} from '@angular/router';
import {WorkerRegComponent} from '../pages/worker-reg/worker-reg.component';
import {LoginComponent} from '../pages/general/login/login.component';
import {MainComponent} from '../components/main/main.component';
import {LotsCasesComponent} from '../lots-cases/lots-cases.component';
import {WatchStrategiesComponent} from '../watch-strategies/watch-strategies.component';
import {ConfigCasebackPageComponent} from '../components/visualizador-config-tapa/config-caseback-page.component';
import {ConfigBuncklePageComponent} from '../components/visualizador-config-hebilla/config-bunckle-page.component';
import {ConfigModelPageComponent} from '../components/visualizador-config-modelo-caja/config-model-page.component';
import {ConfigCrownPageComponent} from '../components/visualizador-config-corona/config-crown-page.component';
import {ConfigStrapPageComponent} from '../components/visualizador-config-pulso/config-strap-page.component';
import {ConfigCrystalPageComponent} from '../config-cristal/config-crystal-page.component';
import {ConfigCasePageComponent} from '../components/visualizador-config-caja/config-case-page.component';
import {ConfigMovementPageComponent} from '../components/visualizador-config-maq/config-movement-page.component';
import {ConfigCollectionsComponent} from '../config-collections/config-collections.component';
import {UnitsLeatherComponent} from '../units-leather/units-leather.component';
import {InventoryWatchConfigPageComponent} from '../inventory-model-page/inventory-watch-config-page.component';
import {AssignableOdersPageComponent} from '../active-orders-page/assignable-oders-page.component';
import {UsuariosPageComponent} from '../usuarios-page/usuarios-page.component';
import {DistpachableOrdersPageComponent} from '../distpachable-orders-page/distpachable-orders-page.component';
import {PackableOrdersPageComponent} from '../packable-orders-page/packable-orders-page.component';
import {FinishedOrdersPageComponent} from '../finished-orders-page/finished-orders-page.component';
import {ClockWebCollectionsPageComponent} from '../clock-web-collections-page/clock-web-collections-page.component';
import {RawMaterialPageComponent} from '../raw-material-page/raw-material-page.component';
import {SuppliesPageComponent} from '../suplies-page/supplies-page.component';
import {FurnishingsPageComponent} from '../furnishings-page/furnishings-page.component';
import {AppliancesPageComponent} from '../appliances-page/appliances-page.component';
import {EndowmentsPageComponent} from '../endowments-page/endowments-page.component';
import {RoundsLocalInventoryPageComponent} from '../rounds-local-inventory-page/rounds-local-inventory-page.component';
import {CasesLocalInventoryPageComponent} from '../cases-local-inventory-page/cases-local-inventory-page.component';
import {FullWatchlocalInventoryPageComponent} from '../full-watchlocal-inventory-page/full-watchlocal-inventory-page.component';
import {ArmedLocalInventoryPageComponent} from '../armed-local-inventory-page/armed-local-inventory-page.component';
import {MarketingWatchCollectionsPageComponent} from '../marketing-watch-collections-page/marketing-watch-collections-page.component';
import {HomeComponent} from '../pages/general/home/home.component';
import {AuthGuardService} from '../services/auth-guard.service';
// la estructura es buena, pero pierdo modularización.
// canActivate: [AuthGuardService],
export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign_up', component: WorkerRegComponent},
  {
    path: '', component: MainComponent,
    children: [
      ///////////////////////////////  MANUFACTURE //////////////////////////////////////////////
      // WAREHOUSE
      {path: '', component: HomeComponent},
      {path: 'manufacture/localWarehouse/rounds', component: RoundsLocalInventoryPageComponent},
      {path: 'manufacture/localWarehouse/cases', component: CasesLocalInventoryPageComponent},
      {path: 'manufacture/localWarehouse/armed', component: ArmedLocalInventoryPageComponent},
      {path: 'manufacture/localWarehouse/serialized', component: LotsCasesComponent},
      {path: 'manufacture/localWarehouse/fullProducts', component: FullWatchlocalInventoryPageComponent},
      //
      {path: 'watch/lots/bunckles', component: ConfigBuncklePageComponent},
      {path: 'watch/lots/casebacks', component: ConfigCasebackPageComponent},
      {path: 'watch/lots/crystals', component: ConfigCrystalPageComponent},
      {path: 'watch/units/leather', component: UnitsLeatherComponent},
      {path: 'watch/units/watchConfig', component: InventoryWatchConfigPageComponent},
      //
      {path: 'watch/marketing/strategies', component: WatchStrategiesComponent},
      //
      {path: 'watch/structures/movements', component: ConfigMovementPageComponent},
      {path: 'watch/structures/cases', component: ConfigCasePageComponent},
      {path: 'watch/structures/straps', component: ConfigStrapPageComponent},
      {path: 'watch/structures/crowns', component: ConfigCrownPageComponent},
      {path: 'watch/structures/crystals', component: ConfigCrystalPageComponent},
      {path: 'watch/structures/bunckles', component: ConfigBuncklePageComponent},
      {path: 'watch/structures/casebacks', component: ConfigCasebackPageComponent},
      {path: 'watch/structures/collections', component: ConfigCollectionsComponent},
      {path: 'watch/structures/models', component: ConfigModelPageComponent},
      ////////////////////////////           GLOBAL          ///////////////////
      {path: 'global/orders/actives', component: AssignableOdersPageComponent},
      {path: 'global/orders/distpachables', component: DistpachableOrdersPageComponent},
      {path: 'global/orders/packables', component: PackableOrdersPageComponent},
      {path: 'global/orders/finished', component: FinishedOrdersPageComponent},
      {path: 'global/humanResoruces/empoyees', component: UsuariosPageComponent},
      ////////////////////////////           WEB          ///////////////////
      {path: 'public/products/watches/model', component: ClockWebCollectionsPageComponent},
      ////////////////////////////           WAREHOUSE         ///////////////////
      {path: 'warehouse/inventory/rawMaterial', component: RawMaterialPageComponent},
      {path: 'warehouse/inventory/supplies', component: SuppliesPageComponent},
      {path: 'warehouse/inventory/furnishings', component: FurnishingsPageComponent},
      {path: 'warehouse/inventory/appliances', component: AppliancesPageComponent},
      {path: 'warehouse/inventory/endowments', component: EndowmentsPageComponent},
      // MARKETING
      {path: 'marketing/catalog/watches', component: MarketingWatchCollectionsPageComponent},
      ////////////////////////////           DESIGN          ///////////////////
      {path: 'design/watches/models', component: ConfigModelPageComponent},
      {path: 'design/watches/collections', component: ConfigCollectionsComponent}
    ]
  }];
