import { OnInit, Component } from '@angular/core';
import { ProfileState } from './profile/state/profile.state';
import { ProfileFacade } from './profile/facade/profile.facade';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'ajaxtimer';

    profile$: Observable<any> | undefined

    constructor(
        private profileFacade: ProfileFacade,
        private profileState: ProfileState
    ) { }

    ngOnInit() {
        this.profileState.uid = 'RbFu91RXapyCmXDki2IMGoK7b58nkDkc' // Mock p/ o uid
        this.profile$ = this.profileFacade.getProfile()
    }
}
