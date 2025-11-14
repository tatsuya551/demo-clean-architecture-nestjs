import { Module } from '@nestjs/common';
import { EstateTransactionController } from './controller/estate-transaction.controller';
import { GetEstateTransactionUseCase } from './usecase/get-estate-transaction.usecase';
import { EstateTransactionInMemoryRepository } from './infrastructure/estate-transaction-in-memory.repository';

@Module({
  controllers: [EstateTransactionController],
  providers: [
    GetEstateTransactionUseCase,
    {
      provide: 'EstateTransactionRepository',
      useClass: EstateTransactionInMemoryRepository,
    },
  ],
  exports: [GetEstateTransactionUseCase],
})
export class EstateTransactionModule {}
