import { Injectable } from '@angular/core';
import { TimeNoteFacade } from '../facade/time-note.facade';
import { TimeNoteApi } from '../api/time-note.api';
import { Field } from '../../../field.constants';
import { ProfileState } from '../../profile/state/profile.state';

@Injectable({ providedIn: 'root' })
export class TimeNoteService {

    constructor(
        private timeNoteApi: TimeNoteApi,
        private profileState: ProfileState
    ) { }

    getCurrentTimeNote() {
        let query = {
            field: Field.UID,
            operator: '==',
            value: this.profileState.getUidSync()
        }
		return this.timeNoteApi.getCurrentTimeNote(query)
	}

    setTimeNote(note: any) {
        note['uid'] = this.profileState.getUidSync()
		return this.timeNoteApi.setTimeNote(note)
	}

    updateTimeNote(note: any) {
        note['uid'] = this.profileState.getUidSync()
		return this.timeNoteApi.updateTimeNote(note)
	}

    getAllTimeNotes(query: any) {
        return this.timeNoteApi.getAllTimeNotes(query)
    }

    getWeekTimeNotes() {
        const today = new Date();

        const first = today.getDate() - today.getDay() + 1;
        const last  = today.getDate() - today.getDay() + 5;

        const monday = new Date(today.setDate(first));
        const friday = new Date(today.setDate(last));
      
        monday.setHours(0, 0, 0, 0)
        friday.setHours(23, 59, 59, 59)

        let query: any[] = []
        query.push({ field: Field.CREATED, operator: '>=' , value: monday })
        query.push({ field: Field.CREATED, operator: '<=' , value: friday })
        query.push({ field: Field.UID    , operator: '==', value: this.profileState.getUidSync()    })

        return this.timeNoteApi.getWeekTimeNotes(query)
    }
}
