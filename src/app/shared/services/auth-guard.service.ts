import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DataService } from './shared-data.service';


@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private _router: Router, private dataService: DataService) { }

    canActivate(): boolean {
        if (this.dataService.getToken() === undefined) {
            this._router.navigate(['/login']);
            return false;
        }
        return true;
    }
}