import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NuevoIngresoRelojComponent} from './nuevo-ingreso-reloj/nuevo-ingreso-reloj.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SelecterComponent} from './utils/selecter/selecter.component';

@NgModule({
  declarations: [
    AppComponent,
    NuevoIngresoRelojComponent,
    NavbarComponent,
    SelecterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
