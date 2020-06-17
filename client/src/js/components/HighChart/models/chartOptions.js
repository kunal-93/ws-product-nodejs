const options = {
    chart: {
        type: 'column'
    },
    title: {
      text: 'default'
    },

    subtitle: {
        text: 'Source: EQ Works'
    },

    yAxis: {
        title: {
            text: 'Number of Events'
        }
    },

    xAxis: {
        type: 'datetime',
        tickInterval: 24 * 3600 * 1000,
        dateTimeLabelFormats: {
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%e. %b',
            week: '%e. %b',
            month: '%b \'%y',
            year: '%Y'
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            }
        }
    },
    series: [{
        name: 'events',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      }, {
          name: 'stats',
          data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
  }

  export default options;