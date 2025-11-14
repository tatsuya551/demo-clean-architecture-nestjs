import { BadRequestException } from '@nestjs/common';

const ESTATE_TRANSACTION_TYPES = [1, 2] as const; // 1：住宅地 2：商業地

export type EstateType = (typeof ESTATE_TRANSACTION_TYPES)[number];

export const ESTATE_TRANSACTION_RULES = {
  YEAR: { MIN: 2015, MAX: 2018 },
  PREF_CODE: { MIN: 8, MAX: 14 }, // 関東地域
  TYPE: ESTATE_TRANSACTION_TYPES,
} as const;

export class EstateTransactionSearchFilter {
  constructor(
    readonly year: number,
    readonly prefectureCode: number,
    readonly type: EstateType
  ) {
    this.validateOrThrow();
  }

  private validateOrThrow(): void {
    const { YEAR, PREF_CODE, TYPE } = ESTATE_TRANSACTION_RULES;

    if (this.year < YEAR.MIN || this.year > YEAR.MAX) {
      throw new BadRequestException(
        `Invalid year: ${this.year}. Allowed range is ${YEAR.MIN}-${YEAR.MAX}.`
      );
    }

    if (
      this.prefectureCode < PREF_CODE.MIN ||
      this.prefectureCode > PREF_CODE.MAX
    ) {
      throw new BadRequestException(
        `Invalid prefectureCode: ${this.prefectureCode}. Allowed range is ${PREF_CODE.MIN}-${PREF_CODE.MAX}.`
      );
    }

    if (!TYPE.includes(this.type)) {
      throw new BadRequestException(
        `Invalid type: ${this.type}. Allowed values are ${TYPE.join(', ')}.`
      );
    }
  }
}
