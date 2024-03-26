import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as bootstrap from 'bootstrap'; // Importa Bootstrap

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'desafio_kis';
  data: any[] = []; // Variable para almacenar los datos de la API
  personaIdToDelete: number | null = null; // Propiedad para almacenar el ID de la persona a borrar

  constructor(private http: HttpClient) {} // Inyecta HttpClient

  ngOnInit(): void {
    // Llama al método para obtener los datos de la API al inicializar el componente
    this.getData();
  }

  getData(): void {
    // Realiza la solicitud GET a la API
    this.http.get<any[]>('http://localhost:3000/api/personas').subscribe(
      (response) => {
        // Mapea los datos recibidos para adaptarlos a los atributos esperados
        this.data = response.map((item: any) => ({
          ID: item.ID,
          Nombre: item.Nombre,
          Apellido: item.Apellido,
          Rut: item.Rut,
          Sexo: item.Sexo,
          Telefono: item.Telefono,
          Direccion: item.Direccion,
          FechaNacimiento: item.FechaNacimiento,
          CorreoElectronico: item.CorreoElectronico
        }));
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    );
  }

  actualizarTabla(): void {
    // Llama al método para obtener los datos de la API después de realizar una acción
    this.getData();
  }

  confirmarBorrado(id: number): void {
    // Establece el ID de la persona a borrar
    this.personaIdToDelete = id;
    // Abre el modal de confirmación de borrado
    const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal')!);
    modal.show();
  }

borrarPersona(): void {
  if (this.personaIdToDelete !== null) {
    // Realiza la solicitud DELETE a la API para borrar la persona
    this.http.delete(`http://localhost:3000/api/persona/${this.personaIdToDelete}`).subscribe(
      (response) => {
        console.log('Persona borrada correctamente:', response);
        // Actualiza la tabla después de borrar la persona
        this.actualizarTabla();
        // Reinicia el ID de la persona a borrar
        this.personaIdToDelete = null;
        // Cierra el modal después de borrar la persona utilizando Bootstrap
        const myModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal')!);
        myModal.hide();
      },
      (error) => {
        console.error('Error al borrar la persona:', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    );
  }
}
}
