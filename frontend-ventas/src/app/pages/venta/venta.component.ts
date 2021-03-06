import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { Venta } from './../../_model/venta.model';
import { VentaService } from './../../_service/venta.service';
import { ActivatedRoute } from '@angular/router';
import { VentaDialogoComponent } from './venta-dialogo/venta-dialogo.component';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  dataSource: MatTableDataSource<Venta>;
  displayedColumns = ['idVenta', 'nombre', 'importe', 'fecha', 'acciones'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private ventaService: VentaService,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog
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
    // se sobreescribio la implementacion del filtro para buscar segun nombre o apellido solamente...
    this.dataSource.filterPredicate = (data: Venta, filter: string) => {
      return data.persona.nombres.toLowerCase().includes(filter) || data.persona.apellidos.toLowerCase().includes(filter);
    };
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(venta?: Venta) {
    console.log(venta);
    let ven = venta != null ? venta : new Venta();
    this.dialog.open(VentaDialogoComponent, {
      width: '350px',
      data: ven
    });
  }

}
