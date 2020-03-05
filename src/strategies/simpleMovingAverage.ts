import {SMA} from "technicalindicators";
import CandleCollection from "../sockTrader/core/candle/candleCollection";
import Orderbook from "../sockTrader/core/orderbook/orderbook";
import BaseStrategy from "../sockTrader/core/strategy/baseStrategy";
import {Exchange} from "../sockTrader/core/types/exchange";
import {Order, OrderSide, OrderStatus} from "../sockTrader/core/types/order";
import {Pair} from "../sockTrader/core/types/pair";
import {crossDown, crossUp} from "../sockTrader/core/utils/strategyUtil";

/**
 * Simple moving average strategy.
 * -> a buy signal is generated when fast sma crosses the slow sma upwards.
 * -> a sell signal is generated when fast sma crosses the slow sma downwards.
 */
export default class SimpleMovingAverage extends BaseStrategy {

    canBuy = true;
    canSell = false;

    private fastSMA: SMA;
    private slowSMA: SMA;

    constructor(pair: Pair, exchange: Exchange) {
        super(pair, exchange);

        this.fastSMA = new SMA({period: 12, values: [], reversedInput: true});
        this.slowSMA = new SMA({period: 24, values: [], reversedInput: true});
    }

    notifyOrder(order: Order): void {
        if (order.status === OrderStatus.FILLED) {
            this.canBuy = order.side === OrderSide.SELL;
            this.canSell = order.side === OrderSide.BUY;
        }
    }

    updateCandle(candles: CandleCollection): void {
        const fastSMA = this.fastSMA.nextValue(candles.first.close);
        const slowSMA = this.slowSMA.nextValue(candles.first.close);

        const up = fastSMA !== undefined ? crossUp(fastSMA, slowSMA) : false;
        const down = fastSMA !== undefined ? crossDown(fastSMA, slowSMA) : false;

        if (up && this.canBuy) {
            this.canBuy = false;
            return this.buy(this.pair, candles.first.close, 1);
        }

        if (down && this.canSell) {
            this.canSell = false;
            return this.sell(this.pair, candles.first.close, 1);
        }
    }

    updateOrderbook(orderBook: Orderbook): void {
        // Ignore method
    }
}
