import { Controller, Get, Param, Post, Body, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { TradeService } from './trade.service';
import { Trade } from './trade.entity';
import { CreateTradeDto } from './dto/create-trade.dto';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Get()
  async subscribeNewTrades(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const tradeEmitter = this.tradeService.getTradeEmitter();
    const listener = (trade: Trade) => {
      res.write('event: newTrade\n');
      res.write(`data: ${JSON.stringify(trade)}\n\n`);
    };
    tradeEmitter.on('newTrade', listener);

    req.on('close', () => {
      tradeEmitter.removeListener('newTrade', listener);
    });
  }

  // @todo remove for production?
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Trade> {
    return this.tradeService.findById(id);
  }

  @Post()
  async create(@Body() trade: CreateTradeDto): Promise<Trade> {
    return this.tradeService.create(trade);
  }
}
