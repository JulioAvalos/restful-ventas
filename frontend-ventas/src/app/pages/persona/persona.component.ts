import { Persona } from './../../_model/persona.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { PersonaService } from 'src/app/_service/persona.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  dataSource: MatTableDataSource<Persona>;
  displayedColumns = ['idPersona', 'nombres', 'apellidos', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private personasService: PersonaService, private snack: MatSnackBar) { }

  ngOnInit() {
    this.personasService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.personasService.personaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.personasService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'Aviso', {
        duration: 2000
      });
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idPersona: number){
    this.personasService.eliminar(idPersona).pipe(switchMap(()=>{
      return this.personasService.listar();
    })).subscribe(data => {
        this.personasService.personaCambio.next(data);
        this.personasService.mensajeCambio.next('Se elimino');
    });
  }

}
