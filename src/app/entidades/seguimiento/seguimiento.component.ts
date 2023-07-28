import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';

interface Seguimiento {
  _id: string;
  tiempo_llegada: string;
  orden_llegada: string;
  pulso_inicial:string;
  pulso_final:string;
  status:Boolean;
  carrera:string;
  corredor:string
}

@Component({
  selector: 'app-seguimiento',
  templateUrl:'./seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css'],
  providers: [DatePipe]
})
export class SeguimientoComponent implements OnInit {
  seguimientos: Seguimiento[] = [];
  objeto: any;
  seguimientoForm: FormGroup;
  seguimientosSeleccionados: string[] = [];

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.seguimientoForm = this.formBuilder.group({
      _id: [null],
      tiempo_llegada: ['', Validators.required],
      orden_llegada: ['', Validators.required],
      pulso_inicial: ['', Validators.required],
      pulso_final: ['', Validators.required],
      // carrera: ['', Validators.required],
      // corredor: ['',Validators.required ],
      // seleccionados: this.formBuilder.array([], [Validators.minLength(2), Validators.maxLength(10)])
    });
  }
  ngOnInit(): void {
    this.getSeguimientos();
  }
  
  get seguimientosSeleccionadosArray() {
    return this.seguimientoForm.get('seleccionados') as FormArray;
  }

  // metodo para manejar la selección/deselección de un seguimiento
  seleccionarDesSeleccionarSeguimiento(event: any, seguimientoId: string) {
    if (event.target.checked) {

      this.seguimientosSeleccionados.push(seguimientoId);
    } else {
      this.seguimientosSeleccionados = this.seguimientosSeleccionados.filter(id => id !== seguimientoId);
    }

    this.seguimientoForm.patchValue({
      seleccionados: this.seguimientosSeleccionados
      
    });
    console.log(this.seguimientosSeleccionados);
    
  }
  estaSeleccionado(seguimientoId: string): boolean {
    return this.seguimientosSeleccionados.includes(seguimientoId);
  }
  
  getSeguimientos(): void {
    this.http.get<Seguimiento>('http://localhost:3000/v1/control/api/seguimientos').subscribe(
      (data) => {
        this.seguimientos = [data] ;
        console.log(this.seguimientos[0]);
        this.objeto = this.seguimientos[0]

      },
      (error) => {
        console.error('Error al obtener el seguimiento:', error);
      }
    );
  }
//metodo eliminar al dar click en el boton
  eliminarSeleccionados() {
 
    if (this.seguimientosSeleccionados.length < 2 || this.seguimientosSeleccionados.length > 10) {
      alert('Debes seleccionar entre 2 y 10 elementos para eliminar.');
      return;
    }

    const idsAEliminar = this.seguimientosSeleccionados.join(','); 
    console.log(idsAEliminar);
    
    this.http.post(`http://localhost:3000/v1/control/api/seguimientos/eliminar-masivo`, { ids: idsAEliminar }).subscribe(
      () => {
        
        this.seguimientosSeleccionados = [];
        this.getSeguimientos();
        alert('Se eliminaron los elementos seleccionados exitosamente.');
      },
      (error) => {
        console.error('Error al eliminar los elementos seleccionados:', error);
      }
    );
  }

  submitSeguimiento(): void {
    const seguimiento = this.seguimientoForm.value;
    console.log(seguimiento);
    

    if (seguimiento._id) {
      this.http.put(`http://localhost:3000/v1/control/api/seguimientos/actualizar/${seguimiento._id}`, seguimiento).subscribe(
        () => {
          this.seguimientoForm.reset();
          this.getSeguimientos();
        },
        (error) => {
          console.error('Error al actualizar el seguimiento', error);
        }
      );
    } else {
      this.http.post('http://localhost:3000/v1/control/api/seguimientos/crear', seguimiento).subscribe(
        () => {
          this.seguimientoForm.reset();
          this.getSeguimientos();
        },
        (error) => {
          console.error('Error al agregar el Seguimiento:', error);
        }
      );
    }
  }

  editarSeguimiento(seguimiento: Seguimiento): void {
    this.seguimientoForm.setValue(seguimiento);
  }
  //este es el que debes usar si quieres guardar
  deleteSeguimiento(id: string): void {
    this.http.delete(`http://localhost:3000/v1/control/api/seguimientos/${id}`).subscribe(
      () => {
        this.getSeguimientos();
      },
      (error) => {
        console.error('Error al eliminar el seguimiento:', error);
      }
    );
  }

  //y este es el de recuperar
  restoreSeguimiento(id: string): void {
    this.http.post(`http://localhost:3000/v1/control/api/seguimientos/restaurar/${id}`, {}).subscribe(
      () => {
        this.getSeguimientos();
      },
      (error) => {
        console.error('Error al restaurar el seguimiento:', error);
      }
    );
  }

  eliminarSeguimiento(_id: string): void {
    this.http.delete(`http://localhost:3000/v1/control/api/seguimientos/eliminar/${_id}`).subscribe(
      () => {
        this.getSeguimientos();
      },
      (error) => {
        console.error('Error al eliminar el seguimiento:', error);
      }
    );
  }

}
