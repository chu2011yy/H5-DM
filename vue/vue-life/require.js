(function(win){
    const modules = {};
    win.require = function(url,moduleName,callback){
        const script = document.createElement('script');
        script.src = url;
        // document.head.appendChild(`<script src="${moduleName}" onload="scriptLoad()"></script>`)
        script.onload = function(sss) {
            console.log('load=>>'+moduleName);
            const module = modules[moduleName];
            if (module && module.fn ) {
                module.fn(function(data){
                    callback(data)
                });
            }
        }
        document.head.appendChild(script)
    }
    win.define = function(moduleName,fn){
        modules[moduleName] = {
            moduleName:moduleName,
            fn: fn
        }
    }
})(window)