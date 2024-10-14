import { defineComponent, openBlock, createBlock, unref, withCtx, createTextVNode } from 'vue';
import { Button as Button$1 } from 'ant-design-vue';
import { buttonProps } from './button.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';

const _sfc_main = defineComponent({
  ...{
    name: "DbBtn"
  },
  __name: "button",
  props: buttonProps,
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Button$1), {
        type: props.type || "primary"
      }, {
        default: withCtx(() => [
          createTextVNode("64")
        ]),
        _: 1
        /* STABLE */
      }, 8, ["type"]);
    };
  }
});
var Button = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "button.vue"]]);

export { Button as default };
