import { Test, TestingModule } from '@nestjs/testing';
import { EstateTransactionController } from '../estate-transaction.controller';
import { GetEstateTransactionUseCase } from '../../usecase/get-estate-transaction.usecase';
import { EstateTransactionEntity } from '../../domain/entity/estate-transaction.entity';

describe('EstateTransactionController', () => {
  let controller: EstateTransactionController;

  const mockUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EstateTransactionController],
      providers: [
        {
          provide: GetEstateTransactionUseCase,
          useValue: mockUseCase,
        },
      ],
    }).compile();

    controller = app.get<EstateTransactionController>(
      EstateTransactionController
    );
  });

  afterEach(() => {
    mockUseCase.execute.mockReset();
  });

  const dto = { year: 2015, prefCode: 8, type: 1 };

  describe('search', () => {
    it('正常系：UseCaseが正しく呼ばれること', () => {
      const expectedResult = [
        new EstateTransactionEntity('8', '茨城県', '1', [
          { year: 2015, value: 40000 },
        ]),
      ];
      mockUseCase.execute.mockReturnValue(expectedResult);

      const result = controller.get(dto);

      expect(mockUseCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toBe(expectedResult);
    });

    it('異常系：UseCaseでエラーが起こった場合、エラーを返却すること', () => {
      const expectedError = new Error('usecase error');
      mockUseCase.execute.mockImplementation(() => {
        throw expectedError;
      });

      expect(() => controller.get(dto)).toThrow(expectedError);
      expect(mockUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });
});
