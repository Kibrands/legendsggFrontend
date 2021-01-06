import { Component, OnInit } from '@angular/core';
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  faGlobeEurope = faGlobeEurope;
  private lang: string;

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    this.lang = localStorage.getItem('client-lang');
    translate.use(this.lang);
    jQuery('html').attr('lang',this.lang);
  }

  ngOnInit() {
    var $radios = jQuery('input:radio[name=language]');
    if($radios.is(':checked') === false) {
      $radios.filter('[value=' + this.lang + ']').prop('checked', true);
    }

    jQuery('#saveLang').click(function () {
      localStorage.setItem('client-lang', jQuery('input[name=language]:checked').val())
      location.reload();
    });
  }
}
