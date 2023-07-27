import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeguimientoComponent } from './entidades/seguimiento/seguimiento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CarreraComponent } from './entidades/carrera/carrera.component';
import { CorredorComponent } from './entidades/corredor/corredor.component';

@NgModule({
  declarations: [
    AppComponent,
    SeguimientoComponent,
    CarreraComponent,
    CorredorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
