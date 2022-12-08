import { Injectable, Injector } from '@angular/core';
import { AdjustmentsService } from '../service/adjustments.service';

@Injectable({ providedIn: 'root' })
export class AdjustmentsFacade {

    constructor(private injector: Injector) { }

    private _adjustmentsService: AdjustmentsService | undefined;
    public get adjustmentsService(): AdjustmentsService {
        if(!this._adjustmentsService){
        this._adjustmentsService = this.injector.get(AdjustmentsService);
        }
        return this._adjustmentsService;
    }

    setAdjustments(adjustment: any) {
        return this.adjustmentsService.setAdjustments(adjustment)
    }

    updateAdjustments(id: string, data: any) {
        return this.adjustmentsService.updateAdjustments(id, data)
    }

    getAllUserAdjustments() {
        return this.adjustmentsService.getAllUserAdjustments()
    }

    getAllAdjustments() {
        return this.adjustmentsService.getAllAdjustments()
    }
}
