const state = {
    funds: 10000,
    stocks: [],
};

const mutations = {
    'BUY_STOCK'(state, {stockId, quantity, stockPrice}) {
        const record = state.stocks.find(element => element.id == stockId );
        if (record) {
            record.quantity += quantity;
        } else {
            state.stocks.push({
                id: stockId,
                quantity,
            });
        }
        state.funds -= stockPrice * quantity;
    },
    'SELL_STOCK'(state, {stockId, quantity, stockPrice}) {
        const record = state.stocks.find(element => element.id == stockId);
        console.assert(record != null, "record is: " + record);
        if (record.quantity > quantity) {
            record.quantity -= quantity;
        } else {
            state.stocks.splice(state.stocks.indexOf(record), 1); 
        }
        state.funds += stockPrice * quantity;
    },
    'SET_PORTFOLIO'(state, portfolio) {
        state.funds = portfolio.funds;
        state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
    }
};

const actions = {
    sellStock({commit}, order) {
        commit('SELL_STOCK', order);
    }
};

const getters = {
    /**
     * Looks at each stock in the portfolio, uses the stock.js module
     * to find the relevant ID, then stores the stock as an element in
     * the returned array.
     * 
     * @param {Object} state Local state of portfolio.js
     * @param {Object} getters Getters of Vuex
     */
    stockPortfolio(state, getters) {
        console.log(getters.stocks);
        console.log(state.stocks);

        return state.stocks.map(stock => {
            const record = getters.stocks.find(element => element.id == stock.id);
            console.log("getter" + " " + record);
            return {
                id: stock.id,
                quantity: stock.quantity,
                name: record.name,
                price: record.price
            }
        });
    },
    funds(state) {
        return state.funds;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}