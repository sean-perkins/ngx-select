import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p>Home Component</p>
    `,
})
export class HomeComponent { }
