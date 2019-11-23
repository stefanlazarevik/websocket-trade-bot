import {Decimal} from "decimal.js-light";
import {EventEmitter} from "events";
import CandleManager from "../candles/candleManager";
import Orderbook from "../orderbook";
import {ICandle} from "../types/ICandle";
import {ICandleInterval} from "../types/ICandleInterval";
import {ICandleProcessor} from "../types/ICandleProcessor";
import {IConnection} from "../types/IConnection";
import {ICurrencyMap} from "../types/ICurrencyMap";
import {IExchange} from "../types/IExchange";
import {IOrderbookData} from "../types/IOrderbookData";
import {IOrderCreator} from "../types/IOrderCreator";
import {ITradeablePair} from "../types/ITradeablePair";
import {IOrder, OrderSide} from "../types/order";
import {Pair} from "../types/pair";

/**
 * The BaseExchange resembles common marketplace functionality
 */
export default abstract class BaseExchange extends EventEmitter implements IExchange {
    currencies: ICurrencyMap = {};
    isAuthenticated = false;
    isCurrenciesLoaded = false;
    protected orderCreator!: IOrderCreator;
    protected candleProcessor!: ICandleProcessor;
    protected candles: Record<string, CandleManager> = {};
    protected readonly connection: IConnection;
    private readonly orderbooks: Record<string, Orderbook> = {};
    private ready = false;

    constructor() {
        super();

        this.connection = this.createConnection();
    }

    abstract onUpdateOrderbook(data: IOrderbookData): void;

    abstract subscribeCandles(pair: Pair, interval: ICandleInterval): void;

    abstract subscribeOrderbook(pair: Pair): void;

    abstract subscribeReports(): void;

    protected abstract createConnection(): IConnection;

    /**
     * Load trading pair configuration
     */
    protected abstract loadCurrencies(): void;

    setOrderCreator(orderCreator: IOrderCreator) {
        this.orderCreator = orderCreator;
    }

    setCandleProcessor(candleProcessor: ICandleProcessor) {
        this.candleProcessor = candleProcessor;
    }

    adjustOrder(order: IOrder, price: number, qty: number) {
        return this.orderCreator.adjustOrder(order, price, qty);
    }

    cancelOrder(order: IOrder) {
        return this.orderCreator.cancelOrder(order);
    }

    createOrder(pair: Pair, price: number, qty: number, side: OrderSide) {
        return this.orderCreator.createOrder(pair, price, qty, side);
    }

    onSnapshotCandles(pair: Pair, data: ICandle[], interval: ICandleInterval) {
        return this.candleProcessor.onSnapshotCandles(pair, data, interval);
    }

    onUpdateCandles(pair: Pair, data: ICandle[], interval: ICandleInterval) {
        return this.candleProcessor.onUpdateCandles(pair, data, interval);
    }

    buy(pair: Pair, price: number, qty: number): void {
        this.createOrder(pair, price, qty, OrderSide.BUY);
    }

    connect(): void {
        this.connection.once("open", () => {
            this.onConnect();
            this.connection.on("open", () => this.onReconnect());
        });
        this.connection.connect();
    }

    destroy(): void {
        this.removeAllListeners();
        this.connection.removeAllListeners();
    }

    getOrderbook(pair: Pair): Orderbook {
        const ticker = pair.join("");
        if (this.orderbooks[ticker]) {
            return this.orderbooks[ticker];
        }

        const currency = this.currencies[ticker];
        if (!currency) throw new Error(`No configuration found for pair: "${ticker}"`);

        const precision = new Decimal(currency.tickSize).decimalPlaces();

        this.orderbooks[ticker] = new Orderbook(pair, precision);
        return this.orderbooks[ticker];
    }

    /**
     * Verify if the exchange is ready and trigger the "ready" event if ready.
     * Can be called multiple times.. it will trigger the "ready" event only once.
     * @returns {boolean}
     */
    isReady(): boolean {
        if (this.ready) return this.ready;

        if (this.isCurrenciesLoaded && this.isAuthenticated) {
            this.ready = true;
            this.emit("ready");
        }

        return this.ready;
    }

    onCurrenciesLoaded(currencies: ITradeablePair[]): void {
        currencies.forEach(currency => this.currencies[currency.id.join("")] = currency);
        this.isCurrenciesLoaded = true;
        this.isReady();
    }

    sell(pair: Pair, price: number, qty: number): void {
        this.createOrder(pair, price, qty, OrderSide.SELL);
    }

    /**
     * Triggers each time the exchange is reconnected to the websocket API
     */
    protected onReconnect(): void {
        // lifecycle event
    }

    /**
     * Triggers the first time the exchange is connected to the websocket API
     */
    protected onConnect(): void {
        // lifecycle event
    }
}
