import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ManageEmployeeFacade } from '../facade/manage-employee.facade';
import { ProfileFacade } from '../../profile/facade/profile.facade';

@Component({
    selector: 'app-gerenciar-pessoal',
    templateUrl: './manage-employee.component.html',
    styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit, OnDestroy {
    employees$: Observable<any[]> | undefined
    
    constructor(
        private manageEmployeeFacade: ManageEmployeeFacade,
        private profileFacade: ProfileFacade
    ) { }
    
    ngOnInit() {
        this.employees$ = this.manageEmployeeFacade.getAllEmployees()
    }

    selectProfile(profile: any) {
        this.profileFacade.setProfileSelected(profile)
    }

    ngOnDestroy() {
        this.profileFacade.setProfileSelected(null)
    }
}
