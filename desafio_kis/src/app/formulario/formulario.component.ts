import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  formData: any = {}; // Objeto para almacenar los datos del formulario

  constructor(private http: HttpClient) {}

  // Método para enviar los datos del formulario a la API
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
        // Maneja el error de acuerdo a tus necesidades
      }
    );
  }
}
