#target illustrator

(function () {
  var logFile = new File("E:/BrandMasterLowell/carousel/ai-log.txt");
  logFile.open("w");
  function log(message) {
    logFile.writeln(message);
  }

  function closeOwnDocuments() {
    for (var i = app.documents.length - 1; i >= 0; i--) {
      try {
        var openDoc = app.documents[i];
        var name = openDoc.name;
        if (
          name.indexOf("Lowell-Klassen") === 0 ||
          name.indexOf("Untitled") === 0 ||
          name.indexOf("page-0") === 0
        ) {
          openDoc.close(SaveOptions.DONOTSAVECHANGES);
          log("closed " + name);
        }
      } catch (closeError) {
        log("close skip " + closeError);
      }
    }
  }

  function selectAll(pageDoc) {
    pageDoc.selection = null;
    for (var i = 0; i < pageDoc.pageItems.length; i++) {
      pageDoc.pageItems[i].selected = true;
    }
  }

  function groupSelection(doc, name) {
    if (doc.selection.length === 0) {
      throw new Error("Nothing selected for " + name);
    }
    var group = doc.groupItems.add();
    group.name = name;
    var selected = [];
    for (var s = 0; s < doc.selection.length; s++) {
      selected.push(doc.selection[s]);
    }
    for (var m = selected.length - 1; m >= 0; m--) {
      selected[m].move(group, ElementPlacement.PLACEATBEGINNING);
    }
    doc.selection = null;
    return group;
  }

  function alignGroup(group, artboardRect) {
    var bounds = group.geometricBounds;
    group.translate(artboardRect[0] - bounds[0], artboardRect[1] - bounds[1]);
  }

  try {
    app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
    log("version " + app.version);
    closeOwnDocuments();

    var doc = app.open(new File("E:/BrandMasterLowell/carousel/pages/page-01.pdf"));
    doc.artboards[0].name = "Slide 01";
    var first = doc.artboards[0].artboardRect;
    var boardWidth = first[2] - first[0];
    var gap = 160;
    log("base " + Math.round(boardWidth) + "x" + Math.round(first[1] - first[3]));

    selectAll(doc);
    var firstGroup = groupSelection(doc, "Slide 01");
    var original = doc.artboards[0].artboardRect;
    log("original rect " + original[0] + "," + original[1] + "," + original[2] + "," + original[3]);
    var shiftX = 0 - original[0];
    var shiftY = 1350 - original[1];
    firstGroup.translate(shiftX, shiftY);
    doc.artboards[0].artboardRect = [0, 1350, 1080, 0];
    log("grouped slide 01 items moved, text " + doc.textFrames.length);

    for (var a = 1; a < 9; a++) {
      var column = a % 3;
      var row = Math.floor(a / 3);
      var left = column * (1080 + gap);
      var top = 1350 - row * (1350 + gap);
      var rect = [left, top, left + 1080, top - 1350];
      doc.artboards.add(rect);
      doc.artboards[a].name = "Slide 0" + (a + 1);
      log("added " + doc.artboards[a].name + " at " + left + "," + top);
    }
    log("artboards " + doc.artboards.length);

    for (var p = 2; p <= 9; p++) {
      var pageDoc = app.open(new File("E:/BrandMasterLowell/carousel/pages/page-0" + p + ".pdf"));
      var sources = [];
      for (var s = 0; s < pageDoc.pageItems.length; s++) {
        sources.push(pageDoc.pageItems[s]);
      }
      log("slide " + p + " sources " + sources.length);
      app.activeDocument = doc;
      doc.artboards.setActiveArtboardIndex(p - 1);
      var copies = [];
      for (var c = 0; c < sources.length; c++) {
        copies.push(sources[c].duplicate(doc.layers[0], ElementPlacement.PLACEATEND));
      }
      pageDoc.close(SaveOptions.DONOTSAVECHANGES);
      app.activeDocument = doc;
      var group = doc.groupItems.add();
      group.name = "Slide 0" + p;
      for (var m = copies.length - 1; m >= 0; m--) {
        copies[m].move(group, ElementPlacement.PLACEATBEGINNING);
      }
      alignGroup(group, doc.artboards[p - 1].artboardRect);
      log("placed slide " + p + " " + Math.round(group.width) + "x" + Math.round(group.height));
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
    doc.saveAs(aiFile, saveOptions);
    log("saved " + aiFile.length);
    log("DONE");
  } catch (error) {
    log("ERR " + error + " line " + error.line);
  }

  logFile.close();
})();
