/// <reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import './css/html-panel.css!';
import { MetricsPanelCtrl } from 'app/plugins/sdk';
declare class HtmlCtrl extends MetricsPanelCtrl {
    $compile: any;
    static templateUrl: string;
    static scrollable: boolean;
    ngTemplate: any;
    panelDefaults: {
        name: string;
        text: string;
        editorTabIndex: number;
        scroll: boolean;
        config: {
            template: string;
            showTime: boolean;
        };
    };
    pageIndex: number;
    dataRaw: any;
    constructor($scope: any, $injector: any, $compile: any);
    onPanelInitialized(): void;
    onDataReceived(dataList: any): void;
    onDataError(err: any): void;
    onInitEditMode(): void;
    updateTemplate(): void;
    link(scope: any, elem: any, attrs: any, ctrl: any): void;
}
export { HtmlCtrl, HtmlCtrl as PanelCtrl };
