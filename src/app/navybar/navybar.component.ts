import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navybar',
  templateUrl: './navybar.component.html',
  styleUrls: ['./navybar.component.scss']
})
export class NavybarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  home() {
    this.router.navigate(['']);
  }

  employee() {
    this.router.navigate(['/employees']);
  }

  room() {
    this.router.navigate(['/rooms']);
  }

  position() {
    this.router.navigate(['/positions']);
  }

}
