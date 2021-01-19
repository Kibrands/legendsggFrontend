import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu.component';
import { SummonerComponent } from './summoner/summoner.component';
import { IndexComponent } from './index/index.component';
import { LevelBorderConverterPipe } from './level-border-converter.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { VictoryRatioDoughnutComponent } from './victory-ratio-doughnut/victory-ratio-doughnut.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    IndexComponent,
    SummonerComponent,
    LevelBorderConverterPipe,
    NotFoundComponent,
    VictoryRatioDoughnutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    FontAwesomeModule,
    ChartsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
