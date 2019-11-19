import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { Venta } from './../../_model/venta.model';
import { VentaService } from './../../_service/venta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  dataSource: MatTableDataSource<Venta>;
  displayedColumns = ['idVenta', 'nombre', 'importe', 'fecha'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private ventaService: VentaService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {

    this.ventaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.ventaService.ventaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.ventaService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'Aviso', {
        duration: 2000
      });
    });

  }

  filtrar(valor: string) {
    this.dataSource.filterPredicate = (data: Venta, filter: string) => {
      return data.persona.nombres.toLowerCase().includes(filter) || data.persona.apellidos.toLowerCase().includes(filter);
    };
    this.dataSource.filter = valor.trim().toLowerCase();
  }

}
