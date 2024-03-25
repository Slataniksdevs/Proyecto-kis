import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Persona {
  ID: number;
  Nombre: string;
  Apellido: string;
  Rut: string;
  Sexo: string;
  Telefono: string;
  Direccion: string;
  FechaNacimiento: Date;
  CorreoElectronico: string;
}

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {
  nombre: string = ''
  personas: Persona[] = [];
  personaSeleccionada: Persona | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  buscarPorNombre(nombre: string): void {
    this.http.get<Persona[]>(`http://localhost:3000/api/personas/buscar/${nombre}`).subscribe(data => {
      this.personas = data;
    }, error => {
      console.error('Error al buscar personas:', error);
    });
  }

  seleccionarPersona(persona: Persona): void {
    console.log(persona)
    this.personaSeleccionada = persona;
  }

  borrarPersona(): void {
    if (this.personaSeleccionada) {
      const id = this.personaSeleccionada.ID;
      this.http.delete(`http://localhost:3000/api/persona/${id}`).subscribe(() => {
        console.log('Persona eliminada correctamente');
        // Actualizar la lista de personas después de la eliminación
        this.buscarPorNombre('');
        // Limpiar la persona seleccionada
        this.personaSeleccionada = null;
      }, error => {
        console.error('Error al eliminar persona:', error);
        // Manejar el error
      });
    }
  }
}
