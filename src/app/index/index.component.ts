import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use(localStorage.getItem('client-lang'));
  }

  ngOnInit() {
    jQuery('#searchSummoner').click(function () {
      if (jQuery('#server').val() != "") {
        location.href = "/summoner/" + jQuery('#server').val().toLowerCase() + "/" + jQuery('#summoner').val().toLowerCase();
      }
    });
  }
}
