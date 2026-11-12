(function () {
  var q = new URLSearchParams(location.search);
  var mode = q.get("mode") || "hen";
  var payload = q.get("payload") ||
    (mode === "goldhen" ? "goldhen.bin" : mode === "hen" ? "hen.bin" : "");
  var url = "launch.html?v=1402s&log=1&afterglow=run&mode=" + encodeURIComponent(mode) +
    (payload ? "&payload=" + encodeURIComponent(payload) : "");
  setTimeout(function () { location.replace(url); }, 1200);
})();
