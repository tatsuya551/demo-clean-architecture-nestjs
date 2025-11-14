export interface EstateTransactionYearData {
  year: number;
  value: number;
}

export interface EstateTransactionResultData {
  prefectureCode: string;
  prefectureName: string;
  type: string;
  years: EstateTransactionYearData[];
}

export interface EstateTransactionData {
  result: EstateTransactionResultData;
}

export interface EstateTransactionJsonItem {
  year: number;
  prefectureCode: number;
  type: number;
  data: EstateTransactionData;
}

export type EstateTransactionJson = EstateTransactionJsonItem[];
