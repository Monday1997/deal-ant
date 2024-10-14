'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var antDesignVue = require('ant-design-vue');
var button = require('./button.js');
var pluginVue_exportHelper = require('../../../_virtual/plugin-vue_export-helper.js');

const _sfc_main = vue.defineComponent({
  ...{
    name: "DbBtn"
  },
  __name: "button",
  props: button.buttonProps,
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.unref(antDesignVue.Button), {
        type: props.type || "primary"
      }, {
        default: vue.withCtx(() => [
          vue.createTextVNode("64")
        ]),
        _: 1
        /* STABLE */
      }, 8, ["type"]);
    };
  }
});
var Button = /* @__PURE__ */ pluginVue_exportHelper.default(_sfc_main, [["__file", "button.vue"]]);

exports.default = Button;
