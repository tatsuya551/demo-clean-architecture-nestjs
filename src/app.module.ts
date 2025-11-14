import { Module } from '@nestjs/common';
import { EstateTransactionModule } from './v1/townPlanning/estateTransaction/estate-transaction.module';

@Module({
  imports: [EstateTransactionModule],
})
export class AppModule {}
