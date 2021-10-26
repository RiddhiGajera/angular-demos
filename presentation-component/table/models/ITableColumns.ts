import {ITableLinks} from "presentation-component/table/models/ITableLinks";
import {ITableCheckboxData} from "presentation-component/table/models/ITableCheckboxData";
import {ITableRowActionData} from "presentation-component/table/models/ITableRowActionData";
import {ITableInputBoxData} from "presentation-component/table/models/ITableInputBoxData";


export interface ITableColumns {
  field: string;
  header: string;
  order?: number;
  class?: string;
  width?: string;
  pipe?: string;
  render?: Record<string, any>;
  showShort?: boolean;
  isHtml?: boolean;
  showComponent?: boolean;
  componentName?: string;
  componentData?:
    | ITableLinks
    | ITableCheckboxData
    | ITableRowActionData
    | ITableInputBoxData;
  action?: string;
  rowSpan?: number;
}
