import { Injectable, Injector } from '@angular/core';
import { TimeNoteService } from '../service/time-note.service';
import { Field } from '../../../field.constants';
import { Observable } from 'rxjs';
import { TimeNote } from 'src/app/models/time-note';

@Injectable({ providedIn: 'root' })
export class TimeNoteFacade {

    constructor(private injector: Injector) { }

    private _timeNoteService: TimeNoteService | undefined;
    public get timeNoteService(): TimeNoteService {
        if(!this._timeNoteService){
        this._timeNoteService = this.injector.get(TimeNoteService);
        }
        return this._timeNoteService;
    }

    getCurrentTimeNote(): Observable<TimeNote>{
		return this.timeNoteService.getCurrentTimeNote()
	}

    setTimeNote(note: any) {
		return this.timeNoteService.setTimeNote(note)
	}

    updateTimeNote(note: any) {
		return this.timeNoteService.updateTimeNote(note)
	}

    getAllTimeNotes(query: any) {
        return this.timeNoteService.getAllTimeNotes(query)
    }

    getWeekTimeNotes() {
        return this.timeNoteService.getWeekTimeNotes()
    }
}
