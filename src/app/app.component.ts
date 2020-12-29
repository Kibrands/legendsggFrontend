import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('client-lang') == ""
      || localStorage.getItem('client-lang') == undefined) {
      localStorage.setItem('client-lang', 'en');
    }
  }
}
