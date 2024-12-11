var options = {
  preload: "auto",
  fluit: true,
  width: 640,
  height: 360,
  responsive: "true",
  loop: true,
  muted: true,
};

var player = videojs('intro-vid', options)

function toggleSoundOnDoubleClick(event) {
  event.preventDefault();

  if (player.muted()) {
    player.muted(false); 
  } else {
    player.muted(true); 
  }
}

player.el().addEventListener('dblclick', toggleSoundOnDoubleClick);