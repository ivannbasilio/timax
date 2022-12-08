import { Injectable } from '@angular/core';
import { ProfileApi } from '../api/profile.api';
import { ProfileState } from '../state/profile.state';

@Injectable({ providedIn: 'root' })
export class ProfileService {

    constructor(
        private profileApi: ProfileApi,
        private profileState: ProfileState
    ) { }

    getProfile() {
        return this.profileApi.getProfile(
            this.profileState.getUidSync()
        )
    }

    getAllPaycheck() {
        return this.profileApi.getAllPaycheck(
            this.profileState.getUidSync()
        )
    }

    setProfileSelected(profile: any) {
        this.profileState.profileSelected = profile
    }

    getProfileSelected$() {
        return this.profileState.profileSelected$
    }
}
