
import {AuthGuard} from './shared/security/auth.guard';
import {Route} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {MyCalendarComponent } from "./calendar/mycalendar.component";
import {NewPasswordComponent} from './new-password/new-password.component';
import {ClientResolver} from './clients/client.resolver';
import {ClientsListComponent} from './clients/clients-list/clients-list.component';
import {NewClientComponent} from './clients/new-client/new-client.component';
import {ClientFormComponent} from './clients/client-form/client-form.component';
import {ClientDetailComponent} from './clients/client-detail/client-detail.component';

export const routerConfig : Route[] = [
    {
        path:'home',
        component: HomeComponent
    },
    {
        path:'calendar',
        component: MyCalendarComponent
    },
    {
        path: 'client-detail/:id',
        children: [

            {
                path: '',
                component: ClientDetailComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id2',
                children: [

                    {
                        path: '',
                        component: ClientFormComponent,
                        canActivate: [AuthGuard],
                        resolve: {
                            pclient: ClientResolver
                          }
                    }
                ]
            }

        ]
      },
      {
        path: 'clients/:id',
        children: [

            {
                path: '',
                component: ClientDetailComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id2',
                children: [

                    {
                        path: '',
                        component: ClientFormComponent,
                        canActivate: [AuthGuard],
                        resolve: {
                            pclient: ClientResolver
                          }
                    }
                ]
            }

        ]
      },
    {
        path: 'clients',
        component: ClientsListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'newclient',
        component: NewClientComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'new-password',
        component: NewPasswordComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
    
];





