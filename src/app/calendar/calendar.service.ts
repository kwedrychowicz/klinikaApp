import {switchMap, filter, map, tap} from 'rxjs/operators';
import {Injectable, Inject} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import {Event} from './model/event';
import {AngularFireDatabase} from "angularfire2/database";
import {FirebaseApp} from 'angularfire2';
import {Http} from "@angular/http";
import {firebaseConfig} from "../../environments/firebase.config";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
    sdkDb:any;
    events: Event[];
    
    constructor(private db:AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp,
    private http:Http) {

    this.sdkDb = fb.database().ref('events/');

}
searchAllEvents(): Observable<Event[]> {
    return this.db.list('events',{
        query: {
            orderByChild: 'date'
           

        }  
    }).pipe(map(Event.fromJsonArray));
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

createNewEvent(event:Event): Observable<any> {

    const eventToSave = Object.assign({}, event);
    delete(eventToSave.$key);
    const newEventKey = this.sdkDb.push().key;

    let dataToSave = {};
    dataToSave[newEventKey] = eventToSave;

    return this.firebaseUpdate(dataToSave);
}
saveEvent(EventId:string, Event): Observable<any> {

    const eventToSave = Object.assign({}, Event);
    delete(eventToSave.$key);

    let dataToSave = {};
    dataToSave[`events/ ${EventId}`] = eventToSave;

    return this.firebaseUpdate(dataToSave);
}

public getEvents(): Observable<any> {
    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    let data: any;
    data =   this.searchAllEvents(); 

    return Observable.of(this.events);
}
  
};
