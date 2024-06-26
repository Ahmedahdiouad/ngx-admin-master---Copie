import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-bar-horizontal',
  template: `
    <chart type="horizontalBar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsBarHorizontalComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels:  ['8:00', '9:00', '10:00', '11:00', '12:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00'],
        datasets: [{
            label: 'Quality',
            backgroundColor: colors.infoLight,
            borderWidth: 1,
            data: [this.random(), this.random(), this.random(), this.random(), this.random(), this.random(),this.random(), this.random(), this.random(), this.random(), this.random(), this.random()],
          }, {
            label: 'Performance',
            backgroundColor: colors.successLight,
            data: [this.random(), this.random(), this.random(), this.random(), this.random(), this.random(), this.random(), this.random(), this.random(), this.random(), this.random(), this.random()],
          },
          {
            label: 'Availability',
            backgroundColor: colors.while ,
            data: [this.random(), this.random(), this.random(), this.random(), this.random(), this.random(), this.random(), this.random(), this.random(), this.random(), this.random(), this.random()],
          },
        ],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          rectangle: {
            borderWidth: 2,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          position: 'right',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private random() {
    return Math.round(Math.random() * 100);
  }
}
