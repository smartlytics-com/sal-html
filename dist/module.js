System.register(["jquery", "lodash", "./css/html-panel.css!", "app/plugins/sdk"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var jquery_1, lodash_1, sdk_1, HtmlCtrl;
    return {
        setters: [
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (_1) {
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }
        ],
        execute: function () {
            HtmlCtrl = (function (_super) {
                __extends(HtmlCtrl, _super);
                function HtmlCtrl($scope, $injector, $compile) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.$compile = $compile;
                    _this.ngTemplate = null;
                    _this.panelDefaults = {
                        name: 'Echo Service with Template',
                        text: 'Format the response with an angular template',
                        editorTabIndex: 2,
                        scroll: true,
                        config: {
                            template: "\n                <div ng-if=\"response && !response[0].columns\"> \n                  Default: \n                 \n                  <div ng-repeat=\"item in response\"> \n                    <div ng-repeat=\"datapoint in item.datapoints\"> \n                      {{ datapoint }} \n                    </div> \n                  </div> \n                </div> \n                \n                <div ng-if=\"response && response[0].columns\"> \n                  MySQL columns: \n                 \n                  <div ng-repeat=\"item in response\">\n                    <div ng-repeat=\"column in item.columns\">\n                      {{ column.text }}\n                    </div>\n                  </div>\n                </div>\n            ",
                            showTime: true,
                        },
                    };
                    lodash_1.default.defaults(_this.panel, _this.panelDefaults.config);
                    _this.events.on('panel-initialized', _this.onPanelInitialized.bind(_this));
                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.events.on('data-received', _this.onDataReceived.bind(_this));
                    _this.events.on('data-error', _this.onDataError.bind(_this));
                    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
                    _this.onDataReceived.bind(_this);
                    return _this;
                }
                HtmlCtrl.prototype.onPanelInitialized = function () {
                    var _this = this;
                    this.updateTemplate();
                    jquery_1.default(window).on('resize', lodash_1.default.debounce(function (fn) {
                        _this.refresh();
                    }, 150));
                };
                HtmlCtrl.prototype.onDataReceived = function (dataList) {
                    this.dataRaw = dataList;
                    this.pageIndex = 0;
                    this.$scope.response = this.dataRaw;
                    this.render();
                };
                HtmlCtrl.prototype.onDataError = function (err) {
                    this.dataRaw = [];
                    this.render();
                };
                HtmlCtrl.prototype.onInitEditMode = function () {
                    this.addEditorTab('Display', 'public/plugins/' + this.pluginId + '/partials/editor.display.html', 2);
                };
                HtmlCtrl.prototype.updateTemplate = function () {
                    if (!this.panel.template) {
                        this.panel.template = '<pre>{{ response }}</pre>';
                    }
                    this.ngTemplate.html(this.panel.template);
                    this.$compile(this.ngTemplate.contents())(this.$scope);
                    if (this.$scope.response) {
                        this.render();
                        this.refresh();
                    }
                };
                HtmlCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
                    this.ngTemplate = jquery_1.default(elem.find('.ngTemplate')[0]);
                };
                HtmlCtrl.templateUrl = 'partials/module.html';
                HtmlCtrl.scrollable = true;
                return HtmlCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("HtmlCtrl", HtmlCtrl);
            exports_1("PanelCtrl", HtmlCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map