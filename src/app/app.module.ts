import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/view/timer.component';
import { TimeNoteComponent } from './timenote/view/time-note.component';
import { AppRoutingModule } from './app-routing.module';
import { AdjustmentsComponent } from './adjustments/view/adjustments.component';
import { ProfileComponent } from './profile/view/profile.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { environment } from 'src/environments/environment';
import { SimpleModalModule } from 'ngx-simple-modal';
import { ModalComponent } from './ui/modal/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ManageAdjustmentsComponent } from './gerenciar-ajustes/view/manage-adjustments.component';
import { ManageEmployeeComponent } from './gerenciar-pessoal/view/manage-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TimeNoteComponent,
    AdjustmentsComponent,
    ProfileComponent,
    ModalComponent,
    ManageAdjustmentsComponent,
    ManageEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    SimpleModalModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
