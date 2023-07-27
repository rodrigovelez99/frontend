import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Corredor {
  _id: string;
  nombreCorredor: string;
  peso: string;
  altura:string;
  edad:string;
  status:Boolean
}

@Component({
  selector: 'app-corredor',
  templateUrl: './corredor.component.html',
  styleUrls: ['./corredor.component.css']
})

export class CorredorComponent implements OnInit {
  corredor: Corredor[] = [];
  objeto: any;
  corredorForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.corredorForm = this.formBuilder.group({
      _id: [null],
      nombreCorredor: ['', Validators.required],
      peso:['', Validators.required],
      altura:['', Validators.required],
      edad:['', Validators.required],
      status: ['', Validators.required],
      __v: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.getCorredor();
  }
  getCorredor(): void {
    this.http.get<Corredor>('http://localhost:3000/v1/control/api/corredores').subscribe(
      (data) => {
        this.corredor = [data] ;
        console.log(this.corredor[0]);
        this.objeto = this.corredor[0]

      },
      (error) => {
        console.error('Error al obtener el corredor:', error);
      }
    );
  }

  submitCorredor(): void {
    const corredor = this.corredorForm.value;

    if (corredor._id) {
      this.http.put(`http://localhost:3000/v1/control/api/corredores/actualizar/${corredor._id}`, corredor).subscribe(
        () => {
          this.corredorForm.reset();
          this.getCorredor();
        },
        (error) => {
          console.error('Error al actualizar el corredor:', error);
        }
      );
    } else {
      this.http.post('http://localhost:3000/v1/control/api/corredores/crear', corredor).subscribe(
        () => {
          this.corredorForm.reset();
          this.getCorredor();
        },
        (error) => {
          console.error('Error al agregar el corredor:', error);
        }
      );
    }
  }

  editarCorredor(corredor: Corredor): void {
    this.corredorForm.setValue(corredor);
  }

  eliminarcorredor(_id: string): void {
    this.http.delete(`http://localhost:3000/v1/control/api/corredores/eliminar/${_id}`).subscribe(
      () => {
        this.getCorredor();
      },
      (error) => {
        console.error('Error al eliminar el corredor:', error);
      }
    );
  }

}
