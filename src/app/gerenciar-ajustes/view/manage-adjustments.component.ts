import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AdjustmentsFacade } from '../../adjustments/facade/adjustments.facade';
import { ProfileFacade } from '../../profile/facade/profile.facade';

@Component({
    selector: 'manage-adjustments',
    templateUrl: './manage-adjustments.component.html',
    styleUrls: ['./manage-adjustments.component.css']
})
export class ManageAdjustmentsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = []

    adjustments$: Observable<any[]> | undefined
    profile$: Observable<any> | undefined

    constructor(
        private adjustmentsFacade: AdjustmentsFacade,
        private profileFacade: ProfileFacade
    ) { }
    
    ngOnInit() {
        this.adjustments$ = this.adjustmentsFacade.getAllAdjustments()
        this.profile$ = this.profileFacade.getProfile()

        this.adjustments$.subscribe(data => console.log(data))
    }

    manageAdjustment(params: any) {
        let status = params.accept ? 1 : 2
        this.subscriptions.push(this.adjustmentsFacade.updateAdjustments(params.id, { status: status }).subscribe({
            next: () => {
                alert('Ajuste de ponto atualizado!')
            },
            error: () => {
                alert('Não foi possível atualizar o ajuste de ponto')
            }
        }))
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe())
    }
}
