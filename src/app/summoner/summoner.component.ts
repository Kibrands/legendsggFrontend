import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit {
  summoner: {server: string, name: string};

  constructor(private route: ActivatedRoute, translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use(localStorage.getItem('client-lang'));
  }

  ngOnInit(): void {
    this.summoner = {
      server: this.route.snapshot.params.server,
      name: this.route.snapshot.params.name
    };
    this.route.params.subscribe(
      (params: Params) => {
        this.summoner.server = params.server;
        this.summoner.name = params.name;
      }
    );
  }

}
