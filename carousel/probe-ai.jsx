#target illustrator

(function () {
  var logFile = new File("E:/BrandMasterLowell/carousel/probe-ai.txt");
  logFile.open("w");
  var doc = app.open(new File("E:/BrandMasterLowell/carousel/Lowell-Klassen-Price-Carousel.ai"));
  logFile.writeln("name " + doc.name);
  logFile.writeln("color " + doc.documentColorSpace);
  logFile.writeln("artboards " + doc.artboards.length);
  logFile.writeln("text " + doc.textFrames.length);
  logFile.writeln("groups " + doc.groupItems.length);
  for (var i = 0; i < doc.artboards.length; i++) {
    var rect = doc.artboards[i].artboardRect;
    logFile.writeln(
      doc.artboards[i].name +
        " " +
        Math.round(rect[2] - rect[0]) +
        "x" +
        Math.round(rect[1] - rect[3])
    );
  }
  doc.close(SaveOptions.DONOTSAVECHANGES);
  logFile.writeln("DONE");
  logFile.close();
})();
