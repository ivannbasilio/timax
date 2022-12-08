import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdjustmentsFacade } from '../facade/adjustments.facade';
import { Observable } from 'rxjs';
import { ProfileFacade } from '../../profile/facade/profile.facade';
import { serverTimestamp } from '@angular/fire/firestore';

@Component({
    selector: 'adjustments',
    templateUrl: './adjustments.component.html',
    styleUrls: ['./adjustments.component.css']
})
export class AdjustmentsComponent implements OnInit, AfterViewInit {

    adjustments$: Observable<any> | undefined
    showModal: boolean = false
    adjustment: any = {
        date: null,
        fix: 0,
        justification: null,
        status: 0,
        type: 0
    }

    types: any = [ {id: 0, name: 'Ajuste'}, {id: 1, name: 'Inclusão'} ]

    constructor(
        private adjustmentsFacade: AdjustmentsFacade
    ) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.adjustments$ = this.adjustmentsFacade.getAllUserAdjustments()
    }

    createAdjustment() {
        this.adjustmentsFacade.setAdjustments(this.adjustment).subscribe({
            next: () => {
                alert('Ajuste de ponto criado')
                this.showModal = false
            },
            error: () => {
                alert('Erro')
            }
        })
    }
}
