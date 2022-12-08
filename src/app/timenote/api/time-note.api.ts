import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
import { TimeNote } from 'src/app/models/time-note';
import { Endpoints } from 'src/collection.constants';

@Injectable({ providedIn: 'root' })
export class TimeNoteApi {

    constructor(private firestore: AngularFirestore) { }

    getCurrentTimeNote(query: any): Observable<any> {
		let promise = this.firestore
            .collection(Endpoints.TIMER_NOTES, ref => ref.where(query.field, query.operator, query.value).orderBy('created', 'desc').limit(1))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(entry => {
                        const data = entry.payload.doc.data() as TimeNote;
                        data.id = entry.payload.doc.id;
                        console.log(data.id)
                        return data;
                    });
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

    updateTimeNote(note: any): Observable<void> {
        console.log('upd',note.id)
		let promiss = this.firestore
			.collection(Endpoints.TIMER_NOTES)
			.doc(note.id)
			.update(note)

		return from(promiss)
	}

    getAllTimeNotes(query: any): Observable<any> {
        let promise = this.firestore
            .collection(Endpoints.TIMER_NOTES, ref => ref.where(query.field, query.op, query.value))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(entry => {
                        const data = entry.payload.doc.data() as TimeNote;
                        data.id = entry.payload.doc.id;
                        return data;
                    });
                })
            )

        return from(promise)
    }

    getWeekTimeNotes(query: any): Observable<any> {
        let promise = this.firestore
            .collection(Endpoints.TIMER_NOTES, ref => 
                ref.where(query[0].field, query[0].operator, query[0].value)
                    .where(query[1].field, query[1].operator, query[1].value)
                    .where(query[2].field, query[2].operator, query[2].value ))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(entry => {
                        const data = entry.payload.doc.data() as TimeNote;
                        data.id = entry.payload.doc.id;
                        return data;
                    });
                })
            )
        return from(promise)
    }
}
