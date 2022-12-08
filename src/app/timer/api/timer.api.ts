import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
import { Endpoints } from '../../../collection.constants';
import { TimeNote } from '../../models/time-note';

@Injectable({ providedIn: 'root' })
export class TimerApi {

    constructor(private firestore: AngularFirestore) { }

    getCurrentTimeNote(uid: string, query: any): Observable<any> {
		let promise = this.firestore
            .collection(Endpoints.TIMER_NOTES, 
                ref => ref.where(query[0].field, query[0].operator, query[0].value)
                    .where(query[1].field, query[1].operator, query[1].value)
                    .where(query[2].field, query[2].operator, query[2].value))
            .snapshotChanges()
            .pipe(
                map(snapshots => {
                    return snapshots.map(entry => {
                        const data = entry.payload.doc.data() as TimeNote;
                        data.id = entry.payload.doc.id;
                        return data;
                    })[0];
                })
            )
		return from(promise)
	}

    setTimeNote(note: any): Observable<void> {
		let promiss = this.firestore
			.collection(Endpoints.TIMER_NOTES)
			.doc()
			.set(note);

		return from(promiss)
	}

    getAllTimeNotes(query: any): Observable<any> {
        let promiss = this.firestore
            .collection(Endpoints.TIMER_NOTES, ref => ref.where(query.field, query.operator, query.value))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(entry => {
                        const data = entry.payload.doc.data();
                        return data;
                    });
                })
            )

        return from(promiss)
    }
}
