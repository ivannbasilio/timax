import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
import { Endpoints } from 'src/collection.constants';

@Injectable({ providedIn: 'root' })
export class ManageEmployeeApi {

    constructor(private firestore: AngularFirestore) { }

    /**
     * Retorna todos os ajustes
     * 
     * Quase certo que em uma aplicação real, esse método deve estar
     * sobre o roles, afinal apenas administradores podem ter esse poder.
     */
    getAllEmployees(): Observable<any> {
        let promise = this.firestore.collection(Endpoints.PROFILES)
            .snapshotChanges()
            .pipe(
                map(actions => {
                    console.log(actions)
                    return actions.map(entry => {
                        return {
                            id: entry.payload.doc.id,
                            data: entry.payload.doc.data()
                        }
                    })
                })
            )
        return from(promise)
    }
}
