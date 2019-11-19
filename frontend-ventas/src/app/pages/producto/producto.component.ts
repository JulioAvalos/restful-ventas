import { switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/_service/producto.service';
import { MatSnackBar, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Producto } from 'src/app/_model/producto.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  dataSource: MatTableDataSource<Producto>;
  displayedColumns = ['idProducto', 'nombre', 'marca', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private productoService: ProductoService, private snack: MatSnackBar) { }

  ngOnInit() {
    this.productoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.productoService.productoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.productoService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'Aviso', {
        duration: 2000
      });
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idPersona: number){
    this.productoService.eliminar(idPersona).pipe(switchMap(() => {
      return this.productoService.listar();
    })).subscribe(data => {
      this.productoService.productoCambio.next(data);
      this.productoService.mensajeCambio.next('Se elimino producto');
    });

  }

}
