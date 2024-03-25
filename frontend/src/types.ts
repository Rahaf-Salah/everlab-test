export type FileUploaderProps = {
  onUpload: (file: File) => void;
};
export type RisksTableProps = {
  rows: RiskTableRow[];
};
export type RiskTableRow = {
  conditions: string[];
  name: string;
  diagnostic: string;
  group: string;
  value: string;
  unit: string;
  low: number;
  high: number;
};
