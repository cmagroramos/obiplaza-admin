import { Component, EventEmitter, forwardRef, OnInit, Output, ViewChild } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { FireDbService } from '../../fire-db.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';

export const SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CartaComponent),
  multi: true
};


@Component({
  selector: 'app-carta-select',
  templateUrl: './carta.component.html',
  providers: [SELECT_VALUE_ACCESSOR],
  styleUrls: ['./carta.component.scss']
})
export class CartaComponent implements OnInit, ControlValueAccessor {


  selectedCarta: SelectItem;
  cartas: SelectItem[];
  carta: string;

  seleccion = false;

  @ViewChild(Dropdown, { static: true }) ref: Dropdown;
  @Output() seleccionado = new EventEmitter<number>();

  constructor(public db: FireDbService) { }

  ngOnInit(): void {
    this.db.getCartasSelect().then(
      datos => {
        this.cartas = datos;
      }
    );
  }

  onSelectedCategoria(option: SelectItem) {
    // Cargar las ubicaciones de ese almacén
    this.seleccionado.emit(Number(option.value));
    this.seleccion = true;
    console.log('Seleccionado:', option);

  }

  writeValue(obj: any): void {
    const a: SelectItem = {
      value: obj,
      label: ''
    };
    this.ref.writeValue( a );
    if (obj) {
      this.seleccion = true;
    }
    // this.ref.multiple = this.permiteSeleccionMultiple;
  }
  registerOnChange(fn: any): void {
    this.ref.registerOnChange(fn);
  }
  registerOnTouched(fn: any): void {
    this.ref.registerOnTouched(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
    this.ref.setDisabledState(isDisabled);
  }

}
