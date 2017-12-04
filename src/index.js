import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import {App} from './app'

const main = App

const drivers = {
  DOM: makeDOMDriver('#root'),
  AudioDriver: function(audios$) {
    audios$.addListener({
      next: code => {
        const audio = document.querySelector(`audio[data-key="${code}"]`);
        audio.currentTime = 0;
        audio.play();
      }
    });
  },
}

run(main, drivers)
