import { Component, OnInit, ViewChild  } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { CalendarService } from './calendar.service';
import {Observable, Subject} from "rxjs/Rx";
import * as moment from 'moment';
import {Event} from './model/event';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';  
import {tap} from 'rxjs/operators';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class MyCalendarComponent implements OnInit {
  calendarOptions: Options;
  event: Event;
  displayEvent: any;
  dateEvent: string;
  events:Event[];
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private calendarservice: CalendarService) { }

  ngOnInit() {
   const that = this;
   that.calendarservice.searchAllEvents().pipe(
    tap(console.log)).subscribe(
        events => that.events = events
    ); 
  

   
    this.calendarservice.getEvents().subscribe(data => {
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        monthNames:['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień','Październik','Listopad', 'Grudzień'],
        monthNamesShort:['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
        dayNames:['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
        dayNamesShort:['Nie', 'Pon', 'Wto', 'Śro', 'Czw', 'Pią', "Sob"],
        buttonText: {
        today: 'dziś',
        month: 'miesiąc',
        week: 'tydzień',
        day: 'dzień',
        list: 'lista'
        },
        allDayText:'cały dzień',
        timeFormat: 'HH:mm',
        
        header: {
          left: 'prev,next,today,addEventButton',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
    
        
        events:  that.events,
        
  
        customButtons: {
          addEventButton: {
            text: 'Dodaj wizytę',
            click: function() {
              that.createEvent();
           
            }
          }
        }
      };
    });
   
  
  }
  createEvent(){
    var dateStr = prompt('Wpisz datę wizyty w formacie: YYYY-MM-DD');
              var titleStr = prompt('Wpisz tytuł wydarzenia');
              var time = prompt('Wprowadź czas wizyty:');
              var date = moment(dateStr);

              if (date.isValid()) {
                console.log(dateStr);
                var start = dateStr+'T'+time;
                var end = dateStr+'T'+time;
                this.event=new Event('dfgdsg', titleStr, start, end);
               console.log(this.event);
                  alert('Dobrze, teraz aktualizuję baze danych...');
                  this.calendarservice.createNewEvent(this.event);
                } else {
                  alert('Nieprawidłowa data');


  }
}
  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
      },
      duration: {}
    }
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }
  dayClick(model: any) {
    var date = model.date.toDate();
    var dateStr = moment(model.date.toDate()).format('YYYY-mm-DD').toString();
    var titleStr = prompt('Wpisz tytuł wydarzenia');
    var time = prompt('Wprowadź czas wizyty:');
   
      console.log(dateStr);
      var start = dateStr+'T'+time;
      var end = dateStr+'T'+time;
      this.event=new Event('dfgdsg', titleStr, start, end);
     console.log(this.event);
        alert('Dobrze, teraz aktualizuję baze danych...');
        this.calendarservice.createNewEvent(this.event);

      console.log(date);


  }
}
