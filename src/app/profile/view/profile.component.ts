import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { TimeNoteFacade } from '../../timenote/facade/time-note.facade';
import { Observable } from 'rxjs';
import { ProfileFacade } from '../facade/profile.facade';
import { Router } from '@angular/router';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
    timeNotes$: Observable<any> | undefined
    profile$: Observable<any> | undefined
    paychecks$: Observable<any> | undefined
    
    @Input() isEditMode: boolean = false
    @Input() isAdminstratorMode: boolean = false

    constructor(
        private timeNoteFacade: TimeNoteFacade,
        private profileFacade: ProfileFacade
    ) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.timeNotes$ = this.timeNoteFacade.getWeekTimeNotes()
        this.paychecks$ = this.profileFacade.getAllPaycheck()

        if (!this.isEditMode) {
            this.profile$ = this.profileFacade.getProfile()
        }
        else {
            this.profile$ = this.profileFacade.getProfileSelected$()
        }
    }

    public getDayName(date: Date) {
        return date.toLocaleDateString('pt-BR', { weekday: 'long' });        
    }

    public download(link: string) {
        window.open(link)
    }
}
