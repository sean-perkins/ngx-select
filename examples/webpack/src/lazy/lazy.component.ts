import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'lazy',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ngx-select
            [options]="options"
            labelKey="label"
            valueKey="value"></ngx-select>
    `,
})
export class LazyComponent implements OnInit {

    options: any[] = [];

    ngOnInit() {
        this.options = [
            {
                label: 'Option 1',
                value: 1
            },
            {
                label: 'Option 2',
                value: 2
            },
            {
                label: 'Option 3',
                value: 3
            }
        ];
    }

}
