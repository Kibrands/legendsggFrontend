import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import * as jQuery from 'jquery';
import { Title } from '@angular/platform-browser';
import { environment } from './../../environments/environment';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { templateJitUrl, templateSourceUrl } from '@angular/compiler';

interface Summoner {
  summoner: {
    accountId: string,
    id: string,
    puuid: string,
    name: string,
    profileIconId: number,
    revisionDate: number,
    summonerLevel: number
  },
  leagueEntries: []
}

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit {
  summoner: { server: string, name: string };
  summonerModel: Summoner;
  faTools = faTools;
  public env = environment;

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
    this.http.get<Summoner>(environment.api_url + this.summoner.server + "/" + this.summoner.name, {
        params : {
          legendsgg: btoa(this.summoner.server + this.summoner.name)
        }
      })
      .subscribe(data => {
        this.summonerModel = data;
        if (this.summonerModel.summoner == null) {
          location.href = "/404";
        }
      }, error => location.href = '/404');
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
