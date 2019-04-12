import {Routes} from '@angular/router';
import {VentasPageComponent} from '../pages/por_def/ventas-page/ventas-page.component';
import {OAuthCallbackComponent} from '../components/o-auth-callback/o-auth-callback.component';
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
import {NuevaCajaComponent} from '../components/nueva-caja/nueva-caja.component';
import {CaracteristicasPageComponent} from '../pages/caracteristicas-page/caracteristicas-page.component';
import {MainComponent} from '../components/main/main.component';
import {PublicacionesPageComponent} from '../pages/marketing/publicaciones-page/publicaciones-page.component';
import {PortadaPageComponent} from '../pages/general/portada-page/portada-page.component';
import {NoticiasPageComponent} from '../pages/noticias-page/noticias-page.component';
import {NuevoRelojComponent} from '../tools/nuevo-reloj/nuevo-reloj.component';
import {TemporadasRelojComponent} from '../pages/por_def/tipos-tendencias-page/temporadas-reloj.component';
import {InventarioPageComponent} from '../pages/accounting/inventario-page/inventario-page.component';
import {UsuariosPageComponent} from '../usuarios-page/usuarios-page.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'logIn', component: LoginComponent},
  {path: 'sign_up', component: WorkerRegComponent},
  {path: 'OAuthCallback', component: OAuthCallbackComponent},
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
      }, {
        path: 'web', component: RegistroComponent, children:
          [
            {path: 'inicio', component: PortadaPageComponent},
            {
              path: 'temporadas', component: TendenciasPageComponent,
              children: [
                {path: '', component: VerTiposProductosComponent},
                {
                  path: ':tipoProductoSeleccionado',
                  component: TemporadasRelojComponent,
                },
                {
                  path: ':tipoProductoSeleccionado/:tendenciaSeleccionada',
                  component: VerTendenciasPageComponent,
                }
              ]
            },
            {path: 'noticias', component: NoticiasPageComponent},
            {path: 'inventario', component: InventarioPageComponent},
          ]
      },
      {path: 'inventario', component: InventarioPageComponent},
      {path: 'experimentos', component: ExperimentosPageComponent},
      {path: 'ventas', component: VentasPageComponent},
      {path: 'equipo', component: UsuariosPageComponent},
      {path: 'publicaciones', component: PublicacionesPageComponent},
      {path: 'caracteristicas', component: CaracteristicasPageComponent, children: []}
    ]
  }];
// , {
//   path: 'externalRedirect',
//     resolve: {
//     url: externalUrlProvider,
//   },
//   // We need a component here because we cannot define the route otherwise
//   component: LoginComponent,
// }
