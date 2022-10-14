import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket:any;
  constructor() {this.socket = io(SERVER_URL); }

  joinRoom(data:any) {
    this.socket.emit('join', data);
  }
  newUserJoined() {
    const observable = new Observable<{user: string, message: string, time: string}>(observer => {
      this.socket.on('new user joined', (data:any) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();
      };
    });
    return observable;
  }
  leaveRoom(data:any) {
    this.socket.emit('leave', data);
  }
  userLeftRoom() {
    const observable = new Observable<{user: string, message: string, time: string}>(observer => {
      this.socket.on('left room', (data:any) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();
      };
    });
    return observable;
  }

  sendMessage(data:any) {
    this.socket.emit('message', data);
  }
  newMessageReceived() {
    const observable = new Observable<{user: string, message: string, time: string}>(observer => {
      this.socket.on('new message', (data:any) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();
      };
    });
    return observable;
  }
  typing(data:any) {
    this.socket.emit('typing', data);
  }
  userTyping() {
    const observable = new Observable<{user: string, message: string}>(observer => {
      this.socket.on('user typing', (data:any) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();
      };
    });
    return observable;
  }

  allChat() {
    const observable = new Observable<any>(observer => {
      this.socket.on('chat history', (data:any) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();
      };
    });
    return observable;
  }

  // New user online
  newUser(data:any) {
    this.socket.emit('new user', data);
  }
  allOnlineUsers() {
    const observable = new Observable<any>(observer => {
      this.socket.on('usernames', (data:any) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();
      };
    });
    return observable;
  }
  
  send(message:string){
    this.socket.emit('message', message);
  }

  getMessage(){
    return new Observable(observer=>{
      this.socket.on('message', (data:any)=> {observer.next(data)});
    });
  }


}
