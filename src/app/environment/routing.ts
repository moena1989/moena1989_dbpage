import {Routes} from '@angular/router';
import {WorkerRegComponent} from '../pages/worker-reg/worker-reg.component';
import {LoginComponent} from '../pages/general/login/login.component';
import {MainComponent} from '../components/main/main.component';
import {HomeComponent} from '../pages/general/home/home.component';
import {InvoicePageComponent} from '../natural-person-page/invoice-page.component';
import {UsersPageComponent} from '../usuarios-page/users-page.component';
import {AjustesWebComponent} from '../idiomas-page/ajustes-web.component';
import {ConfigMovementPageComponent} from '../components/visualizador-config-maq/config-movement-page.component';
import {ConfigStrapPageComponent} from '../components/visualizador-config-pulso/config-strap-page.component';
import {ConfigCrystalPageComponent} from '../config-cristal/config-crystal-page.component';
import {ConfigCrownPageComponent} from '../components/visualizador-config-corona/config-crown-page.component';
import {ConfigCasePageComponent} from '../components/visualizador-config-caja/config-case-page.component';
import {ConfigBuncklePageComponent} from '../components/visualizador-config-hebilla/config-bunckle-page.component';
import {RoundsLocalInventoryPageComponent} from '../rounds-local-inventory-page/rounds-local-inventory-page.component';
import {ConfigPackagePageComponent} from '../config-package-page/config-package-page.component';
import {AuthGuardService} from '../services/auth-guard.service';
// la estructura es buena, pero pierdo modularización.
// canActivate: [AuthGuardService],
export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign_up', component: WorkerRegComponent},
  {
    path: '', component: MainComponent, canActivate: [AuthGuardService],
    children: [
      ///////////////////////////////  MANUFACTURE //////////////////////////////////////////////
      // WAREHOUSE
      {path: '', component: HomeComponent},
      {path: 'dashboard/accounts/user/home', component: HomeComponent},
      // {path: 'manufacture/localWarehouse/rounds', component: RoundsLocalInventoryPageComponent},
      // {path: 'manufacture/localWarehouse/cases', component: CasesLocalInventoryPageComponent},
      // {path: 'manufacture/localWarehouse/armed', component: ArmedLocalInventoryPageComponent},
      // {path: 'manufacture/localWarehouse/serialized', component: LotsCasesComponent},
      // {path: 'manufacture/localWarehouse/fullProducts', component: FullWatchlocalInventoryPageComponent},
      // //
      // {path: 'watch/lots/bunckles', component: ConfigBuncklePageComponent},
      // {path: 'watch/lots/casebacks', component: ConfigCasebackPageComponent},
      // {path: 'watch/lots/crystals', component: ConfigCrystalPageComponent},
      // {path: 'watch/units/leather', component: UnitsLeatherComponent},
      // {path: 'watch/units/watchConfig', component: InventoryWatchConfigPageComponent},
      // //
      // {path: 'watch/marketing/strategies', component: WatchStrategiesComponent},
      //
      // {path: 'watch/structures/models', component: ConfigModelPageComponent},
      ////////////////////////////           GLOBAL          ///////////////////
      // {path: 'global/orders/actives', component: AssignableOdersPageComponent},
      // {path: 'global/orders/distpachables', component: DistpachableOrdersPageComponent},
      // {path: 'global/orders/packables', component: PackableOrdersPageComponent},
      // {path: 'global/orders/finished', component: FinishedOrdersPageComponent},
      {
        path: 'departments', children: [

          {path: 'humanResources/employeesAdmin/internalUsers/employees', component: UsersPageComponent},
          ////////////////////////////           AJUSTES GENERAL  AJUSSTES DE AMBIENTE          ///////////////////

          {path: 'generalData/public/settings/web', component: AjustesWebComponent},
          ////////////////////////////           WEB          ///////////////////
          // {path: 'public/products/watches/model', component: ClockWebCollectionsPageComponent},
          ////////////////////////////           WAREHOUSE         ///////////////////
          // Inventario de producción
          {path: 'warehouse/watchmakingInventory/rawMaterial/movements', component: ConfigMovementPageComponent},
          {path: 'warehouse/watchmakingInventory/rawMaterial/straps', component: ConfigStrapPageComponent},
          {path: 'warehouse/watchmakingInventory/rawMaterial/crystals', component: ConfigCrystalPageComponent},
          {path: 'warehouse/watchmakingInventory/rawMaterial/crowns', component: ConfigCrownPageComponent},
          //////////////////////////////////
          {path: 'warehouse/watchmakingInventory/in-process/cases-a', component: ConfigBuncklePageComponent},
          {path: 'warehouse/watchmakingInventory/in-process/cases-b', component: ConfigBuncklePageComponent},
          {path: 'warehouse/watchmakingInventory/in-process/cases-c', component: ConfigBuncklePageComponent},
          {path: 'warehouse/watchmakingInventory/in-process/cases-d', component: ConfigBuncklePageComponent},
          {path: 'warehouse/watchmakingInventory/in-process/cases-e', component: ConfigBuncklePageComponent},
          //
          {path: 'warehouse/watchmakingInventory/in-process/straps-a', component: ConfigPackagePageComponent},
          {path: 'warehouse/watchmakingInventory/in-process/straps-b', component: ConfigPackagePageComponent},
          {path: 'warehouse/watchmakingInventory/in-process/straps-c', component: RoundsLocalInventoryPageComponent},
          //
          {path: 'warehouse/watchmakingInventory/in-process/package-a', component: ConfigCasePageComponent},
          {path: 'warehouse/watchmakingInventory/in-process/package-b', component: ConfigStrapPageComponent},
          {path: 'warehouse/watchmakingInventory/in-process/package-c', component: ConfigStrapPageComponent},
          {path: 'warehouse/watchmakingInventory/in-process/package-d', component: ConfigStrapPageComponent},
          //
          {path: 'warehouse/watchmakingInventory/finished-product/casesss', component: ConfigStrapPageComponent},
          // {path: 'watch/structures/collections', component: ConfigCollectionsComponent},

          // {path: 'warehouse/inventory/rawMaterial', component: RawMaterialPageComponent},
          // {path: 'warehouse/inventory/supplies', component: SuppliesPageComponent},
          // {path: 'warehouse/inventory/furnishings', component: FurnishingsPageComponent},
          // {path: 'warehouse/inventory/appliances', component: AppliancesPageComponent},
          // {path: 'warehouse/inventory/endowments', component: EndowmentsPageComponent},
          ////////////////////////////           MARKETING          ///////////////////
          // {path: 'marketing/catalog/watches', component: MarketingWatchCollectionsPageComponent},
          ////////////////////////////           DESIGN          ///////////////////
          // {path: 'design/watches/models', component: ConfigModelPageComponent},
          // {path: 'design/watches/collections', component: ConfigCollectionsComponent},
          ////////////////////////////           ACCOUTINGG          ///////////////////
          {path: 'accounting/records/payments/invoices', component: InvoicePageComponent}
        ]
      }
    ]
  }];
