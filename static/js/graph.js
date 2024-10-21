document.addEventListener("DOMContentLoaded", function () {
    let chart;
    const chartElement = document.querySelector("#totalRevenueChart_1");
    //const filterElement = document.querySelector("#filter");

    // Function to create the stacked chart
    function createStackedChart(data) {
        if (chart) {
            chart.destroy();
        }
        var sdata = data.map(item => { return {x: item.vsiservername, y:item.vsimem12monthmaxutilperc}; });
        console.log(sdata);
        // series: [
        //     {
        //       data: [
        //         {
        //           x: 'INTC',
        //           y: 1.2
        //         },
        //         {
        //           x: 'GS',
        //           y: 0.4
        //         },
        //         {
        //           x: 'CVX',
        //           y: -1.4
        //         },
        //         {
        //           x: 'GE',
        //           y: 2.7
        //         },
        //         {
        //           x: 'CAT',
        //           y: -0.3
        //         },
        //         {
        //           x: 'RTX',
        //           y: 5.1
        //         },
        //         {
        //           x: 'CSCO',
        //           y: -2.3
        //         },
        //         {
        //           x: 'JNJ',
        //           y: 2.1
        //         },
        //         {
        //           x: 'PG',
        //           y: 0.3
        //         },
        //         {
        //           x: 'TRV',
        //           y: 0.12
        //         },
        //         {
        //           x: 'MMM',
        //           y: -2.31
        //         },
        //         {
        //           x: 'NKE',
        //           y: 3.98
        //         },
        //         {
        //           x: 'IYT',
        //           y: 1.67
        //         }
        //       ]
        //     }
        //   ],

        // // Grouping the data by series (assuming CSV columns: 'category', 'series1', 'series2')
        // const series1 = data.map(item => item.series1);
        // const series2 = data.map(item => item.series2);
        // const categories = data.map(item => item.category); // X-axis categories

        // chart = new ApexCharts(chartElement, {
        //     series: [{
        //         name: 'Series 1',
        //         data: series1
        //     }, {
        //         name: 'Series 2',
        //         data: series2
        //     }],
        //     chart: {
        //         type: 'bar',
        //         stacked: true,
        //     },
        //     xaxis: {
        //         categories: categories
        //     },
        //     plotOptions: {
        //         bar: {
        //             horizontal: false,
        //         },
        //     },
        // });

        // chart.render();
        
        var options = {
            series: [
            {
              data: sdata
            }
          ],
            legend: {
            show: false
          },
          chart: {
            height: 350,
            type: 'treemap'
          },
          title: {
            text: 'Treemap with Color scale'
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '12px',
            },
            formatter: function(text, op) {
              return [text, op.value]
            },
            offsetY: -4
          },
          plotOptions: {
            treemap: {
              enableShades: true,
              shadeIntensity: 0.5,
              reverseNegativeShade: true,
              colorScale: {
                ranges: [
                  {
                    from: 0,
                    to: 40,
                    color: '#CD363A'
                  },
                  {
                    from: 41,
                    to: 80,
                    color: '#52B12C'
                  },
                  {
                    from: 81,
                    to: 100,
                    color: '#52B1CC'
                  }
                ]
              }
            }
          }
        };
        var chart = new ApexCharts(chartElement, options);
        chart.render();
    }

    // Load and parse CSV file
    Papa.parse("/static/sample.csv", {
        download: true,
        header: true,
        complete: function (results) {
            let allData = results.data;

            // Initial chart rendering with all data
            createStackedChart(allData);

            // Filter change event listener
            // filterElement.addEventListener("change", function () {
            //     const filteredData = filterData(allData, filterElement.value);
            //     createStackedChart(filteredData);
            // });
        }
    });
});
