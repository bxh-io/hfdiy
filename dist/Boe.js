"use strict";
//index.js
var username = "5dd4f4ce5bdc6f45c73c6f6247e72ca7"; //Your Intrinio App Username
var password = "9fe2519c89bb283bea4cfdf044190eb5"; //Your Intrinio App Password
var intrinio = require("intrinio-client")(username, password);
intrinio.ticker('AAPL').on('complete', function (data, response) {
    //data is the response from the Intrinio API
    //response is the http response
    if (response.statusCode == 404) {
        console.log("Not found");
    }
    else if (response.statusCode == 200) {
        console.log(data);
    }
});
var Company = (function () {
    function Company(ticker, closingPrice, numberOfShares, cashAndEquivalents, debt, totalRevenue, totalGrossProfit, rdExpense, sgaExpense, ebitda) {
        this.ticker = ticker;
        this.closingPrice = closingPrice;
        this.numberOfShares = numberOfShares;
        this.cashAndEquivalents = cashAndEquivalents;
        this.debt = debt;
        this.totalRevenue = totalRevenue;
        this.totalGrossProfit = totalGrossProfit;
        this.rdExpense = rdExpense;
        this.sgaExpense = sgaExpense;
        this.ebitda = ebitda;
    }
    Object.defineProperty(Company.prototype, "marketCap", {
        get: function () {
            return this.closingPrice * this.numberOfShares;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Company.prototype, "netBalanceSheet", {
        get: function () {
            return this.cashAndEquivalents - this.debt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Company.prototype, "adjustedEBITDA", {
        get: function () {
            var costs = (this.rdExpense + this.sgaExpense + this.ebitda);
            return this.totalGrossProfit - costs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Company.prototype, "cashPerShare", {
        get: function () {
            return this.cashAndEquivalents / this.numberOfShares;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Company.prototype, "debtPerShare", {
        get: function () {
            return this.debt / this.numberOfShares;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Company.prototype, "netValuePerShare", {
        get: function () {
            return this.totalGrossProfit / this.numberOfShares;
        },
        enumerable: true,
        configurable: true
    });
    return Company;
}());
var CompanyFactory = (function () {
    function CompanyFactory() {
    }
    CompanyFactory.prototype.createCompany = function (ticker) {
        var company = new Company("FB", 1, 2, 3, 4, 5, 6, 7, 8, 9);
        return company;
    };
    return CompanyFactory;
}());
var Boe = (function () {
    function Boe(growthRate, company) {
        this.discountRate = 0.04;
        this.normalisedTaxRate = 0.30;
        this.growthRate = growthRate;
        this.company = company;
    }
    Object.defineProperty(Boe.prototype, "afterTaxProfit", {
        get: function () {
            return this.company.ebitda * (1 - this.normalisedTaxRate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Boe.prototype, "BoeCfNpv", {
        get: function () {
            return this.afterTaxProfit / this.discountRate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Boe.prototype, "BoeCfNpvPerShare", {
        get: function () {
            return this.BoeCfNpv / this.company.numberOfShares;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Boe.prototype, "perShareTotalNPV", {
        get: function () {
            return this.company.netValuePerShare + this.BoeCfNpvPerShare;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Boe.prototype, "basicBOEMarketValue", {
        get: function () {
            return this.perShareTotalNPV / (1 - this.company.closingPrice);
        },
        enumerable: true,
        configurable: true
    });
    return Boe;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Company;
//# sourceMappingURL=Boe.js.map