#target illustrator

(function () {
  var logFile = new File("E:/BrandMasterLowell/carousel/swap-log.txt");
  logFile.open("w");
  function log(message) {
    logFile.writeln(message);
  }

  function clean(value) {
    return value.replace(/[\r\n\s]/g, "");
  }

  function isSlideNumber(value) {
    return value === "/9" || (value.length === 1 && value >= "1" && value <= "9");
  }

  try {
    app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
    var doc = app.activeDocument;
    if (doc.name !== "Lowell-Klassen-Price-Carousel.ai") {
      throw new Error("Active document is " + doc.name);
    }

    var portraitFile = new File("E:/BrandMasterLowell/carousel/fonts/profile-circle.png");
    if (!portraitFile.exists) {
      throw new Error("Portrait file is missing");
    }

    var size = 168;
    var inset = 88;
    var slides = [];
    for (var g = 0; g < doc.groupItems.length; g++) {
      if (doc.groupItems[g].name.indexOf("Slide 0") === 0) {
        slides.push(doc.groupItems[g]);
      }
    }
    log("slides " + slides.length);

    for (var s = 0; s < slides.length; s++) {
      var group = slides[s];
      var slideNumber = parseInt(group.name.substring(6), 10);
      var art = doc.artboards[slideNumber - 1].artboardRect;
      var doomed = [];
      for (var i = 0; i < group.pageItems.length; i++) {
        var item = group.pageItems[i];
        if (Math.abs(item.width - 168) < 2 && Math.abs(item.height - 98) < 2) {
          doomed.push(item);
        }
      }
      for (var d = doomed.length - 1; d >= 0; d--) {
        doomed[d].remove();
      }

      var right = art[2] - inset;
      var bottom = art[3] + inset;
      var left = right - size;
      var top = bottom + size;
      var placed = group.placedItems.add();
      placed.file = portraitFile;
      placed.width = size;
      placed.height = size;
      placed.position = [left, top];
      placed.embed();

      var targetCenter = bottom + size / 2;
      var moved = 0;
      for (var t = 0; t < group.textFrames.length; t++) {
        var frame = group.textFrames[t];
        if (!isSlideNumber(clean(frame.contents))) {
          continue;
        }
        var bounds = frame.geometricBounds;
        var center = (bounds[1] + bounds[3]) / 2;
        frame.translate(0, targetCenter - center);
        moved++;
      }
      log(group.name + " removed " + doomed.length + " numbers " + moved + " at " + Math.round(left) + "," + Math.round(top));
    }

    log("rasters " + doc.rasterItems.length);
    for (var r = 0; r < doc.rasterItems.length; r++) {
      var raster = doc.rasterItems[r];
      log("raster " + Math.round(raster.width) + "x" + Math.round(raster.height));
    }

    var exportFolder = new Folder("E:/BrandMasterLowell/carousel/ai-png");
    if (!exportFolder.exists) {
      exportFolder.create();
    }
    var exportOptions = new ExportOptionsPNG24();
    exportOptions.antiAliasing = true;
    exportOptions.transparency = false;
    exportOptions.artBoardClipping = true;
    exportOptions.horizontalScale = 100;
    exportOptions.verticalScale = 100;
    for (var e = 0; e < doc.artboards.length; e++) {
      doc.artboards.setActiveArtboardIndex(e);
      var png = new File("E:/BrandMasterLowell/carousel/ai-png/slide-0" + (e + 1) + ".png");
      doc.exportFile(png, ExportType.PNG24, exportOptions);
      log("exported " + png.name);
    }

    var aiFile = new File("E:/BrandMasterLowell/carousel/Lowell-Klassen-Price-Carousel.ai");
    var saveOptions = new IllustratorSaveOptions();
    saveOptions.pdfCompatible = true;
    saveOptions.compressed = true;
    saveOptions.compatibility = Compatibility.ILLUSTRATOR24;
    doc.saveAs(aiFile, saveOptions);
    doc.artboards.setActiveArtboardIndex(0);
    app.executeMenuCommand("fitall");
    log("saved " + aiFile.length);
    log("DONE");
  } catch (error) {
    log("ERR " + error + " line " + error.line);
  }
  logFile.close();
})();
