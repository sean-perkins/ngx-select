# ngx-select

[![npm](https://img.shields.io/npm/v/ngx-infinite-select.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-infinite-select)
[![npm](https://img.shields.io/npm/dt/ngx-infinite-select.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-infinite-select)

A drop and drop plugin for Angular 4+. Includes basic functionality for searching, infinite scroll (leverages plugin) and dynamically pops items off the viewport to handle large collections (tested with 1 million records). 

[Demo](http://plnkr.co/edit/aVvJj29LlkJP10DxdHnP?p=preview)

## Usage

Install the plugin:
```
npm i ngx-infinite-select --save
```

Import the module into your feature/app module.
```
import { DropDownModule } from 'ngx-select';

@NgModule({
    imports: [
        DropDownModule
    ]
})
export class SomeModule {}
```

Use the component in your template:

some.component.html
```
<ngx-select
    [options]="options"
    labelKey="label"
    valueKey="value"></ngx-select>
```
some.component.ts
```
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'some-component',
    templateUrl: './some.component.html'
})
export class SomeComponent implements OnInit {

    options: any[] = [];

    ngOnInit() {
        this.options = [
            {
                value: 1,
                label: 'Option 1'
            },
            {
                value: 2,
                label: 'Option 2'
            }
        ];
    }

}
```
