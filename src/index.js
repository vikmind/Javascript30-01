import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import {App} from './app'
import data from './data'
import makeAudioDriver from './makeAudioDriver';

const main = App

const drivers = {
  DOM: makeDOMDriver('#root'),
  AudioDriver: makeAudioDriver(data),
}

run(main, drivers)
