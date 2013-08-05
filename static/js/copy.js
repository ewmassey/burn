var clip = new ZeroClipboard( document.getElementById("copy-button"), {
  moviePath: "/js/ZeroClipboard.swf"
  });

clip.on( 'complete', function(client, args) {
  this.style.display = "none";
  });