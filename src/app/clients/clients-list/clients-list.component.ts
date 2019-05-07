import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {ClientsService} from '../clients.service';
import {Observable} from 'rxjs/Rx';
import {Client} from '../model/Client';
import {NewClientComponent} from '../new-client/new-client.component'
import {tap} from 'rxjs/operators';
import {AuthService} from '../../shared/security/auth.service';
import {AuthInfo} from '../../shared/security/auth-info';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})

export class ClientsListComponent implements OnInit {
  @Input()
  clients: Client[];
  link: string;
  client:Client;

  @Output('client')
  clientEmitter = new EventEmitter<Client>();
  authInfo: AuthInfo;
  constructor(private authService:AuthService,
    private router: Router,
    private clientsService: ClientsService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    window.scroll(0,0);

    this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);
    this.clientsService.searchAllClients().pipe(
      tap(console.log)).subscribe(
          clients => this.clients = clients
      ); 
  }
  
  selectClient(client:Client) {
    
    this.clientEmitter.emit(client);
  }

  logout() {
        this.authService.logout();
  }


}
