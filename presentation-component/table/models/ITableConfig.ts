export interface ITableConfig {
  selection: boolean;
  selectAll: boolean;
  defaultSelectedData?: Record<string, any>[];
  disableSelection?: boolean;
  showCheckbox: boolean;
  showShort: boolean;
  showHeader?: boolean;
  globalFilterFields?: string[];
  emptyMessage?: string;
  selectionFieldName?: string;
  scrollHeight?: string;
  colIndexesForRowSpan?: number[];
}

