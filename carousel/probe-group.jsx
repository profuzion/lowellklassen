#target illustrator

(function () {
  var logFile = new File("E:/BrandMasterLowell/carousel/probe-group.txt");
  logFile.open("w");
  function log(message) {
    logFile.writeln(message);
  }
  function walk(item, depth) {
    var pad = "";
    for (var i = 0; i < depth; i++) pad += "  ";
    var kind = item.typename;
    var extra = "";
    try {
      extra = " " + Math.round(item.width) + "x" + Math.round(item.height);
    } catch (e) {}
    if (kind === "TextFrame") extra += " [" + item.contents.substring(0, 24).replace(/\r/g, " ") + "]";
    if (kind === "GroupItem") extra += " clipped " + item.clipped + " name " + item.name;
    log(pad + kind + extra);
    if (kind === "GroupItem") {
      for (var c = 0; c < item.pageItems.length; c++) walk(item.pageItems[c], depth + 1);
    }
  }
  try {
    var doc = app.activeDocument;
    for (var g = 0; g < doc.groupItems.length; g++) {
      var group = doc.groupItems[g];
      if (group.name === "Slide 01" || group.name === "Slide 02") walk(group, 0);
    }
    log("DONE");
  } catch (error) {
    log("ERR " + error + " line " + error.line);
  }
  logFile.close();
})();
