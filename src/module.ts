///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import $ from 'jquery';
import _ from 'lodash';
import './css/html-panel.css!';
import {MetricsPanelCtrl} from 'app/plugins/sdk';

class HtmlCtrl extends MetricsPanelCtrl {
  static templateUrl = 'partials/module.html';
  static scrollable = true;

  ngTemplate: any = null;

  panelDefaults = {
    name: 'Echo Service with Template',
    text: 'Format the response with an angular template',
    editorTabIndex: 2,
    scroll: true,
    config: {
      template: `
                <div ng-if="response && !response[0].columns"> 
                  Default: 
                 
                  <div ng-repeat="item in response"> 
                    <div ng-repeat="datapoint in item.datapoints"> 
                      {{ datapoint }} 
                    </div> 
                  </div> 
                </div> 
                
                <div ng-if="response && response[0].columns"> 
                  MySQL columns: 
                 
                  <div ng-repeat="item in response">
                    <div ng-repeat="column in item.columns">
                      {{ column.text }}
                    </div>
                  </div>
                </div>
            `,
      showTime: true,
    },
  };

  pageIndex: number;
  dataRaw: any;

  constructor($scope, $injector, public $compile) {
    super($scope, $injector);

    _.defaults(this.panel, this.panelDefaults.config);

    this.events.on('panel-initialized', this.onPanelInitialized.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));

    this.onDataReceived.bind(this);
  }

  onPanelInitialized() {
    this.updateTemplate();

    $(window).on(
      'resize',
      _.debounce(fn => {
        this.refresh();
      }, 150)
    );
  }

  onDataReceived(dataList) {
    this.dataRaw = dataList;
    this.pageIndex = 0;

    this.$scope.response = this.dataRaw;

    this.render();
  }

  onDataError(err) {
    this.dataRaw = [];
    this.render();
  }

  onInitEditMode() {
    this.addEditorTab(
      'Display',
      'public/plugins/' + this.pluginId + '/partials/editor.display.html',
      2
    );
  }

  updateTemplate() {
    if (!this.panel.template) {
      this.panel.template = '<pre>{{ response }}</pre>';
    }

    this.ngTemplate.html(this.panel.template);
    this.$compile(this.ngTemplate.contents())(this.$scope);

    if (this.$scope.response) {
      this.render();
      this.refresh();
    }
  }

  link(scope, elem, attrs, ctrl) {
    this.ngTemplate = $(elem.find('.ngTemplate')[0]);
  }
}

export {HtmlCtrl, HtmlCtrl as PanelCtrl};
