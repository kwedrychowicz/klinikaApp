import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, MinLengthValidator  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import { ClientsService } from '../clients.service';
import { Client } from '../model/client';
import {AuthService} from '../../shared/security/auth.service';
import {AuthInfo} from '../../shared/security/auth-info';


@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit  {
  client$: Observable<Client>;
  form: FormGroup;  
  clientId: string;
  client: Client;
  newClient: Observable<Client>;
  authInfo: AuthInfo;
  @Input()
  initialValue: any;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private clientsService: ClientsService,
    private db: AngularFireDatabase,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        lname: ['', [Validators.required, Validators.minLength(2)]],
        fname: ['', [Validators.required, Validators.minLength(2)]],
        sname: ['', [Validators.minLength(2)]],
        street: ['', [Validators.required, Validators.minLength(5)]],
        city: ['', [Validators.required, Validators.minLength(3)]],
        postalcode: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]+-[0-9]{2,3}$')]],
        sex:['', [Validators.required]],
        birthdate:[''],
        pesel:[''],
        phone:['']

      });

   }


  ngOnInit() {
    window.scroll(0,0);

}

save() {    
  const dataToSave = this.form.value;
  this.clientsService.createNewClient(dataToSave)
      .subscribe(
          () => {
              alert('Zapisano zmiany');
          },
          err => alert(`Błąd: ${err}`)
        );

}}
