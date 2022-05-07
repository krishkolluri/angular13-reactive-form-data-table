import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {
    console.log('app loaded');
  }

  ngOnInit(): void {
    console.log('app loaded from ng On init');
  }
}
