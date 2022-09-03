import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { GroupAdminComponent } from './group-admin/group-admin.component';
import { GroupAssistComponent } from './group-assist/group-assist.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UserComponent},
  {path: 'super-admin', component: SuperAdminComponent},
  {path: 'group-admin', component: GroupAdminComponent},
  {path: 'group-assist', component: GroupAssistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
