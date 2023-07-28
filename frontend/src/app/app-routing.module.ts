import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguimientoComponent } from './entidades/seguimiento/seguimiento.component';
import { CarreraComponent } from './entidades/carrera/carrera.component';
import { CorredorComponent } from './entidades/corredor/corredor.component';

const routes: Routes = [
  { path: '', redirectTo: '/seguimiento', pathMatch: 'full' },
  { path: 'seguimiento', component: SeguimientoComponent },
  { path: 'carrera', component: CarreraComponent },
  { path: 'corredor', component: CorredorComponent },
  // Otras rutas de tu aplicación, si las tienes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
