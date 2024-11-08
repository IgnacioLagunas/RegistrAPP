import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  user:any;

  constructor(private sessionService: SessionService) {
    
  }
  
 

  ngOnInit() {
    this.sessionService.getUserObservable().subscribe((user) => {
      this.user = user
    })
  }

}
