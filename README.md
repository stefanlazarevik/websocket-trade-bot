<p align="center"><img width="150" height="150" src="https://raw.githubusercontent.com/SockTrader/SockTrader/master/docs/SockTraderLogo.png" alt="SockTrader logo" /></p>

<h1 align="center">SockTrader</h1>
<p align="center"><b>Cryptocurrency trading bot</b></p>

<p align="center">
  <a href="https://www.gnu.org/licenses/gpl-3.0"><img src="https://img.shields.io/badge/License-GPL%20v3-blue.svg" alt="License: GPL v3"></a>
  <a href="https://codecov.io/gh/SockTrader/SockTrader"><img src="https://codecov.io/gh/SockTrader/SockTrader/branch/master/graph/badge.svg" /></a>
  <a href="https://travis-ci.org/SockTrader/SockTrader"><img src="https://travis-ci.org/SockTrader/SockTrader.svg?branch=master" alt="Build status"></a>
  <a href="https://codeclimate.com/github/SockTrader/SockTrader/maintainability"><img src="https://api.codeclimate.com/v1/badges/19589f9237d31ca9dcf6/maintainability" /></a>
  <a href="https://david-dm.org/SockTrader/SockTrader"><img src="https://david-dm.org/SockTrader/SockTrader.svg" alt="Dependencies"></a>
</p>

<p align="center"><b>🚧 Project is currently under development! 🚧</b></p>

## Features

- 🚀 Realtime super-fast websocket trading
- 📈 50+ Technical indicators ([docs](https://github.com/anandanand84/technicalindicators))
- 🌈 Written in typescript!
- 🌿 Unit tested source code
- 💎 Strategy testing with LIVE exchange data.
- 🏡 Backtesting engine with local data.
- ⚡️ Live reload any strategy in your own frontend
- 📡 Connect your frontend to the integrated websocket server
- More features soon..

## Getting started

## Quick start

1. Clone the repository locally: `git clone https://github.com/SockTrader/SockTrader`
2. Install dependencies: `cd SockTrader && npm run install`
3. Add trading bot configuration: `cp src/config.ts.dist src/config.ts `
4. Edit `src/config.ts` if needed
5. [Add normalized candle data to src/data folder](https://github.com/SockTrader/SockTrader#add-normalized-data)
6. Run bot! `npm run backtest -- --candles=bitstamp_btcusd_1h --strategy=simpleMovingAverage`

## Add normalized data

...

## Your own strategy?

First you need to create an entry file `index.ts` to initialize the framework.
Example:
```typescript
#!/usr/bin/env node
import HitBTC, {CandleInterval} from "./core/exchanges/hitBTC";
import SockTrader from "./core/sockTrader";
import MyStrategy from "./strategies/myStrategy";

// noinspection TsLint
const credentials = require("../credentials.json");

const sockTrader = new SockTrader();
const hitBTC = HitBTC.getInstance(credentials.publicKey, credentials.secretKey);

sockTrader.addExchange(hitBTC);
sockTrader.addStrategy({
    strategy: MyStrategy,
    pair: "BTCUSD",
    interval: CandleInterval.FIVE_MINUTES,
    exchange: hitBTC,
});

// Uncomment if you want to start the bot from the terminal.
// Otherwise you would need the dashboard to start the application.
// sockTrader.start();
```

And secondly create a strategy file: `src/strategies/myStrategy.ts`
Example:
```typescript
import {ICandle} from "../core/candleCollection";
import Orderbook from "../core/orderbook";
import BaseStrategy from "../core/strategy";

export default class MyStrategy extends BaseStrategy {

    public notifyOrder(data: any): void {
        // Will be called when the exchange confirms an order
    }

    public updateCandles(candleCollection: ICandle[]): void {
        // Will be called on each new candle
        this.buy("BTCUSD", 1000, 10);
        this.sell("BTCUSD", 2000, 10);
    }

    public updateOrderbook(orderbook: Orderbook): void {
        // Will be called on each exchange orderbook update
    }
}
```


# We need your help!
We're looking for extra contributors to give this project a well deserved boost.


## DISCLAIMER
    Using a trading bot does not mean guaranteed profit. 
    Also, trading crypto currency is considered high risk.
    Losses are possible, which SockTrader cannot be held responsible for.
