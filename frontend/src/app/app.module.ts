import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { GroupAdminComponent } from './group-admin/group-admin.component';
import { GroupAssistComponent } from './group-assist/group-assist.component';
import { HomeComponent } from './home/home.component';
import { NormalUserComponent } from './normal-user/normal-user.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    SuperAdminComponent,
    GroupAdminComponent,
    GroupAssistComponent,
    HomeComponent,
    NormalUserComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
