#target illustrator

(function () {
  var logFile = new File("E:/BrandMasterLowell/carousel/probe-items.txt");
  logFile.open("w");
  function log(message) {
    logFile.writeln(message);
  }
  function bounds(item) {
    var b = item.geometricBounds;
    return (
      Math.round(b[0]) + "," + Math.round(b[1]) + "," + Math.round(b[2]) + "," + Math.round(b[3]) +
      " w" + Math.round(item.width) + " h" + Math.round(item.height)
    );
  }
  try {
    var doc = app.activeDocument;
    log("active " + doc.name);
    log("rasters " + doc.rasterItems.length);
    log("placed " + doc.placedItems.length);
    log("groups " + doc.groupItems.length);
    log("paths " + doc.pathItems.length);
    for (var r = 0; r < doc.rasterItems.length; r++) {
      var raster = doc.rasterItems[r];
      log("raster " + r + " " + bounds(raster) + " name " + raster.name);
    }
    for (var t = 0; t < doc.textFrames.length; t++) {
      var frame = doc.textFrames[t];
      var content = frame.contents.replace(/\r/g, " ");
      if (content.length < 24) {
        log("text " + content + " " + bounds(frame));
      }
    }
    log("DONE");
  } catch (error) {
    log("ERR " + error + " line " + error.line);
  }
  logFile.close();
})();
