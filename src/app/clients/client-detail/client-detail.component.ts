import {Component, OnInit, OnDestroy, EventEmitter, Input, Output} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientsService} from '../clients.service';
import {Client} from '../model/client';
import {Observable} from 'rxjs/Rx';
import {AuthService} from '../../shared/security/auth.service';
import {AuthInfo} from '../../shared/security/auth-info';

import * as _ from 'lodash';
import { browser } from 'protractor';


@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})

export class ClientDetailComponent implements OnInit {

 
  client$: Observable<Client>;
  clientId: string;
  showHide=true;
  date = new Date();
  
  @Output()
  clientEmitter = new EventEmitter<Client>();
    
  authInfo: AuthInfo;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private clientsService: ClientsService) {

    }

ngOnInit() {
    window.scroll(0,0);
    this.clientId = this.route.snapshot.params['id'];
     
    this.client$ = this.clientsService.searchClientById(this.clientId);

    this.myEmit(this.client$);
  }

myEmit(event) {

    this.clientEmitter.emit(event);
  }
showPanel(){
    this.showHide = !this.showHide;
  }

deleteClient(){
    this.clientsService.deleteClient(this.clientId,);
    this.router.navigate(['/clients',this.clientId]);
  
  }  

sex(val: string){
    if(val=="m"){

    return true;
  }
  else
  return false;
}
}
  
  












