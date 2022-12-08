import { Injectable, Injector } from '@angular/core';
import { ProfileService } from '../service/profile.service';

@Injectable({ providedIn: 'root' })
export class ProfileFacade {

    constructor(private injector: Injector) { }

    private _profileService: ProfileService | undefined;
    public get profileService(): ProfileService {
        if(!this._profileService){
        this._profileService = this.injector.get(ProfileService);
        }
        return this._profileService;
    }

    getProfile() {
        return this.profileService.getProfile()
    }

    getAllPaycheck() {
        return this.profileService.getAllPaycheck()
    }

    setProfileSelected(profile: any) {
        this.profileService.setProfileSelected(profile)
    }

    getProfileSelected$() {
        return this.profileService.getProfileSelected$()
    }
}
