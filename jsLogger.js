window.console=(function(origConsole){

    if(!window.console || !origConsole)
      origConsole = {};
    var isDebug=false,
    stack = [];
    
    return {
        log: function(){
          isDebug ?
            origConsole.log && origConsole.log.apply(origConsole,arguments) :
            stack.push({type: "log", arguments: arguments});
        },
        warn: function(){
          isDebug ?
            origConsole.warn && origConsole.warn.apply(origConsole,arguments) :
            stack.push({type: "warn", arguments: arguments});
        },
        error: function(){
          isDebug ?
            origConsole.error && origConsole.error.apply(origConsole,arguments) :
            stack.push({type: "error", arguments: arguments});
        },
        info: function(v){
          isDebug ?
            origConsole.info && origConsole.info.apply(origConsole,arguments) :
            stack.push({type: "info", arguments: arguments});
        },
        debug: function(bool){
          isDebug = bool;
        },
        stack: function(){
          /* Logs all hidden logs and clears stack */
          var old = stack;
          stack = [];
          
          old.forEach(function(logEntry) {
            origConsole[logEntry.type] &&
              origConsole[logEntry.type].apply(origConsole, logEntry.arguments);
          });
          
          return old;
        }
    };

}(window.console));
