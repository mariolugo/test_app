import { Component, OnInit } from '@angular/core';
declare var io: any;

@Component({
  selector: 'app-real-time-admin',
  templateUrl: './real-time-admin.component.html',
  styleUrls: ['./real-time-admin.component.css']
})
export class RealTimeAdminComponent implements OnInit {
  packageName:string;
  sent:any =false;
  adminReceived:any =false;
  packageArrived:any = false;
  packageReceived:any = false;
  packageReady:any =false;
  constructor() { }

  ngOnInit() {
    io.socket.on('newPackageInfo',(data)=>{
      this.adminReceived = true;
      this.packageName = data.info;
      this.packageArrived = false;
      console.log('info received',data);
    });
    io.socket.on('userConfirmed',(data) =>{
      console.log('user has received the package');
      this.packageArrived = true;
      this.sent = false;
      this.packageReady = false;
    })
    
  }

  sendInfo(info){
    io.socket.request({
      method: 'POST',
      url: `/comite/chat/${window.localStorage.getItem('comite_id')}`,
      data: {
        message: info,
      },
      headers: {
        'Authorization': 'JWT ' + window.localStorage.getItem('token')
      }
    }, (resData, jwres) => {
      console.log('resdata', resData);
      console.log('jwres', jwres)
    });
  }

  sendPackage(){
    io.socket.request({
      method: 'POST',
      url: `/product/sendPackage`,
      data: {
        packageSent: true,
        packageName: this.packageName
      },
      headers: {
        'Authorization': 'JWT ' + window.localStorage.getItem('id_token')
      }
    }, (resData, jwres) => {
      console.log('resdata', resData);
      console.log('jwres', jwres)
    });
    this.sent = true;
    this.packageReady = false;
  }

  infoReceived(){
    io.socket.request({
      method: 'POST',
      url: `/product/infoReceived`,
      data: {
        received: true,
      },
      headers: {
        'Authorization': 'JWT ' + window.localStorage.getItem('id_token')
      }
    }, (resData, jwres) => {
      this.packageReceived = true;
      this.adminReceived = false;
      this.packageReady = true;
      console.log('resdata', resData);
      console.log('jwres', jwres)
    });
  }

}
