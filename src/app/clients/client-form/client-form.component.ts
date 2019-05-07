import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {Client} from '../model/client';
import {Observable} from 'rxjs/Rx';
import {tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientsService} from '../clients.service';
import * as firebase from 'firebase/app';
import * as _ from 'lodash';
import { AngularFireDatabase } from 'angularfire2/database';
import {AuthService} from '../../shared/security/auth.service';
import {AuthInfo} from '../../shared/security/auth-info';
@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit  {
  client$: Observable<Client>;
  form: FormGroup;
  clientId: string;
  client: Client; 
  url: string;
  @Input()
  authInfo: AuthInfo;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private ClientsService: ClientsService,
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
      route.data.pipe(
        tap(console.log))
        .subscribe(
        data => this.client = data['pclient']
      );
    }
  ngOnInit() {
    window.scroll(0,0);
    this.clientId = this.route.snapshot.params['id2'];

    this.client$ = this.ClientsService.searchClientById(this.clientId);
  console.log(this.client);
    
    this.form.patchValue({
      $exists: function () {},
      lname: this.client.lname,
      fname: this.client.fname,
      sname: this.client.sname,
      street: this.client.street,
      city: this.client.city,
      postalcode: this.client.postalcode,
      sex: this.client.sex,
      birthdate: this.client.birthdate,
      pesel: this.client.pesel,
      phone:this.client.phone


    });
this.url = "/client-search/" + this.clientId;
  }
save() {
  const dataToSave = this.form.value;
  this.ClientsService.saveClient(this.client.$key, dataToSave)
      .subscribe(
          () => {
              alert("Save");
          },
          err => alert(`Error: ${err}`)
      );
}}