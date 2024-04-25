import { c as slot, b as pop, p as push } from "../../chunks/index.js";
function _layout($$payload, $$props) {
  push();
  $$payload.out += `<!--[-->`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _layout as default
};
