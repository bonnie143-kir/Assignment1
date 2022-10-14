import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { GroupAdminComponent } from './group-admin/group-admin.component';
import { GroupAssistComponent } from './group-assist/group-assist.component';
import { HomeComponent } from './home/home.component';
import { NormalUserComponent } from './normal-user/normal-user.component';
import { ChatComponent } from './chat/chat.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { AddUsersGroupComponent } from './add-users-group/add-users-group.component';
import { UserpageComponent } from './userpage/userpage.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'user', component: UserComponent},

  {path: 'groups/:id', component: UserpageComponent},

  {path: 'groups/:id', component: NormalUserComponent},
  {path: 'super-admin', component: SuperAdminComponent},
  {path: 'group-admin', component: GroupAdminComponent},
  {path: 'group-assist', component: GroupAssistComponent},
  {path: 'normalUser', component:NormalUserComponent},
  {path: 'chat', component:ChatComponent},
  {path: 'create-group', component:CreateGroupComponent},
  {path: 'add-users-group', component:AddUsersGroupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
