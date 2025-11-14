import { Injectable, Inject } from '@nestjs/common';
import type { EstateTransactionRepository } from '../repository/estate-transaction.repository.interface';
import {
  EstateTransactionSearchFilter,
  EstateType,
} from '../domain/valueObject/estate-transaction-search-filter.vo';
import { SearchEstateTransactionDto } from '../controller/dto/search-estate-transaction.dto';

@Injectable()
export class GetEstateTransactionUseCase {
  constructor(
    @Inject('EstateTransactionRepository')
    private readonly repository: EstateTransactionRepository
  ) {}

  execute(dto: SearchEstateTransactionDto) {
    const filter = new EstateTransactionSearchFilter(
      dto.year,
      dto.prefCode,
      dto.type as EstateType
    );

    return this.repository.search(filter);
  }
}
