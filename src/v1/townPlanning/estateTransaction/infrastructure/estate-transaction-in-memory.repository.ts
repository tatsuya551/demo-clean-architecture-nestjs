import { Injectable } from '@nestjs/common';
import { EstateTransactionEntity } from '../domain/entity/estate-transaction.entity';
import { EstateTransactionSearchFilter } from '../domain/valueObject/estate-transaction-search-filter.vo';
import { EstateTransactionRepository } from '../repository/estate-transaction.repository.interface';
import data from '../../../../assets/estate_transactions.json';
import { EstateTransactionJsonItem } from 'src/assets/estate_transaction.types';

@Injectable()
export class EstateTransactionInMemoryRepository
  implements EstateTransactionRepository
{
  search(filter: EstateTransactionSearchFilter): EstateTransactionEntity[] {
    const jsonData: EstateTransactionJsonItem[] = data;

    const filtered = jsonData.filter(item => {
      return (
        item.year === filter.year &&
        item.prefectureCode === filter.prefectureCode &&
        item.type === filter.type
      );
    });

    return filtered.map(
      item =>
        new EstateTransactionEntity(
          item.data.result.prefectureCode,
          item.data.result.prefectureName,
          item.data.result.type,
          item.data.result.years
        )
    );
  }
}
