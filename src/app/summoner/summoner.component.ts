import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import * as jQuery from 'jquery';
import { Title } from '@angular/platform-browser';

interface Summoner {
  server: string;
  name: string;
}

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit {
  summoner: { server: string, name: string };
  summoner$: Summoner

  constructor(private route: ActivatedRoute, translate: TranslateService
    , private http: HttpClient, private titleService: Title) {
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
    this.setTitle('Legends GG - ' + this.summoner.name.toUpperCase() + " (" + this.summoner.server.toUpperCase() + ")");
    this.http.get<Summoner>('https://datagg.herokuapp.com/summoner/' + this.summoner.server + "/" + this.summoner.name)
      .subscribe(data => {
        this.summoner$ = data;
        this.printSummoner();
      });
  }

  printSummoner(): void {
    jQuery('#data').html('<p>' + this.summoner$.server.toUpperCase() + " - " + this.summoner$.name.toUpperCase() + '</p>');
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
