export class EstateTransactionEntity {
  constructor(
    readonly prefectureCode: string,
    readonly prefectureName: string,
    readonly type: string,
    readonly years: { year: number; value: number }[]
  ) {}
}
