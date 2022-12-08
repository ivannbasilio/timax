import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileState {

    private _uid$ = new BehaviorSubject<string>('')
    private _profileSelcted$ = new BehaviorSubject<any>(null)

    constructor() { }

    set uid(uid: any) {
        this._uid$.next(uid)
    }

    get uid$() {
        return this._uid$.asObservable()
    }

    getUidSync() {
        return this._uid$.getValue()
    }

    set profileSelected(profile: any) {
        this._profileSelcted$.next(profile)
    }

    get profileSelected$() {
        return this._profileSelcted$.asObservable()
    }
}
