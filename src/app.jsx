import xs from 'xstream'
import data from './data';
import { source } from '@cycle/dom';

export function App (sources) {
  const keys = data.map(item => item.key);
  const userActions$ = xs.merge(
    sources.DOM.select('.key').events('click')
      .map(ev => ev.currentTarget.dataset.key),
    sources.DOM.select('body').events('keydown')
      .map(ev => ev.keyCode.toString()),
  )
    .filter(keyCode => keys.includes(keyCode))
    .map(keyCode => ({ type: 'key', code: keyCode }));

  const action$ = xs.merge(
    userActions$,
    sources.DOM.select('.key').events('transitionend')
      .filter(ev => ev.propertyName === 'transform')
      .map(ev => ev.currentTarget.dataset.key)
      .map(keyCode => ({ type: 'transitionend', code: keyCode }))
  ).startWith({})

  const actionToKeyClassName = (item, action) =>
    action.code === item.key
      ? action.type === 'transitionend'
        ? 'key'
        : action.type === 'key'
          ? 'key playing'
          : 'key'
      : 'key';

  const vtree$ = action$.map(action => (
    <div className="keys">
      { data.map(item => (
        <div className={ actionToKeyClassName(item, action) } data-key={ item.key }>
          <kbd>{ item.letter }</kbd>
          <span className="sound">{ item.sound }</span>
          <audio data-key={ item.key } src={ `sounds/${ item.sound }.wav` }></audio>
        </div>
      )) }
    </div>
  ));

  const audios$ = userActions$.map(action => action.code);

  const sinks = {
    DOM: vtree$,
    AudioDriver: audios$,
  }
  return sinks
}
