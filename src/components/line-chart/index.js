import React from "react";
import Chart from "react-apexcharts";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          background: "#fff",
          foreColor: "#858D9D",
        },
        colors: ["#DBA362"],
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
          ],
          labels: {
            show: false, // Hide X axis labels
          },
          axisBorder: {
            show: false, // Hide X axis border
          },
          axisTicks: {
            show: false, // Hide X axis ticks
          },
        },
        yaxis: {
          labels: {
            show: false, // Hide Y axis labels
          },
          axisBorder: {
            show: false, // Hide Y axis border
          },
          axisTicks: {
            show: false, // Hide Y axis ticks
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.5,
            gradientToColors: ["#DF9B2D11"], // Adjusted to match single color
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 100],
          },
        },
        stroke: {
          curve: "smooth",
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: "",
          align: "center",
          margin: 20,
          offsetY: 20,
          style: {
            fontSize: "25px",
          },
        },
        tooltip: {
          theme: "dark",
        },
      },
      series: [
        {
          name: "Ordered",
          data: [1500, 2400, 3700, 400, 1000, 4500],
        },
      ],
    };
  }

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={50}
          width={50}
        />
      </div>
    );
  }
}

export default LineChart;
