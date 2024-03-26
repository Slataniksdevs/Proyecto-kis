import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  formData: any = {}; 
  emailValido: boolean = false;
  constructor(private http: HttpClient) {}


  enviarDatos(): void {
    // Realiza una solicitud POST a la API con los datos del formulario
    this.http.post<any>('http://localhost:3000/api/persona', this.formData).subscribe(
      (response) => {
        console.log('Datos enviados correctamente:', response);
        // Limpia el formulario después de enviar los datos
        this.formData = {};
      },
      (error) => {
        console.error('Error al enviar los datos:', error);
      
      }
    );
  }
  // Función para verificar si el campo de correo electrónico contiene al menos un "@"
  verificarEmail(): void {
    this.emailValido = this.formData.correoElectronico.includes('@');
  }
}
