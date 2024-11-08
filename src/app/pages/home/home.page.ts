import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: any;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.getUserObservable().subscribe((user) => {
      this.user = user
    })
  }

}
