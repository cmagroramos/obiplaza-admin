import { Component, OnInit, Output , Input, EventEmitter, ViewChild,
  forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';

import { IOption, SelectComponent } from 'ng-select';
import { FireDbService } from '../../fire-db.service';

export const SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectCategoryComponent),
  multi: true
};

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  providers: [SELECT_VALUE_ACCESSOR],
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit, ControlValueAccessor {

  seleccion = false;

  @ViewChild(SelectComponent, { static: true }) ref: SelectComponent;
  @Output() seleccionado = new EventEmitter<number>();
  @Input() tipo = '';
  @Input() permiteSeleccionMultiple = false;

  categoriaOpt: Array<IOption>;

  constructor(public db: FireDbService) { }

  ngOnInit() {

    this.db.getGruposSelect().then(
      datos => {
        this.categoriaOpt = datos;
      }
    );
  }

  onSelectedCategoria(option: IOption) {
    // Cargar las ubicaciones de ese almacén
    this.seleccionado.emit(Number(option.value));
    this.seleccion = true;

  }
  writeValue(obj: any): void {
    this.ref.writeValue(obj);
    if (obj) {
      // console.log('Dentro del componente almacen ' + obj);
      this.seleccion = true;
    }
    this.ref.multiple = this.permiteSeleccionMultiple;
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
