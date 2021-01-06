import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  private lang: string;
  faTimes = faTimes;

  constructor(private route: ActivatedRoute, translate: TranslateService) {
    translate.setDefaultLang('en');
    this.lang = localStorage.getItem('client-lang');
    translate.use(this.lang);
  }

  ngOnInit() {}
}