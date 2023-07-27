import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Carrera {
  _id: string;
  nombre_carrera: string;
  cantidad_km: string;
  detalles: string;
  hora: string;
  status:Boolean
}

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit {

  carreras: Carrera[] = [];
  objeto: any;
  carreraForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.carreraForm = this.formBuilder.group({
      _id: [null],
      nombre_carrera: ['', Validators.required],
      cantidad_km: ['', Validators.required],
      detalles:['', Validators.required],
      hora:['', Validators.required],
      status: ['', Validators.required],
      __v: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getCarreras(): void {
    this.http.get<Carrera>('http://localhost:3000/v1/control/api/carreras').subscribe(
      (data) => {
        this.carreras = [data] ;
        console.log(this.carreras[0]);
        this.objeto = this.carreras[0]

      },
      (error) => {
        console.error('Error al obtener carreras:', error);
      }
    );
  }

  submitCarrera(): void {
    const carrera = this.carreraForm.value;

    if (carrera._id) {
      this.http.put(`http://localhost:3000/v1/control/api/carreras/actualizar/${carrera._id}`, carrera).subscribe(
        () => {
          this.carreraForm.reset();
          this.getCarreras();
        },
        (error) => {
          console.error('Error al actualizar las carreras:', error);
        }
      );
    } else {
      this.http.post('http://localhost:3000/v1/control/api/carreras/crear', carrera).subscribe(
        () => {
          this.carreraForm.reset();
          this.getCarreras();
        },
        (error) => {
          console.error('Error al agregar la carrera:', error);
        }
      );
    }
  }

  editarCarrera(carrera: Carrera): void {
    this.carreraForm.setValue(carrera);
  }

  eliminarCarrera(_id: string): void {
    this.http.delete(`http://localhost:3000/v1/control/api/carreras/eliminar/${_id}`).subscribe(
      () => {
        this.getCarreras();
      },
      (error) => {
        console.error('Error al eliminar la carrera:', error);
      }
    );
  }
}
