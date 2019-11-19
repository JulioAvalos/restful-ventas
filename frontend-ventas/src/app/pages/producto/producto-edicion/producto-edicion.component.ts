import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/_service/producto.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Producto } from 'src/app/_model/producto.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-producto-edicion',
  templateUrl: './producto-edicion.component.html',
  styleUrls: ['./producto-edicion.component.css']
})
export class ProductoEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'idProducto': new FormControl(0),
      'nombre': new FormControl(''),
      'marca': new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.productoService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idProducto': new FormControl(data.idProducto),
          'nombre': new FormControl(data.nombre),
          'marca': new FormControl(data.marca)
        });
      });
    }
  }

  operar() {
    let producto = new Producto();
    producto = { ...this.form.value };

    if (this.edicion) {
      this.productoService.modificar(producto).pipe(switchMap(() => {
        return this.productoService.listar();
      })).subscribe(data => {
        this.productoService.productoCambio.next(data);
        this.productoService.mensajeCambio.next('Se modifico!');
      });
    } else {
      this.productoService.registrar(producto).pipe(switchMap(() => {
        return this.productoService.listar();
      })).subscribe(data => {
        this.productoService.productoCambio.next(data);
        this.productoService.mensajeCambio.next('Se registro!');
      });
    }
    this.router.navigate(['producto']);
  }

}
