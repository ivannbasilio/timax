import { Injectable } from '@angular/core';
import { ManageEmployeeApi } from '../api/manage-employee.api';

@Injectable({ providedIn: 'root' })
export class ManageEmployeeService {

    constructor(private manageEmployeeApi: ManageEmployeeApi) { }

    getAllEmployees() {
        return this.manageEmployeeApi.getAllEmployees()
    }
}
