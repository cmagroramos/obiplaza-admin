import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCategoryComponent } from './select-category/select-category.component';
import { SelectModule } from 'ng-select';
import { SelectAlergenoComponent } from './select-alergeno/select-alergeno.component';
import { SelectGenericsComponent } from './select-generics/select-generics.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { CartaComponent } from './carta/carta.component';

import { DropdownModule } from 'primeng/dropdown';
import { SearchComponent } from './search/search.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SelectCategoryComponent, CartaComponent,
                 SelectAlergenoComponent, SelectGenericsComponent,
                 FooterComponentComponent, CartaComponent, SearchComponent],
  imports: [
    CommonModule,
    SelectModule,
    DropdownModule,
    FormsModule
  ],
  exports: [SelectCategoryComponent,
            CartaComponent,
            SearchComponent,
            SelectAlergenoComponent,
            SelectGenericsComponent,
            FooterComponentComponent]
})
export class ShareModule { }
