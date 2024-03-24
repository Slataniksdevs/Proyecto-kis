import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'desafio_kis';
  data: any[] = []; // Variable para almacenar los datos de la API

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
}