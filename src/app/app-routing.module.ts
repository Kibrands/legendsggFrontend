import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SummonerComponent } from './summoner/summoner.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'summoner/:server/:name', component: SummonerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
