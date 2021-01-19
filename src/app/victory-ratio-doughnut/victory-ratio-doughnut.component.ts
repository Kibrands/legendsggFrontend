import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-victory-ratio-doughnut',
  templateUrl: './victory-ratio-doughnut.component.html',
  styleUrls: ['./victory-ratio-doughnut.component.css']
})
export class VictoryRatioDoughnutComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Lose', 'Win'];
  @Input() chartData: Array<any>;
  public doughnutChartData: MultiDataSet;
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['#E74C3C', '#2ECC71']
    }
]

  constructor() {}

  ngOnInit(): void {
    this.doughnutChartData = this.chartData;
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
