import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CoinTrackerService } from './services/coin-tracker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'bitcoin-tracker';
  rate: any;
  Highcharts: typeof Highcharts = Highcharts;
  chardata: any[] = [];
  chartOptions: any;
  constructor(private coinService: CoinTrackerService) {}
  ngOnInit() {
    this.rate = this.coinService.getData('bitcoin').subscribe(
      (data) => {
        this.rate = data;
        this.chardata.push(Number(this.rate.bitcoin));
        this.chartOptions = {
          series: [
            {
              data: this.chardata,
            },
          ],
          chart: {
            type: 'line',
            zoomType: 'x',
          },
          title: {
            text: 'linechart',
          },
        };
      },
      (err) => console.log
    );
  }

  ngOnDestroy() {
    this.rate.unsubscribe();
  }
}
