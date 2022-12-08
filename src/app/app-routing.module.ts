import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerComponent } from './timer/view/timer.component';
import { ProfileComponent } from './profile/view/profile.component';
import { AdjustmentsComponent} from './adjustments/view/adjustments.component';
import { ManageAdjustmentsComponent } from './gerenciar-ajustes/view/manage-adjustments.component';
import { ManageEmployeeComponent } from './gerenciar-pessoal/view/manage-employee.component';

const routes: Routes = [
    { path: '', redirectTo: '/relogio', pathMatch: 'full' },
    { path: 'perfil', component: ProfileComponent },
    { path: 'relogio', component: TimerComponent },
    { path: 'ajustes', component: AdjustmentsComponent },
    { path: 'gerenciar-ajustes', component: ManageAdjustmentsComponent },
    { path: 'gerenciar-pessoal', component: ManageEmployeeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }