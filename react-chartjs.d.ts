///<reference path="typings/main.d.ts"/>

import * as React from "react";
import { ChartOptions, LinearChartData, CircularChartData } from "chartjs";
export { ChartOptions, LinearChartData, CircularChartData }

export interface ChartProps<T> extends React.HTMLProps<HTMLCanvasElement> {
  data: T | any; // conflicts with react's HTMLAttributes
  options: ChartOptions;
  redraw?: boolean;
}

export type LinearChartProps = ChartProps<LinearChartData>;
export class Bar extends React.Component<LinearChartProps, any> {}
export class Line extends React.Component<LinearChartProps, any> {}

export type CircularChartProps = ChartProps<CircularChartData>;
export class Doughnut extends React.Component<CircularChartProps, any> {}
export class Pie extends React.Component<CircularChartProps, any> {}
export class PolarArea extends React.Component<CircularChartProps, any> {}
export class Radar extends React.Component<CircularChartProps, any> {}

export function createClass<T>(chartType: string, methodNames: string[], dataKey: string): new() => React.Component<T, any>;