import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// feature
import { DropDownComponent } from './src/ngx-select/ngx-select.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        InfiniteScrollModule
    ],
    exports: [
        DropDownComponent
    ],
    declarations: [
        DropDownComponent
    ]
})
export class DropDownModule { }
