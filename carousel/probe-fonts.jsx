#target illustrator

(function () {
  var logFile = new File("E:/BrandMasterLowell/carousel/font-probe.txt");
  logFile.open("w");
  function log(message) {
    logFile.writeln(message);
  }

  try {
    app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
    log("version " + app.version);
    log("name " + app.name);
    log("fonts " + app.textFonts.length);

    var wanted = ["Manrope-Bold", "Montserrat-Bold", "Montserrat Bold", "Inter-Regular", "Inter Regular", "Montserrat-SemiBold", "Inter-Bold"];
    for (var w = 0; w < wanted.length; w++) {
      try {
        var found = app.textFonts.getByName(wanted[w]);
        log("FOUND " + wanted[w] + " -> " + found.name + " / " + found.family + " / " + found.style);
      } catch (missing) {
        log("MISSING " + wanted[w]);
      }
    }

    var hits = 0;
    for (var i = 0; i < app.textFonts.length; i++) {
      var font = app.textFonts[i];
      var blob = font.name;
      if (blob.indexOf("Montserrat") !== -1 || blob.indexOf("Inter") !== -1 || blob.indexOf("Manrope") !== -1) {
        log("LIST " + font.name + " || " + font.family + " || " + font.style);
        hits++;
      }
    }
    log("list hits " + hits);

    var logoFile = new File("E:/PFS/Projects/_LowellKlassen/Logo/_deploy/ldk_logomark_light.svg");
    log("logo exists " + logoFile.exists);

    var doc = app.documents.add(DocumentColorSpace.RGB, 1080, 1350, 1);
    var placed = doc.placedItems.add();
    placed.file = logoFile;
    log("placed " + Math.round(placed.width) + "x" + Math.round(placed.height));
    placed.embed();
    log("after embed pageItems " + doc.pageItems.length + " selection " + doc.selection.length);
    if (doc.selection.length > 0) {
      log("sel0 " + doc.selection[0].typename + " " + Math.round(doc.selection[0].width) + "x" + Math.round(doc.selection[0].height));
    }
    doc.close(SaveOptions.DONOTSAVECHANGES);
    log("DONE");
  } catch (error) {
    log("ERR " + error + " line " + error.line);
  }
  logFile.close();
})();
