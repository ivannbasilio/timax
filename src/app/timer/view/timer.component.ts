import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { TimerFacade } from '../facade/timer.facade';
import { map, Observable, share, Subscription, timer, take } from 'rxjs';
import { ProfileFacade } from '../../profile/facade/profile.facade';
import { TimeNoteFacade } from '../../timenote/facade/time-note.facade';
import { serverTimestamp, arrayUnion } from '@angular/fire/firestore';
import { TimeNote } from '../../models/time-note';

@Component({
    selector: 'timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, AfterViewInit, OnDestroy {

    timeNotes$: Observable<any[]> | undefined
    profile$: Observable<any> | undefined
    date: Date = new Date();
    currentTimeNote: any

    time = new Date();
    rxTime = new Date();
    intervalId: any;
    subscription: Subscription | undefined;
    total: number = 0

    months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
    'Outubro', 'Novembro', 'Dezembro']
  
    constructor(
        private timerFacade: TimerFacade,
        private timeNote: TimeNoteFacade,
        private profileFacade: ProfileFacade
    ) { }

    ngOnInit() {
        this.createTimer()
    }

    ngAfterViewInit() {
        this.profile$ = this.profileFacade.getProfile()
        this.timeNotes$ = this.timerFacade.getAllTimeNotes()
        this.timerFacade.getCurrentTimeNote().subscribe(data => this.currentTimeNote = data[0])
    }

    public createTimer() {
        this.subscription = timer(0, 1000)
            .pipe(
            map(() => new Date()),
                share()
            )
            .subscribe(time => {
            this.rxTime = time;
            });
    }

    public getDayFormatted() {
        let today = new Date()
        let dayNameLong = today.toLocaleDateString('pt-BR', { weekday: 'long' })
        let dayInMonth = today.getDate()
        let month = this.months[today.getMonth()]

        return `${dayNameLong}, ${dayInMonth} de ${month}`;        
    }

    getDayName() {
        let today = new Date()
        let dayName = today.toLocaleDateString('pt-BR', { weekday: 'long' })

        dayName.split('-')[0]
        dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

        return dayName
    }

    computeHours(timeNote: any) {
        return this.timerFacade.computeHours(timeNote)
    }

    computeTotal() {
        
    }

    public markTimeNote() {
        let now = new Date()

        if (this.currentTimeNote && !this.currentTimeNote.s2) { 
            this.timeNote.updateTimeNote({
                id: this.currentTimeNote.id,
                s2: parseFloat(`${now.getHours()}.${now.getMinutes()}`)
            })
            console.log('update')
        }
        else {
            let now = new Date()
            this.timeNote.setTimeNote({
                dayName: this.getDayName(),
                e1: parseFloat(`${now.getHours()}.${now.getMinutes()}`),
                s1: 12,
                e2: 13,
                created: serverTimestamp()
            })
            console.log('set')
        }
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
