import * as React from "react";
import {Line} from "react-chartjs";

export interface ChartProps { chartData: any; chartOptions:any}

export class Chart extends React.Component<ChartProps, undefined> {
    render() {
		return (<Line data={this.props.chartData} options={this.props.chartOptions} />);
    }
}
