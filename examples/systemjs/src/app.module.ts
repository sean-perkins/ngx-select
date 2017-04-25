import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DropDownModule } from 'ngx-select';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        MaterialModule,
        InfiniteScrollModule,
        DropDownModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
