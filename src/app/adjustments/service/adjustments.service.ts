import { Injectable } from '@angular/core';
import { AdjustmentsApi } from '../api/adjustments.api';
import { ProfileState } from '../../profile/state/profile.state';
import { take, Subscription } from 'rxjs';
import { Constants } from '../../../contants';

@Injectable({ providedIn: 'root' })
export class AdjustmentsService {
    private subscriptions: Subscription[] = []

    constructor(
        private adjustmentsApi: AdjustmentsApi,
        private profileState: ProfileState
    ) { }

    setAdjustments(adjustment: any) {
        let data = {
            uid: this.profileState.getUidSync(),
            date: null,
            fix: 0,
            justification: null,
            status: 0,
            type: 0,
            created: new Date()
        }

        data.date = adjustment.date
        data.fix = parseFloat(adjustment.fix.replace(':', '.'))
        data.justification = adjustment.justification
        data.status = adjustment.status
        data.type = parseInt(adjustment.type)
     
        return this.adjustmentsApi.setAdjustments(data)
    }

    updateAdjustments(id: string, data: any) {
        return this.adjustmentsApi.updateAdjustments(id, data)
    }

    getAllUserAdjustments() {
        return this.adjustmentsApi.getAllUserAdjustments(
            this.profileState.getUidSync()
        )
    }

    getAllAdjustments() {
        return this.adjustmentsApi.getAllAdjustments()
    }

    destroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe())
    }
}
