import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

//inject the class into the app
@Injectable({
    providedIn: 'root'
})
export class NotificationClass {
    constructor(
        private toastr: ToastrService
        ) { }

    showSuccess() {
        this.toastr.success("L'opération a réussi.", 'Succès !');
    }

    showError() {
        this.toastr.error("L'opération a échoué.",'Echec !');
    }

}