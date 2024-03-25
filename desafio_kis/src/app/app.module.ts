import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormularioComponent } from './formulario/formulario.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component'; // Importa FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { RemoveComponent } from './remove/remove.component'; // Importa ReactiveFormsModule

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    EditComponent,
    RemoveComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
