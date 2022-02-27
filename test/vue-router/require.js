(function (win) {
  const modules = {};
  let opts = {};
  win.xrequire = function (module, callback) {
    let arrModuleName;
    if (typeof module === "string") {
      arrModuleName = [module];
    } else if (module instanceof Array) {
      arrModuleName = module;
    } else {
      throw new Error("参数错误");
    }
    const promiseArr = [];
    arrModuleName.forEach((moduleName) => {
      promiseArr.push(appendScript(moduleName));
    });
    Promise.all(promiseArr).then((values) => {
      console.log(values);
      const arrData = [];
      values.forEach((moduleName) => {
        console.log("load=>>" + moduleName);
        const module = modules[moduleName];
        if (module && module.fn) {
          module.fn(function (data) {
            arrData.push(data);
          });
        }
      });
      callback(...arrData);
    });
  };
  function appendScript(moduleName) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = opts[moduleName];
      script.onload = function () {
        resolve(moduleName);
      };
      document.head.appendChild(script);
    });
  }
  win.xdefine = function (moduleName, fn) {
    modules[moduleName] = {
      moduleName: moduleName,
      fn: fn,
    };
  };
  //
  win.xrequireConfig = function (opt) {
    opts = opt; // {modulename:'url'}
  };
})(window);
