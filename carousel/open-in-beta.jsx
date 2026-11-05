#target illustrator

(function () {
  var logFile = new File("E:/BrandMasterLowell/carousel/open-log.txt");
  logFile.open("w");
  function log(message) {
    logFile.writeln(message);
  }

  try {
    log("version " + app.version);
    log("docs " + app.documents.length);
    for (var i = 0; i < app.documents.length; i++) {
      var openDoc = app.documents[i];
      log("open " + i + " " + openDoc.name);
    }

    var targetName = "Lowell-Klassen-Price-Carousel.ai";
    var doc = null;
    for (var d = 0; d < app.documents.length; d++) {
      if (app.documents[d].name === targetName) {
        doc = app.documents[d];
        break;
      }
    }
    if (!doc) {
      doc = app.open(new File("E:/BrandMasterLowell/carousel/Lowell-Klassen-Price-Carousel.ai"));
      log("opened file");
    } else {
      app.activeDocument = doc;
      log("already open");
    }

    log("active " + doc.name);
    log("color " + doc.documentColorSpace);
    log("artboards " + doc.artboards.length);
    log("text " + doc.textFrames.length);
    for (var a = 0; a < doc.artboards.length; a++) {
      var rect = doc.artboards[a].artboardRect;
      log(
        doc.artboards[a].name +
          " " +
          Math.round(rect[2] - rect[0]) +
          "x" +
          Math.round(rect[1] - rect[3])
      );
    }
    doc.artboards.setActiveArtboardIndex(0);
    app.executeMenuCommand("fitall");
    log("DONE");
  } catch (error) {
    log("ERR " + error + " line " + error.line);
  }
  logFile.close();
})();
