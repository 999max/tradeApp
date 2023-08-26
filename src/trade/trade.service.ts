import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter } from 'events';
import { Trade } from './trade.entity';
import { CreateTradeDto } from './dto/create-trade.dto';
import { SecurityService } from '../security/security.service';

@Injectable()
export class TradeService {
  private newTradeEvent = new EventEmitter();

  constructor(
    @InjectRepository(Trade)
    private tradeRepository: Repository<Trade>,
    private securityService: SecurityService,
  ) {}

  getTradeEmitter() {
    return this.newTradeEvent;
  }

  async findById(id: number): Promise<Trade> {
    return this.tradeRepository.findOneBy({ id });
  }

  async create(createTradeDto: CreateTradeDto): Promise<Trade> {
    const { size, side, security: securityId, client } = createTradeDto;
    // fetch actual price from db
    const security = await this.securityService.findById(securityId);
    if (!security) {
      throw new Error(`Security with ID ${securityId} not found`);
    }
    if (size < security.lotsize) {
      throw new Error(
        `The min lot size is ${security.lotsize}: ${size} requested.`,
      );
    }
    const trade = await this.tradeRepository.save({
      price: security.price,
      size,
      side,
      security: securityId,
      client,
    });

    this.newTradeEvent.emit('newTrade', trade);

    return trade;
  }

  async removeAll(): Promise<void> {
    await this.tradeRepository.clear();
    // reset id
    await this.tradeRepository.query(
      'ALTER SEQUENCE trade_id_seq RESTART WITH 1',
    );
  }
}
