//index.js
// var username = "5dd4f4ce5bdc6f45c73c6f6247e72ca7" //Your Intrinio App Username
// var password = "9fe2519c89bb283bea4cfdf044190eb5" //Your Intrinio App Password
// var intrinio = require("intrinio-client")(username, password)
// intrinio.ticker('AAPL').on('complete', function(data, response) {
//     //data is the response from the Intrinio API
//     //response is the http response
//     if(response.statusCode==404){
//         console.log("Not found")
//     }else if(response.statusCode==200){
//         console.log(data)
//     }
// });


const companyFixtures = {
	"FB":{
		closingPrice: 120.39,
		numberOfShares: 2915000000,
		cashAndEquivalents: 6038000000,
		debt: 0,
		totalRevenue: 24671000000,
		totalGrossProfit: 21105000000,
		rAndD: 5658000000,
		sga: 5010000000,
		ebidta: 12828000000,
		name: "Facebook"
	},
	"APPL":{
		closingPrice: 110.79,
		numberOfShares: 5500281000,
		cashAndEquivalents: 20484000000,
		debt: 87032000000,
		totalRevenue: 215639000000,
		totalGrossProfit: 84263000000,
		rAndD: 10045000000,
		sga: 14194000000,
		ebidta: 71877000000,
		name: "Apple"
	},
	"MSFT":{
		closingPrice: 62.14,
		numberOfShares: 7876000000,
		cashAndEquivalents: 13928000000,
		debt: 74900000000,
		totalRevenue: 85394000000,
		totalGrossProfit: 51977000000,
		rAndD: 12132000000,
		sga: 19121000000,
		ebidta: 26540000000,
		name: "Microsoft"
	}
}


export module Boe {

	export class Company {
		closingPrice: number;

		//This is "weightedavedilutedsharesos"
		numberOfShares: number;

		// "cashandequivalents"
		cashAndEquivalents: number;

		//"shorttermdebt" + "longtermdebt"
		debt: number;

		//"totalrevenue"
		totalRevenue: number;

		//"totalgrossprofit"
		totalGrossProfit: number;

		//"rdexpense"
		rdExpense: number;

		//"sgaexpense"
		sgaExpense: number;

		//"ebitda"
		ebitda: number;

		//ticker
		ticker: string;

		//name
		name: string;
	  constructor(ticker: string,
	  						closingPrice: number,
	  						numberOfShares:number,
	  						cashAndEquivalents:number,
	  						debt:number,
	  						totalRevenue:number,
							totalGrossProfit:number,
							rdExpense:number,
							sgaExpense:number,
							ebitda:number,
							name:string){
	  	this.ticker = ticker;
	  	this.closingPrice = closingPrice;
	  	this.numberOfShares = numberOfShares;
	  	this.cashAndEquivalents = cashAndEquivalents;
	  	this.debt = debt;
	  	this.totalRevenue = totalRevenue;
		this.totalGrossProfit = totalGrossProfit
		this.rdExpense = rdExpense
		this.sgaExpense = sgaExpense
		this.ebitda = ebitda
		this.name = name
  }

	  get marketCap(){
	  	return this.closingPrice * this.numberOfShares;
	  }

	  get netBalanceSheet(){
	  	return this.cashAndEquivalents - this.debt;
	  }
	  get adjustedEBITDA(){
	  	const costs = (this.rdExpense + this.sgaExpense + this.ebitda);
	  	return this.totalGrossProfit - costs;
	  }

	  get cashPerShare(){
	  	return this.cashAndEquivalents/this.numberOfShares;
	  }
	  get debtPerShare(){
	  	return this.debt/this.numberOfShares;
	  }
	  get netValuePerShare(){
	  	return this.totalGrossProfit/this.numberOfShares;
	  }
	}

	export class CompanyFactory {
		constructor(){

		}
		createCompany(ticker:string){
			// this.closingPrice = closingPrice;
			// this.numberOfShares = numberOfShares;
			// this.cashAndEquivalents = cashAndEquivalents;
			// this.debt = debt;
			// this.totalRevenue = totalRevenue;
			// this.totalGrossProfit = totalGrossProfit
			// this.rdExpense = rdExpense
			// this.sgaExpense = sgaExpense
			// this.ebitda = ebitda
			const companyData = companyFixtures[ticker];
			const company = new Company(ticker,
										//this.closingPrice = closingPrice;
										companyData['closingPrice'],

										//this.numberOfShares = numberOfShares;
										companyData['numberOfShares'],

										//this.cashAndEquivalents = cashAndEquivalents
										companyData['cashAndEquivalents'],

										//this.debt = debt;
										companyData['debt'],

										//this.totalRevenue
										companyData['totalRevenue'],

										// this.totalGrossProfit = totalGrossProfit
										companyData['totalGrossProfit'],

										//r&d
										companyData['rAndD'],

										//sga
										companyData['sga'],

										//ebidta
										companyData['ebidta'],

										//name
										companyData['name'])
			return company
		}
	}

	export class Boe {
		discountRate: number = 0.04;
		normalisedTaxRate: number = 0.30;
		//sgaReduction: number = 0.30;
		//rAndDReduction: number = 0.30;


		growthRate: number;
		company: Company;

		constructor(growthRate: number, company: Company){
			this.growthRate = growthRate;
			this.company = company;
		}


		get afterTaxProfit(){
			return this.company.ebitda * (1-this.normalisedTaxRate);
		}

		get BoeCfNpv(){
			return this.afterTaxProfit/this.discountRate;
		}

		get BoeCfNpvPerShare(){
			return this.BoeCfNpv/this.company.numberOfShares;
		}

		get perShareTotalNPV(){
			return this.company.netValuePerShare + this.BoeCfNpvPerShare;
		}

		get basicBOEMarketValue(){
			return this.perShareTotalNPV/(1-this.company.closingPrice);
		}

		get revenueGrowthYearTwo(){
			return this.company.totalRevenue * Math.pow((1+this.growthRate/100), 2)
		}

		get revenueGrowthYearThree(){
			return this.company.totalRevenue *  Math.pow((1+this.growthRate/100), 3)
		}

		get costsYearOne(){
			return (this.company.rdExpense + this.company.sgaExpense);
		}

		get costsYearTwo(){
			const fractionalCosts = this.costsYearOne/this.company.totalRevenue;
			return (fractionalCosts * this.revenueGrowthYearTwo)
		}

		get costsThree(){
			const fractionalCosts = this.costsYearOne/this.company.totalRevenue;
			return (fractionalCosts * this.revenueGrowthYearThree)
		}

		get boeGrowthProfitYearTwo(){
			return (((this.revenueGrowthYearTwo-this.costsYearTwo)*(1-this.normalisedTaxRate))/this.discountRate)/this.company.numberOfShares;
		}
		get boeGrowthProfitYearThree(){
			return (((this.revenueGrowthYearThree-this.costsThree)*(1-this.normalisedTaxRate))/this.discountRate)/this.company.numberOfShares;
		}

		get assumedGrowth(){
			const assumedNPVperShare = this.company.closingPrice * this.discountRate;
			const assumedNPV = assumedNPVperShare * this.company.numberOfShares;
			const denominator = (1-this.normalisedTaxRate) * (this.company.totalRevenue-this.costsYearOne)

			const growthToN = assumedNPV/denominator
			const nYearsOfGrowth = Math.log(growthToN)
			const assumedGrowth = Math.exp(nYearsOfGrowth/3)

			return ((assumedGrowth-1)*100)
		}

		get assumedYearOne(){
			const cashFlowYearOne = this.company.totalRevenue - this.costsYearOne
			const companyModifier = (1/this.discountRate)*(1-this.normalisedTaxRate)/this.company.numberOfShares;
			return cashFlowYearOne * companyModifier
			//return (cashFlowYearOne*(1-this.normalisedTaxRate))/this.company.numberOfShares;
		}

		get assumedGrowthYearTwo(){
			const cashFlowYearOne = this.company.totalRevenue - this.costsYearOne
			const cashFlowYearTwo = cashFlowYearOne* Math.pow((1+this.assumedGrowth/100), 2)
			const companyModifier = (1/this.discountRate)*(1-this.normalisedTaxRate)/this.company.numberOfShares;
			return cashFlowYearTwo * companyModifier
		}

		get assumedGrowthYearThree(){
			const cashFlowYearOne = this.company.totalRevenue - this.costsYearOne
			const cashFlowYearThree = cashFlowYearOne* Math.pow((1+this.assumedGrowth/100), 3)

			const companyModifier = (1/this.discountRate)*(1-this.normalisedTaxRate)/this.company.numberOfShares;
			return cashFlowYearThree * companyModifier
		}

		get BOELine(){
			const boeCashFlow = this.company.totalRevenue - this.company.adjustedEBITDA;
			return ((boeCashFlow/(this.discountRate))*(1-this.normalisedTaxRate))/this.company.numberOfShares;
		}
	}
}




