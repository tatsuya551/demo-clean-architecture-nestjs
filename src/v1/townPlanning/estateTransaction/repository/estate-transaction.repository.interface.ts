import { EstateTransactionEntity } from '../domain/entity/estate-transaction.entity';
import { EstateTransactionSearchFilter } from '../domain/valueObject/estate-transaction-search-filter.vo';

export interface EstateTransactionRepository {
  search(filter: EstateTransactionSearchFilter): EstateTransactionEntity[];
}
