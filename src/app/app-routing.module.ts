// import {VentasPageComponent} from './pages/por_def/ventas-page/ventas-page.component';
// import {RouterModule, Routes} from '@angular/router';
// import {HomeComponent} from './pages/general/home/home.component';
// import {ExperimentosPageComponent} from './pages/dev/experimentos-page/experimentos-page.component';
// import {LoginComponent} from './pages/general/login/login.component';
// import {InjectionToken, NgModule} from '@angular/core';
// import {VerTendenciasPageComponent} from './pages/por_def/ver-tendencias-page/ver-tendencias-page.component';
// import {PartesPageComponent} from './pages/caracteristicas-page/caracteristicas-page.component';
// import {PublicacionesPageComponent} from './pages/marketing/publicaciones-page/publicaciones-page.component';
// import {NuevoRelojComponent} from './tools/nuevo-reloj/nuevo-reloj.component';
// import {InventarioPageComponent} from './pages/accounting/inventario-page/inventario-page.component';
// import {OAuthCallbackComponent} from './components/o-auth-callback/o-auth-callback.component';
// import {VerTiposProductosComponent} from './components/ver-tipos-productos/ver-tipos-productos.component';
// import {WorkerRegComponent} from './pages/worker-reg/worker-reg.component';
// import {RegistroComponent} from './pages/por_def/registro/registro.component';
// import {TendenciasPageComponent} from './components/products/tendencias-page.component';
// import {AuthGuardService} from './services/auth-guard.service';
// import {BusquedaComponent} from './pages/general/busqueda/busqueda.component';
// import {NewCaseComponent} from './components/nueva-caja/nueva-caja.component';
// import {MainComponent} from './components/main/main.component';
// import {PortadaPageComponent} from './pages/general/portada-page/portada-page.component';
// import {NoticiasPageComponent} from './pages/noticias-page/noticias-page.component';
// import {SeasonsComponent} from './pages/por_def/tipos-tendencias-page/tipos-tendencias-page.component';
//
//
// const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
//
// const appRoutes: Routes = [
//   {path: '', redirectTo: 'home', pathMatch: 'full'},
//   {path: 'logIn', component: LoginComponent},
//   {path: 'sign_up', component: WorkerRegComponent},
//   {path: 'OAuthCallback', component: OAuthCallbackComponent},
//   {
//     path: '', component: MainComponent, canActivate: [AuthGuardService], children: [
//       {path: 'home', component: HomeComponent},
//       {path: 'busqueda', component: BusquedaComponent},
//       {
//         path: 'registro', component: RegistroComponent, children:
//           [
//             {path: 'nuevo_reloj', component: NuevoRelojComponent},
//             {path: 'nueva_caja', component: NewCaseComponent}
//           ]
//       }, {
//         path: 'web', component: RegistroComponent, children:
//           [
//             {path: 'inicio', component: PortadaPageComponent},
//             {
//               path: 'tendencias', component: TendenciasPageComponent,
//               children: [
//                 {path: '', component: VerTiposProductosComponent},
//                 {
//                   path: ':tipoProductoSeleccionado',
//                   component: SeasonsComponent,
//                 },
//                 {
//                   path: ':tipoProductoSeleccionado/:selectedSeason',
//                   component: VerTendenciasPageComponent,
//                 }
//               ]
//             }, {path: 'noticias', component: NoticiasPageComponent},
//           ]
//       },
//       {path: 'inventario', component: InventarioPageComponent},
//       {path: 'experimentos', component: ExperimentosPageComponent},
//       {path: 'ventas', component: VentasPageComponent},
//       {path: 'publicaciones', component: PublicacionesPageComponent},
//       {
//         path: 'caracteristicas/:tipoItemSelected', component: PartesPageComponent, children: []
//       }
//     ]
//   }];
// // RouterModule.forRoot(appRoutes, {enableTracing: false}),
//
// @NgModule({
//   imports: [RouterModule.forRoot(appRoutes, {enableTracing: false})],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {
// }
