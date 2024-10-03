import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class ActivityChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Activity",
          data: [
            10, 100, 200, 300, 400, 30, 100, 200, 300, 400,250,140
          ],
        },
        // {
        //   name: "Sales",
        //   data: [
        //     50000, 48000, 53000, 17000, 45000, 48000, 50000, 48000, 53000,
        //     17000, 45000, 48000,
        //   ],
        // },
        // {
        //   name: "Science",
        //   data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        // },
      ],
      options: {
        colors: ["#F7801ACC", "#1B59F800"],
        grid: {
          row: {
            colors: ["#fff", "#fff", "#fff"],
          },
          //   column: {
          //     colors: ["red", "red", "red"],
          //   },
        },
        chart: {
          type: "bar",
          height: 350,
          fontFamily: 'Inter',
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
            borderRadius: 2,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yaxis: {},
        fill: {
          opacity: 1,
         
        },
        // tooltip: {
        //   y: {
        //     formatter: function (val) {
        //       return "$ " + val + " thousands";
        //     },
        //   },
        // },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={300}
        />
      </div>
    );
  }
}

export default ActivityChart;