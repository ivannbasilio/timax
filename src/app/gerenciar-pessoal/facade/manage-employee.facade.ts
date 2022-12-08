import { Injectable, Injector } from '@angular/core';
import { ManageEmployeeService } from '../service/manage-employee.service';

@Injectable({ providedIn: 'root' })
export class ManageEmployeeFacade {

    constructor(private injector: Injector) { }

    private _manageEmployeeService: ManageEmployeeService | undefined;
    public get manageEmployeeService(): ManageEmployeeService {
        if(!this._manageEmployeeService){
        this._manageEmployeeService = this.injector.get(ManageEmployeeService);
        }
        return this._manageEmployeeService;
    }

    getAllEmployees() {
        return this.manageEmployeeService.getAllEmployees()
    }
}
