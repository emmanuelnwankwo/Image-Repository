import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

    constructor() { }


    public persistToken(token: string): void {
        sessionStorage.setItem('_sjkskkl23sd_', token);
    }

    public removePersitedData(key: string): void {
        window.sessionStorage.removeItem(key);
    }

    private removePersistedData(key: string) {
        return sessionStorage.removeItem(key);
    }

    public getToken(): string {
        return sessionStorage.getItem('_sjkskkl23sd_');
    }

   public removeToken(): void {
        sessionStorage.removeItem('_sjkskkl23sd_');
    }

}
