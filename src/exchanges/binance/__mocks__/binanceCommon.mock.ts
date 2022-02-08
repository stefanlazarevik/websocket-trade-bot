import { EventType, ExecutionReport, ExecutionType, Order, OrderRejectReason, OrderSide, OrderStatus, OrderType, TimeInForce } from 'binance-api-node'

export const mockCommonMarketBuyOrderResponse: Order = {
  symbol: 'BTCUSDT',
  orderId: 7510602297,
  orderListId: -1, //Unless OCO, value will be -1
  clientOrderId: 'C5Y3nTK24OQpnbwNYXhMUO',
  transactTime: 1582542000000,
  price: '0.00000000',
  origQty: '1.00000000',
  executedQty: '1.00000000',
  cummulativeQuoteQty: '1.00000000',
  isWorking: true,
  updateTime: 1582542000000,
  time: 1582542000000,
  status: <OrderStatus>'FILLED',
  timeInForce: <TimeInForce>'GTC',
  type: <OrderType>'MARKET',
  side: <OrderSide>'BUY',
  fills: [
    {
      tradeId: 1,
      price: '9800.00000000',
      qty: '1.00000000',
      commission: '9.80000000',
      commissionAsset: 'USDT'
    }
  ]
};

export const mockCommonMarketSellOrderResponse: Order = {
  symbol: 'BTCUSDT',
  orderId: 7510602298,
  orderListId: -1, //Unless OCO, value will be -1
  clientOrderId: 'd3j3NZQ99OQpnbwNYXhMUO',
  transactTime: 1582545600000,
  price: '0.00000000',
  origQty: '1.00000000',
  executedQty: '1.00000000',
  cummulativeQuoteQty: '1.00000000',
  isWorking: true,
  updateTime: 1582545600000,
  time: 1582545600000,
  status: <OrderStatus>'FILLED',
  timeInForce: <TimeInForce>'GTC',
  type: <OrderType>'MARKET',
  side: <OrderSide>'SELL',
  fills: [
    {
      tradeId: 1,
      price: '9750.42000000',
      qty: '1.00000000',
      commission: '9.80000000',
      commissionAsset: 'USDT'
    }
  ]
};

export const mockCommonLimitNewBuyOrder = (report?: Partial<ExecutionReport>): ExecutionReport => ({
  eventType: <EventType.EXECUTION_REPORT>'executionReport',
  eventTime: 1582549200000,
  symbol: 'BTCUSDT',
  newClientOrderId: 'web_4a64263cfd544a6c8ed40856dc9fee04',
  originalClientOrderId: '',
  side: <OrderSide>'BUY',
  orderType: <OrderType>'LIMIT',
  timeInForce: <TimeInForce>'GTC',
  quantity: '1.00000000',
  price: '9700.00000000',
  executionType: <ExecutionType>'NEW',
  stopPrice: '0.00000000',
  icebergQuantity: '0.00000000',
  orderStatus: <OrderStatus>'NEW',
  orderRejectReason: <OrderRejectReason>'NONE',
  orderId: 7510602299,
  orderTime: 1582549200000,
  lastTradeQuantity: '0.00000000',
  totalTradeQuantity: '0.00000000',
  priceLastTrade: '0.00000000',
  commission: '0',
  commissionAsset: null,
  tradeId: -1,
  isOrderWorking: true,
  isBuyerMaker: false,
  creationTime: 1582549200000,
  totalQuoteTradeQuantity: '0.00000000',
  orderListId: -1,
  quoteOrderQuantity: '0.00000000',
  lastQuoteTransacted: '0.00000000',
  ...report
});

export const mockCommonLimitFilledBuyOrder = (report?: Partial<ExecutionReport>): ExecutionReport => ({
  eventType: <EventType.EXECUTION_REPORT>'executionReport',
  eventTime: 1582549260000,
  symbol: 'BTCUSDT',
  newClientOrderId: 'web_4a64263cfd544a6c8ed40856dc9fee04',
  originalClientOrderId: '',
  side: <OrderSide>'BUY',
  orderType: <OrderType>'LIMIT',
  timeInForce: <TimeInForce>'GTC',
  quantity: '1.00000000',
  price: '9700.00000000',
  executionType: <ExecutionType>'TRADE',
  stopPrice: '0.00000000',
  icebergQuantity: '0.00000000',
  orderStatus: <OrderStatus>'FILLED',
  orderRejectReason: <OrderRejectReason>'NONE',
  orderId: 7510602299,
  orderTime: 1582549200000,
  lastTradeQuantity: '1.00000000',
  totalTradeQuantity: '0.00000000',
  priceLastTrade: '0.00000000',
  commission: '0.00100000',
  commissionAsset: 'BTC',
  tradeId: -1,
  isOrderWorking: true,
  isBuyerMaker: false,
  creationTime: 1582549200000,
  totalQuoteTradeQuantity: '0.00000000',
  orderListId: -1,
  quoteOrderQuantity: '0.00000000',
  lastQuoteTransacted: '0.00000000',
  ...report
});

export const mockCommonLimitNewSellOrder = (report?: Partial<ExecutionReport>): ExecutionReport => ({
  eventType: <EventType.EXECUTION_REPORT>'executionReport',
  eventTime: 1582552800000,
  symbol: 'BTCUSDT',
  newClientOrderId: 'web_4a64263cfd544a6c8ed40856dc9fee04',
  originalClientOrderId: '',
  side: <OrderSide>'SELL',
  orderType: <OrderType>'LIMIT',
  timeInForce: <TimeInForce>'GTC',
  quantity: '1.00000000',
  price: '9800.00000000',
  executionType: <ExecutionType>'NEW',
  stopPrice: '0.00000000',
  icebergQuantity: '0.00000000',
  orderStatus: <OrderStatus>'NEW',
  orderRejectReason: <OrderRejectReason>'NONE',
  orderId: 7510602300,
  orderTime: 1582552800000,
  lastTradeQuantity: '0.00000000',
  totalTradeQuantity: '0.00000000',
  priceLastTrade: '0.00000000',
  commission: '0',
  commissionAsset: null,
  tradeId: -1,
  isOrderWorking: true,
  isBuyerMaker: false,
  creationTime: 1582552800000,
  totalQuoteTradeQuantity: '0.00000000',
  orderListId: -1,
  quoteOrderQuantity: '0.00000000',
  lastQuoteTransacted: '0.00000000',
  ...report
});

export const mockCommonLimitFilledSellOrder = (report?: Partial<ExecutionReport>): ExecutionReport => ({
  eventType: <EventType.EXECUTION_REPORT>'executionReport',
  eventTime: 1582552860000,
  symbol: 'BTCUSDT',
  newClientOrderId: 'web_4a64263cfd544a6c8ed40856dc9fee04',
  originalClientOrderId: '',
  side: <OrderSide>'SELL',
  orderType: <OrderType>'LIMIT',
  timeInForce: <TimeInForce>'GTC',
  quantity: '1.00000000',
  price: '9800.00000000',
  executionType: <ExecutionType>'TRADE',
  stopPrice: '0.00000000',
  icebergQuantity: '0.00000000',
  orderStatus: <OrderStatus>'FILLED',
  orderRejectReason: <OrderRejectReason>'NONE',
  orderId: 7510602300,
  orderTime: 1582552800000,
  lastTradeQuantity: '1.00000000',
  totalTradeQuantity: '0.00000000',
  priceLastTrade: '0.00000000',
  commission: '9.80000000',
  commissionAsset: 'USDT',
  tradeId: -1,
  isOrderWorking: true,
  isBuyerMaker: false,
  creationTime: 1582552800000,
  totalQuoteTradeQuantity: '0.00000000',
  orderListId: -1,
  quoteOrderQuantity: '0.00000000',
  lastQuoteTransacted: '0.00000000',
  ...report
});
