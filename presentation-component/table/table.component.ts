import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { filter, isEmpty } from 'lodash';
import { Table } from 'primeng/table';
import { ITableColumns } from 'projects/frontend/src/app/dashboard/geo-doe-config/models';
import { ITableConfig } from 'projects/frontend/src/app/dashboard/geo-doe-config/models/ITableConfig';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('dt') dt: Table;
  @Input() columns: ITableColumns[];
  @Input() data: Record<string, any>[] = [];
  @Input() tableConfig?: ITableConfig;
  @Input() searchData?: { searchValue: string; searchType: string };
  @Output() selectedData? = new EventEmitter();
  @Output() rowAction? = new EventEmitter();
  @Output() tableInstance? = new EventEmitter();
  selectedRowData: Record<string, any>[] = [];
  globalFilterFields: string[] = [];
  showHeader = true;
  showGlobalFilter = false;
  emptyMessage = '';
  scrollHeight = '80px';
  checkBoxColWidth = '3rem';

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.tableInstance.emit(this.dt);
  }

  ngOnChanges(): void {
    if (this.tableConfig) {
      const {
        emptyMessage,
        showHeader,
        selection,
        selectAll,
        defaultSelectedData,
        selectionFieldName,
        globalFilterFields,
        scrollHeight
      } = this.tableConfig;

      this.scrollHeight =
        scrollHeight && !isEmpty(this.data)
          ? scrollHeight
          : isEmpty(this.data)
          ? '80px'
          : this.scrollHeight;

      this.emptyMessage =
        emptyMessage !== '' ? emptyMessage : this.emptyMessage;

      this.showHeader = showHeader !== undefined ? showHeader : true;

      if (selection && selectAll) {
        this.selectedRowData = this.data;
        this.selectRow();
      } else if (defaultSelectedData) {
        if (selectionFieldName) {
          const selectedData = defaultSelectedData.map(
            (data) => data[selectionFieldName]
          );
          this.selectedRowData = !isEmpty(this.data)
            ? filter(this.data, (obj) =>
                selectedData.includes(obj[selectionFieldName])
              )
            : [];
        } else {
          this.selectedRowData = defaultSelectedData;
        }
      } else {
        this.selectedRowData = [];
      }
      if (globalFilterFields) {
        this.globalFilterFields = globalFilterFields;
        this.showGlobalFilter = true;
      }
    }

    if (this.searchData) {
      const { searchType, searchValue } = this.searchData;
      this.dt.filterGlobal(searchValue, searchType);
    }
  }

  selectRow(): void {
    this.selectedData.emit(this.selectedRowData);
  }

  rowActions(event: unknown, rowData: unknown, action: string): void {
    const data = { event, data: rowData, action };
    this.rowAction.emit(data);
  }

  disableRowSelection(
    tableConfig: ITableConfig,
    rowData: Record<string, any>
  ): boolean {
    if (tableConfig && tableConfig.disableSelection) {
      return tableConfig.disableSelection;
    } else if (rowData && rowData.rowCheckboxDisable) {
      return rowData.rowCheckboxDisable;
    } else {
      return false;
    }
  }

  includesRowIndex(index: number): boolean {
    if (this.tableConfig && this.tableConfig.colIndexesForRowSpan) {
      return this.tableConfig.colIndexesForRowSpan.includes(index);
    }
    return false;
  }

  asCols(cols: unknown): ITableColumns[] {
    return cols as ITableColumns[];
  }
}
