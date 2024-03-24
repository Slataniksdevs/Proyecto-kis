import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrillaKisComponent } from './components/grilla-kis/grilla-kis.component'; // Importar el componente GrillaKisComponent

const routes: Routes = [
  { path: 'grilla-kis', component: GrillaKisComponent } // Definir la ruta para GrillaKisComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
