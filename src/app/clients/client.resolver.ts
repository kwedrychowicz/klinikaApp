import {first} from 'rxjs/operators';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Client} from './model/client';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {ClientsService} from './clients.service';

@Injectable()
export class ClientResolver implements Resolve<Client> {


    constructor(private clientsService: ClientsService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Client> {

        return this.clientsService
            .searchClientById(route.params['id']).pipe(
            first());
    }

}
