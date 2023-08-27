import { Module, forwardRef } from '@nestjs/common';
import { CleanService } from './dbworker.service';
import { TradeModule } from 'src/trade/trade.module';
import { SecurityModule } from 'src/security/security.module';

@Module({
  imports: [SecurityModule, TradeModule],
  providers: [CleanService],
})
export class DbWorkerModule {}
