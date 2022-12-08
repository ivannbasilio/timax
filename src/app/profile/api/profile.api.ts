import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map, BehaviorSubject } from 'rxjs';
import { Endpoints } from '../../../collection.constants';
import { Field } from '../../../field.constants';

@Injectable({ providedIn: 'root' })
export class ProfileApi {

    constructor(private firestore: AngularFirestore) { }

    getProfile(uid: string): Observable<any> {
        let promise = this.firestore.collection(Endpoints.PROFILES)
            .doc(uid)
            .snapshotChanges()
            .pipe(
                map(snapshot => snapshot.payload.data())
            )
        return from(promise)
    }

    getAllPaycheck(uid: string): Observable<any> {
        let promise = this.firestore.collection(
                Endpoints.PAYCHECKS, 
                ref => ref.where(Field.UID, '==', uid))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(entry => {
                        const data = entry.payload.doc.data()
                        return data;
                    });
                })
            )
        return from(promise)
    }
}
