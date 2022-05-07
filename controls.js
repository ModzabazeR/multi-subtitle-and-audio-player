const video = document.getElementById("video");
const audio = document.getElementById("audio");

video.onplay = () => {
  audio.currentTime = video.currentTime;
  audio.play();
};
video.onpause = () => {
  audio.pause();
};

const options = {
  video: video, // HTML5 video element
  subUrl: "resources/subtitle/travail_trailer.th.ass", // Link to subtitles
  fonts: ["resources/fonts/browalia.ttc", "resources/fonts/zh-cn.ttf"], // Links to fonts (not required, default font already included in build)
  workerUrl: "subtitles-octopus-worker.js", // Link to WebAssembly-based file "subtitles-octopus-worker.js"
  legacyWorkerUrl: "subtitles-octopus-worker-legacy.js", // Link to legacy JavaScript-based file "subtitles-octopus-worker-legacy.js"
};

const instance = new SubtitlesOctopus(options);

function subtitleHandler() {
  const lang = document.getElementById("subtitle-select").value;
  instance.setTrackByUrl(`resources/subtitle/travail_trailer.${lang}.ass`);
}

function audioHandler() {
  const source = document.getElementById("audioSource");
  const lang = document.getElementById("audio-select").value;

  source.src = `resources/audio/travail_trailer.${lang}.m4a`;

  audio.load();

  audio.addEventListener("loadeddata", () => {
    audio.play();
    audio.currentTime = video.currentTime;
  })
  
}
