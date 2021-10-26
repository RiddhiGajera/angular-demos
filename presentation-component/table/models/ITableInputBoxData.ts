
export interface ITableInputBoxData {
    name: string;
    type: string;
    value: string | number;
    text?: string;
    class?: string;
    min?: number;
    max?: number;
    step?: number;
    disableKeyDown?: boolean;
}
