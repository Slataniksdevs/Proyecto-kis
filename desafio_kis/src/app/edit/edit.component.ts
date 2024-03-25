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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  personaForm: FormGroup;
  personas: Persona[] = [];
  personaSeleccionada: Persona | null = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.personaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', Validators.required],
      sexo: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  buscarPorNombre(nombre: string): void {
    this.http.get<Persona[]>(`http://localhost:3000/api/personas/buscar/${nombre}`).subscribe(data => {
      this.personas = data;
      this.seleccionarPersona(data[0])
    }, error => {
      console.error('Error al buscar personas:', error);
    });
  }

  seleccionarPersona(persona: Persona): void {
    console.log(persona)
    this.personaSeleccionada = persona;
    this.personaForm.patchValue(persona);
  }

  editarPersona(): void {
    if (this.personaSeleccionada) {
      console.log(this.personaSeleccionada.Apellido)
      const id = this.personaSeleccionada.ID;
      const formData = this.personaForm.value;
      this.http.put(`http://localhost:3000/api/persona/${id}`, formData).subscribe(() => {
        console.log('Usuario editado correctamente');
        // Actualizar la lista de personas después de la edición
        this.buscarPorNombre('');
        // Limpiar el formulario después de la edición
        this.personaSeleccionada = null;
        this.personaForm.reset();
      }, error => {
        console.error('Error al editar usuario:', error);
        // Manejar el error
      });
    }
  }}
