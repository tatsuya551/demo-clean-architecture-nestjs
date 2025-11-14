import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { GetEstateTransactionUseCase } from '../get-estate-transaction.usecase';
import { SearchEstateTransactionDto } from '../../controller/dto/search-estate-transaction.dto';
import { EstateTransactionEntity } from '../../domain/entity/estate-transaction.entity';

describe('GetEstateTransactionUseCase', () => {
  let useCase: GetEstateTransactionUseCase;

  const mockRepository = {
    search: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetEstateTransactionUseCase,
        {
          provide: 'EstateTransactionRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetEstateTransactionUseCase>(
      GetEstateTransactionUseCase
    );
  });

  afterEach(() => {
    mockRepository.search.mockReset();
  });

  const createDto = (overrides = {}): SearchEstateTransactionDto => ({
    year: 2015,
    prefCode: 8,
    type: 1,
    ...overrides,
  });

  it('正常系：Repositoryが正しく呼ばれること', () => {
    const expectedResult = [
      new EstateTransactionEntity('8', '茨城県', '1', [
        { year: 2015, value: 40000 },
      ]),
    ];
    mockRepository.search.mockReturnValue(expectedResult);

    const result = useCase.execute(createDto());

    expect(result).toEqual(expectedResult);
    expect(mockRepository.search).toHaveBeenCalled();
  });

  it('異常系：Repositoryでエラーが起こった場合、エラーを返却すること', () => {
    const expectedError = new Error('repository error');
    mockRepository.search.mockImplementation(() => {
      throw expectedError;
    });
    expect(() => useCase.execute(createDto())).toThrow(expectedError);
    expect(mockRepository.search).toHaveBeenCalled();
  });

  describe('バリデーションチェック(year)', () => {
    describe('正常系', () => {
      it.each([2015, 2016, 2017, 2018])(
        '%i年を指定した場合、正常に通過する',
        year => {
          expect(() => useCase.execute(createDto({ year }))).not.toThrow(
            BadRequestException
          );
        }
      );
    });

    describe('異常系', () => {
      it.each([
        [2014, '2015年よりも過去の年'],
        [2019, '2018年よりも未来の年'],
      ])('%s年を指定した場合、%sとしてエラーとなる', year => {
        expect(() => useCase.execute(createDto({ year }))).toThrow(
          BadRequestException
        );
      });
    });
  });

  describe('バリデーションチェック(prefCode)', () => {
    describe('正常系', () => {
      it.each([8, 9, 10, 11, 12, 13, 14])(
        '関東(%i)の場合、正常に通過する',
        prefCode => {
          expect(() => useCase.execute(createDto({ prefCode }))).not.toThrow(
            BadRequestException
          );
        }
      );
    });

    describe('異常系', () => {
      it.each([7, 15, 1, 47])(
        '関東(8〜14)以外の都道府県コード(%i)の場合、エラーとなる',
        prefCode => {
          expect(() => useCase.execute(createDto({ prefCode }))).toThrow(
            BadRequestException
          );
        }
      );
    });
  });

  describe('バリデーションチェック(type)', () => {
    describe('正常系', () => {
      it.each([1, 2])('1：住宅地 2：商業地の場合、正常に通過する', type => {
        expect(() => useCase.execute(createDto({ type }))).not.toThrow(
          BadRequestException
        );
      });
    });

    describe('異常系', () => {
      it.each([3, 4, 5, 6, 7])('他の用地の場合、エラーとなる', type => {
        expect(() => useCase.execute(createDto({ type }))).toThrow(
          BadRequestException
        );
      });
    });
  });
});
