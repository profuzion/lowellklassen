#target illustrator

(function () {
  app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
  for (var i = app.documents.length - 1; i >= 0; i--) {
    try {
      var doc = app.documents[i];
      if (doc.name.indexOf("Untitled") === 0) {
        doc.close(SaveOptions.DONOTSAVECHANGES);
      }
    } catch (error) {}
  }
  app.quit();
})();
