// Third Party imports
import * as d3 from 'd3';

// Time formats
export const xAxisTickFormat = d3.timeFormat("%m");
export const topAxisFormat = d3.timeFormat("%Y");
export const datesFormat = d3.timeFormat("%d-%m-%Y");

const siFormat = (tickValue: any) => d3.format(".2s")(tickValue).replace('G', 'B');
export const yAxisTickFormat: any = (tickValue: any) => siFormat(tickValue).replace('G', 'B');
export const priceFormat = (tickValue: any) => siFormat(tickValue);