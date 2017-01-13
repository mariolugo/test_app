import { Component, OnInit } from '@angular/core';
declare var io: any;

@Component({
  selector: 'app-real-time-user',
  templateUrl: './real-time-user.component.html',
  styleUrls: ['./real-time-user.component.css']
})
export class RealTimeUserComponent implements OnInit {
  info:any;
  sent:any = false;
  adminReceived:any = false;
  packageArrived:any = false;
  packageSent: any = false;
  infoSent:any = false;
  userHasPackage:any =false;
  constructor() { }

  ngOnInit() {
    io.socket.on('infoReceived',(data)=>{
      this.adminReceived = true;
      this.sent = false;
      console.log('info delivered to admin',data);
    })
    io.socket.on('packageSent',(data) =>{
      console.log(`package ${data.packageName} is on the way`);
      this.adminReceived = false;
      
      this.packageArrived = true;
    })
  }

  sendInfo(info){
    io.socket.request({
      method: 'POST',
      url: `/product/setPackageInfo`,
      data: {
        info: info,
      },
      headers: {
        'Authorization': 'JWT ' + window.localStorage.getItem('id_token')
      }
    }, (resData, jwres) => {
      this.sent = true;
      this.packageSent = true;
      console.log('resdata', resData);
      console.log('jwres', jwres)
    });
    this.infoSent = true;
  }

  confirmReceived(){
    io.socket.request({
      method: 'POST',
      url: `/product/userConfirm`,
      data: {
        received: true,
      },
      headers: {
        'Authorization': 'JWT ' + window.localStorage.getItem('id_token')
      }
    }, (resData, jwres) => {
      console.log('resdata', resData);
      console.log('jwres', jwres)
    });
    this.userHasPackage = true;
  }

}
