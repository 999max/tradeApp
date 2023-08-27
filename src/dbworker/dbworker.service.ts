import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';
import { SecurityService } from '../security/security.service';
import { Security } from '../security/security.entity';
import { TradeService } from '../trade/trade.service';

@Injectable()
export class CleanService {
  constructor(
    private securityService: SecurityService,
    private tradeService: TradeService,
  ) {
    // clean every day at 00:00
    new CronJob('0 0 * * *', this.cleanup.bind(this)).start();

    // sample data at server start
    this.sampleData();
  }

  async cleanup(): Promise<void> {
    try {
      await this.securityService.removeAll();
      await this.tradeService.removeAll();
      console.log('Tables cleared at', new Date().toUTCString());
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }

  async sampleData(): Promise<void> {
    const existingSecurity = await this.securityService.findAllLimited(1);
    if (existingSecurity.length > 0) {
      return;
    }

    const codes = ['AAPL', 'YNDX', 'UGMK', 'SNP500'];
    const securities: Security[] = [];
    for (const code of codes) {
      const security = new Security();
      security.seccode = code;
      security.price = (Math.random() * 1000).toFixed(2);
      security.isin = `010203${code}`;
      security.lotsize = 10;
      await this.securityService.create(security);
      securities.push(security);
    }

    for (const security of securities) {
      for (let i = 1; i < 3; i++) {
        await this.tradeService.create({
          size: 10 + Math.floor(Math.random() * 20) + 1,
          side: i,
          security: security.id,
          client: `Client ${i}${security.id}`,
        });
      }
    }
  }
}
