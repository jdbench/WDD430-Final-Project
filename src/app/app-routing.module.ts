import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventComponent } from './event/event.component';
import { EditComponent as EventEditComponent } from './event/edit/edit.component';
import { EditComponent as UserEditComponent } from './pages/user/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: "profile", pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserComponent, children: [
      {
        path: 'edit',
        component: UserEditComponent
      }
    ] 
  },
  { path: 'event', component: EventComponent, children: [
      {
        path: 'edit',
        component: EventEditComponent
      }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
