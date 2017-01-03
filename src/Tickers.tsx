import * as React from "react";
import { Router, Route, Link } from 'react-router'

export interface TickerProps {symbol: string}
export class Ticker extends React.Component<TickerProps, undefined> {
    render() {
    	const symbol = this.props.symbol;
        return (<li><Link to={`/company/${symbol}`}>{symbol}</Link></li>);
    }
}

export class Tickers extends React.Component<undefined, undefined> {
    render() {
    	const companies:string[] = ['APPL', 'FB', 'MSFT'];
        const list = companies.map((ticker, index, array) => {
			return (<li className="ticker" key={ticker}><Link to={`/company/${ticker}`}>{ticker}</Link></li>);
		});
		return (<ul>{list}</ul>);
    }
}



