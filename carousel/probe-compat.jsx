#target illustrator

(function () {
  var logFile = new File("E:/BrandMasterLowell/carousel/probe-compat.txt");
  logFile.open("w");
  for (var n = 20; n <= 32; n++) {
    var name = "ILLUSTRATOR" + n;
    try {
      var value = Compatibility[name];
      logFile.writeln(name + " = " + value);
    } catch (error) {
      logFile.writeln(name + " missing");
    }
  }
  logFile.writeln("DONE");
  logFile.close();
})();
