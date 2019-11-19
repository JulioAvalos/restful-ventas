import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VentaService } from 'src/app/_service/venta.service';
import { Venta } from 'src/app/_model/venta.model';

@Component({
  selector: 'app-venta-dialogo',
  templateUrl: './venta-dialogo.component.html',
  styleUrls: ['./venta-dialogo.component.css']
})
export class VentaDialogoComponent implements OnInit {

  venta: Venta;

  constructor(
    private dialogRef: MatDialogRef<VentaDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Venta
    // private ventaService: VentaService
  ) { }

  ngOnInit() {
    this.venta = new Venta();
    this.venta = { ...this.data };
    console.log(this.venta);
  }

  cancelar() {
    this.dialogRef.close();
  }

}
