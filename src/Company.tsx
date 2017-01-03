import * as React from "react";

import {Chart} from "./Chart";
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux';

interface CompanyNameProps { companyName: string;}
export const CompanyName = (props: CompanyNameProps) => {return(<h3>{props.companyName}</h3>)}

interface GrowthRateModifierProps { handleChange: (event)=>void; growthRate: number}
export const GrowthRateModifier = (props: GrowthRateModifierProps) => {
    return (<div className="growth-rate-modifier">
                <label>Growth: {props.growthRate} % </label>
                <input id="growth-rate" onChange={props.handleChange} type="range" min="0" value={props.growthRate} max="100" step="1"/>
            </div>)
    }

interface LabelProps {color: string, stockValue:number, explainerText:string,  extraClass: string}
const Label = (props: LabelProps) => {
    return (<div className={props.extraClass} >
               <div className="label-color " style={{"background":props.color}}>
                </div>
                <div className="label-value">
                    <span> $ {props.stockValue} </span>
                </div>
                <div className="label-value">
                    <span> {props.explainerText} </span>
                </div>
            </div>)
}



export interface CompanyProps { dispatch: Function, boeEngine:any, routeParams: any; children?:any}
const _Company = (props: CompanyProps) => {


    const chartData = {
        labels: ["Year One", "Year Two", "Tear Three", "Terminal"],
        datasets: [
            {
                label: "Stock Price",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "#FFBC64",
                pointColor: "#FFBC64",
                datasetStrokeWidth : 2,
                pointStrokeColor: "#FFBC64",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [props.boeEngine.boe.assumedYearOne, props.boeEngine.boe.assumedGrowthYearTwo, props.boeEngine.boe.assumedGrowthYearThree, props.boeEngine.boe.assumedGrowthYearThree, props.boeEngine.boe.assumedGrowthYearThree]
            },
            {
                label: "BoE No Growth",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "red",
                pointColor: "red",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [props.boeEngine.boe.BOELine, props.boeEngine.boe.BOELine, props.boeEngine.boe.BOELine, props.boeEngine.boe.BOELine, props.boeEngine.boe.BOELine, props.boeEngine.boe.BOELine]
            },
            {
                label: "BoE Growth",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "#1C849C",
                pointColor: "#1C849C",
                pointStrokeColor: "#1C849C",
                pointHighlightFill: "#1C849C",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [props.boeEngine.company.closingPrice, props.boeEngine.boe.boeGrowthProfitYearTwo, props.boeEngine.boe.boeGrowthProfitYearThree, props.boeEngine.boe.boeGrowthProfitYearThree, props.boeEngine.boe.boeGrowthProfitYearThree]
            }
        ]
    };

    const onSliderValueChange = (event)=>{props.dispatch({"type":"MODIFY_GROWTH_RATE", "growthRate":event.target.value})}
    const chartOptions = {
        // String - Scale label font colour
        scaleFontColor: "#fff",

        // String - Colour of the scale line
        scaleLineColor: "#fff",
        scaleIntegersOnly: false,
        // Boolean - whether or not the chart should be responsive and resize when the browser does.
        responsive: false,
        scaleGridLineColor : "rgba(255,255,255,.3)",
        bezierCurveTension : .1,
        datasetStrokeWidth: 4,
        scaleShowLabels:true,

    }
    return (<div className="company">
                <CompanyName companyName={props.boeEngine.company.name} />

                <Chart chartData={chartData} chartOptions={chartOptions}/>
                <GrowthRateModifier growthRate={props.boeEngine.growthRate} handleChange={onSliderValueChange}/>
                <div className="label-container">
                    <Label extraClass="right-divider" color="#FFBC64" stockValue={props.boeEngine.boe.assumedGrowthYearThree.toFixed(2)} explainerText="Stock Price" />
                    <Label extraClass="right-divider" color="red" stockValue={props.boeEngine.company.closingPrice.toFixed(2)} explainerText="BoE" />
                    <Label extraClass="" color="#1C849C" stockValue={props.boeEngine.boe.boeGrowthProfitYearThree.toFixed(2)} explainerText="Growth BoE" />
                </div>
            </div>)
}

export const Company = connect((state)=>{return state})(_Company);
