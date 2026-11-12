/* Missing in the repo as uploaded (index.html loads it, but it is not there).
   Sends the landing page straight to the run page: the referrer index.html is
   what lets jb-g.js arm the chain, so go.html must not sit in between. */
setTimeout(function () {
  location.replace("launch.html?v=1402s&log=1&afterglow=run&mode=kpstep");
}, 1200);
