import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grilla-kis',
  templateUrl: './grilla-kis.component.html',
  styleUrls: ['./grilla-kis.component.css']
})
export class GrillaKisComponent implements OnInit {
  personas: any[] = []; // Array para almacenar las personas obtenidas de la API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Llamar a la API para obtener la lista de personas al inicializar el componente
    this.obtenerPersonas();
  }

  obtenerPersonas(): void {
    // Hacer una solicitud GET a la API para obtener la lista de personas
    this.http.get<any[]>('http://localhost:3000/api/persona').subscribe(
      (data) => {
        // Al recibir la respuesta, asignar los datos al array de personas
        this.personas = data;
      },
      (error) => {
        console.error('Error al obtener las personas:', error);
        // Manejar el error de acuerdo a tus necesidades
      }
    );
  }

  eliminarPersona(id: number): void {
    // Hacer una solicitud DELETE a la API para eliminar una persona por su ID
    this.http.delete(`http://localhost:3000/api/persona/${id}`).subscribe(
      () => {
        // Si la eliminación es exitosa, volver a cargar la lista de personas
        this.obtenerPersonas();
      },
      (error) => {
        console.error('Error al eliminar la persona:', error);
        // Manejar el error de acuerdo a tus necesidades
      }
    );
  }
}
