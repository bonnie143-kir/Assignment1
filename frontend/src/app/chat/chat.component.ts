import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messagecontent:string="";
  messages: string[] = [];
  ioConnection:any;

  constructor(private socketService: SocketService, private router: Router) { }

  ngOnInit(){ this.initIoConnection()
  }

  private initIoConnection(){
    this.socketService.getMessage().subscribe((m:any)=>{
      this.messages.push(m)
    });
  }

  chat(){
    if(this.messagecontent){
      this.socketService.send(this.messagecontent);
      this.messagecontent = '';
    }else{
      console.log("No message");
    }
  }



}

