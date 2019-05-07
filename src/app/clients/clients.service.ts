
import {mergeMap, filter, map, switchMap, tap} from 'rxjs/operators';
import {Injectable, Inject} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable, Subject} from 'rxjs/Rx';
import {Client} from './model/client';
import {FirebaseApp} from 'angularfire2';
import {firebaseConfig} from '../../environments/firebase.config';
import {Http} from '@angular/http';
import {FirebaseListFactoryOpts} from 'angularfire2/interfaces';

@Injectable()
export class ClientsService {
    newclientId: any;
    sdkDb: any;
    constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp,
    private http: Http) {
    this.sdkDb = fb.database().ref('clients/');

}

searchAllClients(): Observable<Client[]> {
        return this.db.list('clients',{
            query: {
                orderByChild: 'lname'
            }  
        }).pipe(map(Client.fromJsonArray));
    }


searchClientById(clientId:string):Observable<Client> {
        return this.db.object(`clients/${clientId}`)
        .map(Client.fromJson);
    }

firebaseUpdate(dataToSave) {
    const subject = new Subject();

    this.sdkDb.update(dataToSave)
        .then(
            val => {
                subject.next(val);
                subject.complete();


            },
            err => {
                subject.error(err);
                subject.complete();
            }
        );


    return subject.asObservable();
}

saveClient(clientId: string, client): Observable<any> {

    const clientToSave = Object.assign({}, client);
    delete(clientToSave.$key);

    let dataToSave = {};

    dataToSave[`${clientId}`] = clientToSave;
      return this.firebaseUpdate(dataToSave);

}

deleteClient(clientId: string) {
    const toDel = this.db.object(`clients/${clientId}`);
    toDel.remove();  
    
  }
createNewClient(client:any): Observable<any> {

    const clientToSave = Object.assign({}, client);

    const newClientKey = this.sdkDb.push().key;
   
    let dataToSave = {};

    dataToSave[ newClientKey] = clientToSave;
      return this.firebaseUpdate(dataToSave);
  }
}
