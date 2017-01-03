import * as React from "react";
import { Router, Route, Link } from 'react-router'

export interface AppProps { children?:any}


export const Header = () => {
	return (<header>
				<div>
					<div style={{"float":"left", paddingLeft:"10px"}}>
						<Link to="companies">
							<i style={{"verticalAlign":"-50%"}} className="fa fa-bars fa-lg"></i>
						</Link>
					</div>
					<span className="header-text">HF-DIY</span>
				</div>
			</header>);
}

export const App = (props: AppProps) => {
	return (<div>
				<Header/>
				<div className="app">
					{props.children}
				</div>
			</div>);
}


