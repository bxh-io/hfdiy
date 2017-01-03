import {Boe} from './BoeModule';

const companyFactory = new Boe.CompanyFactory()
const faceBookCompany = companyFactory.createCompany("FB")
const initalGrowthRate = 2;
const fbBoe = new Boe.Boe(initalGrowthRate, faceBookCompany);

const defaultState = {'growthRate':initalGrowthRate, 'ticker': 'FB', 'company':faceBookCompany, 'boe':fbBoe};

export const boeEngine = (state=defaultState, action) => {
	switch (action.type) {
		case "@@router/LOCATION_CHANGE":
			const pathname = action.payload.pathname;
			const ticker = pathname.split("/")[2];
			if (ticker){
				const newCompany = companyFactory.createCompany(ticker)
				const newBoE = new Boe.Boe(state.growthRate, newCompany);
				return Object.assign({}, state, {"ticker": ticker, "company": newCompany, "boe": newBoE})
			}
			return state
		case "MODIFY_GROWTH_RATE":
			const appleBoe = new Boe.Boe(action.growthRate, faceBookCompany);
			return Object.assign({}, state, {"growthRate": action.growthRate, "boe": appleBoe})
	default:
		return state;
	}
}
