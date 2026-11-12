/* Fehlte im Repo (index.html laedt sie). Referrer index.html ist das, was die
   Kette scharf macht -- deshalb direkt auf launch.html, nicht ueber go.html.
   index.html?mode=hen | ?mode=kpstep | ?mode=goldhen   zusaetzlich: &reuse=1 &mem=1..5 */
(function () {
  var q = new URLSearchParams(location.search);
  var mode = q.get("mode") || "hen";
  var payload = q.get("payload") ||
    (mode === "goldhen" ? "goldhen.bin" : mode === "hen" ? "hen.bin" : "");
  var url = "launch.html?v=1402s&log=1&afterglow=run&mode=" + encodeURIComponent(mode) +
    (payload ? "&payload=" + encodeURIComponent(payload) : "");
  ["reuse", "mem", "attempts"].forEach(function (k) {
    var v = q.get(k);
    if (v) url += "&" + k + "=" + encodeURIComponent(v);
  });
  setTimeout(function () { location.replace(url); }, 1200);
})();
