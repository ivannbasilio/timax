import { Injectable } from '@angular/core';
import { Field } from 'src/field.constants';
import { TimerApi } from '../api/timer.api';
import { Observable } from 'rxjs';
import { TimeNote } from 'src/app/models/time-note';
import { ProfileState } from '../../profile/state/profile.state';
import { TimeNoteApi } from '../../timenote/api/time-note.api';

@Injectable({ providedIn: 'root' })
export class TimerService {

    constructor(
        private timerApi: TimerApi,
        private timeNoteApi: TimeNoteApi,
        private profileState: ProfileState
    ) { }

    getCurrentTimeNote(): Observable<any> {
        let query = {
            field: Field.UID,
            operator: '==',
            value: this.profileState.getUidSync()
        }
		return this.timeNoteApi.getCurrentTimeNote(query)
	}

    setTimeNote(note: any) {
		return this.timerApi.setTimeNote(note)
	}

    getAllTimeNotes() {
        let query = { field: Field.UID, operator: '==', value: this.profileState.getUidSync() }
        return this.timerApi.getAllTimeNotes(query)
    }

    computeHours(timeNote: any) {
        let result = Math.ceil((timeNote.s2 - timeNote.e1) - 2)
        return result ? result : 0
        // let dates: any[] = []
        // entries.forEach(entry => dates.push(new Date(entry * 1000)))
        
        // if (dates.length == 1) {
        //     return 0;
        // }
        // else {
        //     var diff = (dates[0].getTime() - dates[1].getTime()) / 1000;
        //     diff /= (60 * 60);
            
        //     return Math.abs(Math.round(diff));
        // }
    }
}
