import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
import { Endpoints } from 'src/collection.constants';
import { Field } from 'src/field.constants';

@Injectable({ providedIn: 'root' })
export class AdjustmentsApi {

    constructor(private firestore: AngularFirestore) { }

    /**
     * Salva um novo ajuste no banco
     * 
     * @param {any} adjustment - Objeto que representa o ajuste
     */
    setAdjustments(adjustment: any) {
        let promise = this.firestore.collection(Endpoints.ADJUSTMENTS)
        .doc()
        .set(adjustment)
    
        return from(promise)
    }

    /**
     * Atualiza um ajuste no banco
     * 
     * @param {any} adjustment - Objeto que representa o ajuste
     */
     updateAdjustments(id: string, data: any) {
        let promise = this.firestore.collection(Endpoints.ADJUSTMENTS)
        .doc(id)
        .update(data)
    
        return from(promise)
    }

    /**
     * Carrega todos os ajustes do usuário
     * 
     * @param {string} uid - O id do usuário logado
     */
    getAllUserAdjustments(uid: string): Observable<any> {
        let promise = this.firestore.collection(
                Endpoints.ADJUSTMENTS, 
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

    /**
     * Retorna todos os ajustes
     * 
     * Quase certo que em uma aplicação real, esse método deve estar
     * sobre o roles, afinal apenas administradores podem ter esse poder.
     * 
     */
    getAllAdjustments(): Observable<any> {
        let promise = this.firestore.collection(
                Endpoints.ADJUSTMENTS, 
                ref => ref.where(Field.STATUS, '==', 0))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(entry => {
                        let data = {
                            id: entry.payload.doc.id,
                            data: entry.payload.doc.data()
                        }
                        return data;
                    });
                })
            )
        return from(promise)
    }
}
