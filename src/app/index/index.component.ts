import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use(localStorage.getItem('client-lang'));
  }
}
