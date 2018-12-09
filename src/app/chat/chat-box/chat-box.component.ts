import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/socket.service';

import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],

  providers:[SocketService]
})
export class ChatBoxComponent implements OnInit {

  public authToken: any;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public userList: any = [];
  public disconnectedSocket: boolean;

  constructor(public AppService: AppService,
    public SocketService: SocketService,
    public router: Router,
    ) {

      this.receiverId = Cookie.get('receiverId');

      this.receiverName = Cookie.get('receiverName');
     }

  ngOnInit() {
    
  this.authToken = Cookie.get('authtoken');

  this.userInfo = this.AppService.getUserInfofromLocalStorage();

  this.checkStatus();

  this.verifyUserConfirmation();

  this.getOnlineUserList()


  }

  public checkStatus: any = () => {

    if (Cookie.get('authtoken') === undefined || Cookie.get('authtoken') === '' || Cookie.get('authtoken') === null) {

      this.router.navigate(['/']);

      return false;

    } else {

      return true;

    }

  } // end checkStatus

  public verifyUserConfirmation: any = () => {

    this.SocketService.verifyUser()
      .subscribe((data) => {

        this.disconnectedSocket = false;

        this.SocketService.setUser(this.authToken);
        this.getOnlineUserList();

      });
    }
    public getOnlineUserList :any =()=>{

      this.SocketService.onlineUserList()
        .subscribe((userList) => {
  
          this.userList = [];
  
          for (let x in userList) {
  
            let temp = { 'userId': x, 'name': userList[x], 'unread': 0, 'chatting': false };
  
            this.userList.push(temp);          
  
          }
          
          console.log(this.userList);
  
        }); // end online-user-list
    }  
  
}
