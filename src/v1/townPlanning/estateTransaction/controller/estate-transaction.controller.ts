import { Controller, Get, Query } from '@nestjs/common';
import { GetEstateTransactionUseCase } from './../usecase/get-estate-transaction.usecase';
import { EstateTransactionEntity } from '../domain/entity/estate-transaction.entity';
import { SearchEstateTransactionDto } from './dto/search-estate-transaction.dto';

@Controller('v1/townPlanning/estateTransaction')
export class EstateTransactionController {
  constructor(private readonly usecase: GetEstateTransactionUseCase) {}

  @Get('bar')
  get(@Query() dto: SearchEstateTransactionDto): EstateTransactionEntity[] {
    return this.usecase.execute(dto);
  }
}
