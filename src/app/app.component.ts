import { Component } from '@angular/core';
import { SessionService } from './services/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user : any;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.sessionService.getUserObservable().subscribe((user) => {
      console.log(user)
      this.user = user
    })
  }

  logout() {
    this.sessionService.logout();
    window.location.reload();
  }
}
