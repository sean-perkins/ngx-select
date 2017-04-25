import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LazyComponent } from "./lazy.component";
import { CommonModule } from "@angular/common";

import { DropDownModule } from 'ngx-infinite-select';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule.forChild([
            {
                path: '', children: [
                    { path: '', component: LazyComponent }
                ]
            },
        ]),
        DropDownModule
    ],
    declarations: [LazyComponent]
})
export class LazyModule {
}
