/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useMemo, useEffect} from "react";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import SVG from "react-inlinesvg";
import {useHtmlClassService} from "../../../layout";
import {toAbsoluteUrl} from "../../../_helpers";

export default function Graph({ className }) {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray500: objectPath.get(
        uiService.config,
        "js.colors.gray.gray500"
      ),
      colorsGrayGray200: objectPath.get(
        uiService.config,
        "js.colors.gray.gray200"
      ),
      colorsGrayGray300: objectPath.get(
        uiService.config,
        "js.colors.gray.gray300"
      ),
      colorsThemeBasePrimary: objectPath.get(
        uiService.config,
        "js.colors.theme.base.primary"
      ),
      colorsThemeLightPrimary: objectPath.get(
        uiService.config,
        "js.colors.theme.light.primary"
      ),
      fontFamily: objectPath.get(uiService.config, "js.fontFamily")
    };
  }, [uiService]);

  useEffect(() => {
    const element = document.getElementById("kt_stats_widget_12_chart");

    if (!element) {
      return;
    }

    const options = getChartOption(layoutProps);
    const chartnewUsers = new ApexCharts(element, options);
    chartnewUsers.render();
    return function cleanUp() {
      chartnewUsers.destroy();
    };
  }, [layoutProps]);

  return (

        <div
          id="kt_stats_widget_12_chart"
          className="card-rounded-bottom"
          style={{ height: "150px" }}
        ></div>
  );
}

function getChartOption(layoutProps) {
  // https://api.bcb.gov.br/dados/serie/bcdata.sgs.25435/dados?formato=json
  var options = options = {
    series: [{
      name: "Juros Praticados",
      data: [3.9,3.82,3.98,4.9,3.56,3.81,3.77,4.2,3.79,3.75,3.73,3.85]
  },{
    name: "Taxa Média",
    data: [2.1,2.02,1.98,1.9,1.86,1.81,1.77,1.8,1.79,1.75,1.73,1.85]
}],
    chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  colors: ['#41C78F', '#0B236E'],

  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },

  grid: {
    row: {
      colors: ['#fff', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {

    

    categories: ['Mar/20',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
    'Jan',
    'Fev/21'],
  }
  };

  return options;
}
