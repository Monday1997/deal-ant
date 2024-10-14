'use strict';

"use strict";
function withInstall(comp) {
  const withInstallComp = comp;
  withInstallComp.install = function(app) {
    if (!comp.name) {
      throw new Error("Component must have a name property.");
    }
    app.component(comp.name, comp);
  };
  return withInstallComp;
}

exports.withInstall = withInstall;
