import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface ConfirmModel {
    title: string;
    message: string;
}

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel {
    title: string = 'Modal';
    message: string = '';

    constructor() {
        super();
    }
    
    confirm() {
        // we set modal result as true on click on confirm button,
        // then we can get modal result from caller code
        this.result = true;
        this.close();
    }
}
