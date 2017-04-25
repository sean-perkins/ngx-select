# ngx-select

A drop and drop plugin for Angular 4+. Includes basic functionality for searching, infinite scroll (leverages plugin) and dynamically pops items off the viewport to handle large collections (tested with 1 million records). 

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
