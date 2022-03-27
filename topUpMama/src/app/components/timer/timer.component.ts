import {Component, Inject, OnInit} from '@angular/core';
import {BROWSER_STORAGE} from "../../_helpers/storage";
import {AuthService} from "../../_services/auth/auth.service";
import {NotificationService} from "../../_services/notifications/notification.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  min: any
  sec: any
  loggedInTime:any

  constructor(
    @Inject(BROWSER_STORAGE) public storage: Storage,
    private authService: AuthService,
    private notifyService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.getLoggTime()
    // Update the count-down every 1 second
    let x = setInterval(() => {
      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count-down date
      let distance = this.loggedInTime - now;

      this.min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.sec = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count-down is finished, write some text
      if (distance < 480000) {
        this.notifyService.showSuccess("Token refreshed", "TopUpMama")
        this.loggedInTime = new Date().getTime() + 600000
      }
    }, 1000);
  }

  getLoggTime(){
    return this.loggedInTime = this.storage.getItem('tokenExp')
  }

}
