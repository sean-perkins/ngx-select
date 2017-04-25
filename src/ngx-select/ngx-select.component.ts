import { Component, OnChanges, Input, forwardRef, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'ngx-select',
    template: 
    `
<div class="select-container" (click)="toggleDisplay()">
    <div class="select-input" [class.opened]="visible">
        <span class="select-text" *ngIf="!visible"
            [innerText]="inputPlaceholderText"></span>
        <input autofocus type="text" class="search-input" *ngIf="visible" #searchInput
            (click)="handleInputFocus($event)"
            (keyup)="handleSearchEvent($event)"
            [(ngModel)]="searchTerm"
            [placeholder]="searchPlaceholderText" />
        <span class="clear-search" *ngIf="visible"
            (click)="clearSearch($event)">X</span>
        <span class="caret vertical-center"></span>
    </div>
    <div class="select-options-container" *ngIf="visible">
        <div class="select-options"
            infinite-scroll
            [scrollWindow]="false"
            [infiniteScrollDistance]="3"
            [infiniteScrollThrottle]="100"
            (scrolledUp)="onScrollUp($event)"
            (scrolled)="onScrollDown($event)">
                <p *ngIf="(options === null || options.length < 1) && !hasSearchTerm"
                    [innerText]="optionsPlaceholderText"></p>
                <p *ngIf="(options === null || options.length < 1) && hasSearchTerm"
                    [innerText]="noSearchResultsPlaceholderText"></p>
                <div *ngFor="let option of displayedOptions" class="select-option-item" (click)="handleOptionSelect($event, option)">
                    <md-checkbox
                        [checked]="isSelected(option)"></md-checkbox>
                    <span [innerText]="getOptionLabel(option)"></span>
                </div>
        </div>
    </div>
</div>

    `,
    styles: [
`
:host {
    display:block;
}
.select-container {
    position:relative;
    cursor: pointer;
    border:1px solid #D6D6E4;
    border-radius:5px;
    width:100%;
    font-style:italic;
    font-weight:500;
}
select-container .caret {
    right: 10px;
    color: #df4760;
    font-size:15px;
    border-top: 6px dashed;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
}
.select-input {
    position:relative;
    padding:5px 10px;
    color: #626272;
}
.select-input.opened {
    padding:0 10px 0 0;
}
.select-input .search-input {
    font-style:normal;
    border-color: transparent;
    border-top-left-radius: 5px;
    border-bottom-left-radius:5px;
}
.select-input .search-input:focus {
    outline:0;
}
.select-input .search-input .clear-search {
    font-size: 10px;
    font-style: normal;
    color: #626272;
}
.select-option-item {
    padding:5px 10px;
    border-top:1px solid #F5F5F5;
}
.select-option-item:first-child {
    border-top:0;
}
.select-option-item:hover {
    background-color:#F5F5F5;
}
.select-options {
    position: absolute;
    background: #FFFFFF;
    width: 100%;
    overflow-y:scroll;
    max-height: 200px;
}
.select-options-container {
    border: 1px solid;
    display: block;
    position: relative;
    width: 100%;
} `
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropDownComponent),
            multi: true
        }
    ]
})
export class DropDownComponent implements ControlValueAccessor, OnChanges {

    @Input() options: any[] = [];
    @Input() labelKey: string;
    @Input() valueKey: string;
    @Input('selectedOptions') _selectedOptions: any[];
    @Input() searchPlaceholderText = 'Search...';
    @Input() inputPlaceholderText = 'Select an option...';
    @Input() optionsPlaceholderText = 'There are no items.';
    @Input() noSearchResultsPlaceholderText = 'No results for search.';

    @ViewChild('searchInput') searchInput: ElementRef;

    collection: any[] = [];

    searchTerm: string = '';

    visible = false;

    private page = 0;
    private numberOfPages = 0;
    private ALLOTED_VIEWPORT_ITEMS = 6;
    private _displayedOptions: any[] = [];

    propagateChange = (_: any) => {
        //
    }

    writeValue(value: any): void {
        if (value) {
            this.selectedOptions = value;
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange(fn);
    }

    registerOnTouched(fn: any): void {
        //
    }

    setDisabledState(isDisabled: boolean): void {
        //
    }

    toggleDisplay(): void {
        this.visible = !this.visible;
        if (this.visible) {
            this.focusSearchInput();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['options']) {
            if (changes['options'].currentValue !== null) {
                this.options = changes['options'].currentValue;
                this.collection = changes['options'].currentValue;
                this.numberOfPages = Math.ceil(this.options.length / this.ALLOTED_VIEWPORT_ITEMS);
                this.updateDisplayedItems();
                this.propagateChange(this.options);
            }
        }
    }

    get selectedOptions(): any[] {
        return this._selectedOptions;
    }

    set selectedOptions(value: any[]) {
        this._selectedOptions = value;
        this.propagateChange(value);
    }

    getOptionLabel(option: any): string {
        if (this.labelKey) {
            if (option[this.labelKey]) {
                return option[this.labelKey];
            }
        }
        return option;
    }

    getOptionValue(option: any): any {
        if (this.valueKey) {
            if (option[this.valueKey]) {
                return option[this.valueKey];
            }
        }
        return option;
    }

    handleInputFocus(event: any) {
        event.stopPropagation();
        event.preventDefault();
    }

    handleSearchEvent(event?: any) {
        const searchOptions = [...this.collection];
        this.options = searchOptions.filter(item => {
            if (item && this.searchTerm.trim().length > 0) {
                return this.getOptionLabel(item).toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1;
            }
            return true;
        });
        this.updateDisplayedItems();
    }

    handleOptionSelect(event: any, option: any) {
        event.stopPropagation();
        event.preventDefault();
        const value = this.getOptionValue(option);
        if (this.isSelected(value)) {
            this.selectedOptions.splice(this.selectedOptions.indexOf(value), 1);
        }
        else {
            this.selectedOptions.push(value);
        }
    }

    clearSearch(event: any): void {
        event.stopPropagation();
        event.preventDefault();
        this.searchTerm = '';
        this.handleSearchEvent();
        this.focusSearchInput();
    }

    onScrollUp(event: any): void {}

    onScrollDown(event: any): void {
        if (this.page < this.numberOfPages) {
            this.page++;
            this.updateDisplayedItems();
        }
    }

    get displayedOptions(): any[] {
        return this._displayedOptions;
    }

    focusSearchInput(): void {
        if (this.searchInput && this.searchInput.nativeElement) {
            this.searchInput.nativeElement.focus();
        }
    }

    isSelected(option: any): boolean {
        return this.selectedOptions.indexOf(this.getOptionValue(option)) !== -1;
    }

    get hasSearchTerm(): boolean {
        return this.searchTerm && this.searchTerm.trim().length > 0;
    }

    private updateDisplayedItems(): void {
        const startPage = this.page === 0 ? 0 : (this.page - 1);
        let endPage = 0;

        if (this.page === this.numberOfPages) {
            endPage = this.page;
        }
        else if (this.page === 0) {
            endPage = this.page + 3;
        }
        else {
            endPage = this.page + 2;
        }
        this._displayedOptions = this.options.slice(
            startPage * this.ALLOTED_VIEWPORT_ITEMS,
            endPage * this.ALLOTED_VIEWPORT_ITEMS
        );
    }

}
