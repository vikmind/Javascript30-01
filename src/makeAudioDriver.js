export default function makeAudioDriver(data) {
  const elements = data.map(item => {
    const audioEl = document.createElement('audio');
    audioEl.setAttribute('data-key', item.key);
    audioEl.setAttribute('src', `sounds/${item.sound}.wav`);
    return audioEl;
  });
  document.body.append(...elements);

  return function audioDriver(audios$) {
    audios$.addListener({
      next: code => {
        const audio = document.querySelector(`audio[data-key="${code}"]`);
        audio.currentTime = 0;
        audio.play();
      }
    });
  };
}
