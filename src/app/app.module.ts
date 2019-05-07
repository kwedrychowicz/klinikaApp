import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {firebaseConfig} from "../environments/firebase.config";
import {AngularFireModule} from "angularfire2";
import {HomeComponent} from './home/home.component';
import {CalendarService} from './calendar/calendar.service';
import {RouterModule} from "@angular/router";
import {routerConfig} from "./router.config";
import {TopMenuComponent} from './top-menu/top-menu.component';
import {SafeUrlPipe } from './shared/security/safe-url.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {NewPasswordComponent} from './new-password/new-password.component';
import {AuthService} from "./shared/security/auth.service";
import {AuthGuard} from "./shared/security/auth.guard";
import {HttpModule} from "@angular/http";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {MyCalendarComponent} from "./calendar/mycalendar.component";
import {FullCalendarModule} from 'ng-fullcalendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatTabsModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatInputModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSortModule, MatTableModule, MatToolbarModule } from "@angular/material";
import {ClientResolver} from './clients/client.resolver';
import {ClientsListComponent} from './clients/clients-list/clients-list.component';
import {ClientsService} from './clients/clients.service';
import {NewClientComponent} from './clients/new-client/new-client.component';
import {ClientFormComponent} from './clients/client-form/client-form.component';
import {ClientDetailComponent} from './clients/client-detail/client-detail.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopMenuComponent,
    SafeUrlPipe,
    LoginComponent,
    RegisterComponent,
    NewPasswordComponent,
    MyCalendarComponent,
    ClientsListComponent,
    NewClientComponent,
    ClientFormComponent,
    ClientDetailComponent
    
  ],
  imports: [
    BrowserModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      RouterModule.forRoot(routerConfig),
      ReactiveFormsModule,
      HttpModule,
      FullCalendarModule,
      MaterialModule,
      MatMenuModule,
      MatTooltipModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      MatTabsModule,
      MatDialogModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatInputModule, 
      MatListModule, 
      MatPaginatorModule, 
      MatProgressSpinnerModule, 
      MatSelectModule, 
      MatSidenavModule,
      MatSortModule,
      MatTableModule,
      MatToolbarModule,
      TableModule,
      InputTextModule,
      DialogModule,
      ButtonModule
  ],
  providers: [AuthService, AuthGuard, CalendarService, ClientsService, ClientResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }


