import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { SearchEstateTransactionDto } from '../search-estate-transaction.dto';

describe('SearchEstateTransactionDto ValidationPipe', () => {
  const pipe = new ValidationPipe({ transform: true });

  it('正常系：正しいDTOは通る', async () => {
    const dto = {
      year: 2015,
      prefCode: 8,
      type: 1,
    };

    const result = (await pipe.transform(dto, {
      type: 'query',
      metatype: SearchEstateTransactionDto,
    })) as SearchEstateTransactionDto;
    expect(result).toEqual(dto);
  });

  it('正常系：文字列が数値に変換される (transform: true)', async () => {
    const stringDto = {
      year: '2015',
      prefCode: '8',
      type: '1',
    };

    const result = (await pipe.transform(stringDto, {
      type: 'query',
      metatype: SearchEstateTransactionDto,
    })) as SearchEstateTransactionDto;
    expect(result.year).toBe(2015);
    expect(typeof result.year).toBe('number');
    expect(result.prefCode).toBe(8);
    expect(result.type).toBe(1);
  });

  it('異常系：クエリパラメータがない場合エラーになる', async () => {
    const invalidDto = {};

    await expect(
      pipe.transform(invalidDto, {
        type: 'query',
        metatype: SearchEstateTransactionDto,
      })
    ).rejects.toThrow(BadRequestException);
  });

  it('異常系：クエリパラメータ(year)がない場合エラーになる', async () => {
    const invalidDto = {
      prefCode: 8,
      type: 1,
    };

    await expect(
      pipe.transform(invalidDto, {
        type: 'query',
        metatype: SearchEstateTransactionDto,
      })
    ).rejects.toThrow(BadRequestException);
  });

  it('異常系：クエリパラメータ(prefCode)がない場合エラーになる', async () => {
    const invalidDto = {
      year: '2015',
      type: '1',
    };

    await expect(
      pipe.transform(invalidDto, {
        type: 'query',
        metatype: SearchEstateTransactionDto,
      })
    ).rejects.toThrow(BadRequestException);
  });

  it('異常系：クエリパラメータ(type)がない場合エラーになる', async () => {
    const invalidDto = {
      year: '2015',
      prefCode: '8',
    };

    await expect(
      pipe.transform(invalidDto, {
        type: 'query',
        metatype: SearchEstateTransactionDto,
      })
    ).rejects.toThrow(BadRequestException);
  });
});
