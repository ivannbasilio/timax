import { Injectable, Injector } from '@angular/core';
import { TimerService } from '../service/timer.service';
import { Field } from '../../../field.constants';
import { Observable } from 'rxjs';
import { TimeNote } from 'src/app/models/time-note';

@Injectable({ providedIn: 'root' })
export class TimerFacade {

    constructor(private injector: Injector) { }

    private _timerService: TimerService | undefined;
    public get timerService(): TimerService {
        if(!this._timerService){
        this._timerService = this.injector.get(TimerService);
        }
        return this._timerService;
    }

    getCurrentTimeNote(): Observable<any> {
		return this.timerService.getCurrentTimeNote()
	}

    setTimeNote(note: any) {
		return this.timerService.setTimeNote(note)
	}

    getAllTimeNotes() {
        return this.timerService.getAllTimeNotes()
    }

    computeHours(timeNote: any) {
        return this.timerService.computeHours(timeNote)
    }
}
