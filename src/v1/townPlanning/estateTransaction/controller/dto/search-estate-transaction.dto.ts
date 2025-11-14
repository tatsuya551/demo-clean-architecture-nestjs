import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class SearchEstateTransactionDto {
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsInt()
  @IsNotEmpty()
  year: number;

  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsInt()
  @IsNotEmpty()
  prefCode: number;

  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsInt()
  @IsNotEmpty()
  type: number;
}
