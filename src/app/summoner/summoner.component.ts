import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import * as jQuery from 'jquery';
import { Title } from '@angular/platform-browser';
import { environment } from './../../environments/environment';
import { faTools } from '@fortawesome/free-solid-svg-icons';

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

interface MatchList {
  matchList: []
}

interface MatchRef {
  champion: number;
  gameId: number;
  lane: string;
  platformId: string;
  queue: number;
  role: string;
  season: number;
  timestamp: number;
}

interface Match {
  gameCreation: number;
  gameDuration: number;
  gameId: number;
  gameMode: string;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participantIdentities: Array<any>;
  participants: Array<any>;
  platformId: string;
  queueId: number;
  seasonId: number;
  teams: Array<any>;
}

interface MatchMap {
  matchRef: MatchRef;
  match: Match;
}

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit {
  summoner: { server: string, name: string };
  win: number = 60;
  lose: number = 40;
  winRatio: Array<any>;
  summonerModel: Summoner;
  matchListModel: MatchList;
  matchDataMap: Array<MatchMap> = [];
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
        this.subscribeToMatchList();
      }, error => location.href = "/404");
  }

  private subscribeToMatchList() {
    this.http.get<MatchList>(environment.api_url + "matchlist/" + this.summoner.server + "/" + this.summonerModel.summoner.accountId, {
      params : {
        legendsgg: btoa(this.summoner.server + this.summonerModel.summoner.accountId)
      }
    })
    .subscribe(data => {
      this.matchListModel = data;
      if (this.matchListModel.matchList == null) {
        console.log("err.matchlist.not.found")
      }
      this.getMatchInfo();
    });
  }

  private getMatchInfo() {
    let count = 0;
    this.matchListModel.matchList.forEach(matchRef => {
      if (count < 20) {
        this.http.get<Match>(environment.api_url + "match/" + this.summoner.server + "/" + matchRef['gameId'] + "/" + this.summonerModel.summoner.accountId, {
          params : {
            legendsgg: btoa(this.summoner.server + matchRef['gameId'] + this.summonerModel.summoner.accountId)
          }
        })
        .subscribe(data => {
          let matchMap = { matchRef: matchRef, match: data } as MatchMap;
          this.matchDataMap.push(matchMap);
          if(count == 19) {
            setTimeout(this.calculateRatio, 500);
          }
        });
      }
      count++;
    });
  }

  private calculateRatio() {
    this.winRatio = [[this.lose, this.win]]
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
