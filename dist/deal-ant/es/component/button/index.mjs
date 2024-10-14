import '../../utils/index.mjs';
import Button from './src/button.vue.mjs';
import { withInstall } from '../../utils/with-install.mjs';

"use strict";
const daButton = withInstall(Button);

export { daButton, daButton as default };
