#target illustrator

(function () {
  var logFile = new File("E:/BrandMasterLowell/carousel/ai-log.txt");
  logFile.open("w");
  try {
    app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
    var source = new File("E:/BrandMasterLowell/carousel/Lowell-Klassen-Price-Carousel.ai");
    var doc = app.open(source);
    var options = new IllustratorSaveOptions();
    options.pdfCompatible = true;
    options.compressed = true;
    options.compatibility = Compatibility.ILLUSTRATOR24;
    doc.saveAs(source, options);
    logFile.writeln("saved " + source.length);
    logFile.writeln("artboards " + doc.artboards.length);
    logFile.writeln("text " + doc.textFrames.length);
    logFile.writeln("color " + doc.documentColorSpace);
    for (var i = 0; i < doc.artboards.length; i++) {
      logFile.writeln(doc.artboards[i].name);
    }
    doc.close(SaveOptions.DONOTSAVECHANGES);
    logFile.writeln("DONE");
  } catch (error) {
    logFile.writeln("ERR " + error + " line " + error.line);
  }
  logFile.close();
})();
