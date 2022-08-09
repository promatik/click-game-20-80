import { query } from 'cantil';
import 'normalize.css/normalize.css';
import 'milligram/src/milligram.sass';
import './index.scss';

const samples = 40;
const red = query('button.red');
const green = query('button.green');
let results;
let list;

// random hits
window.init = () => {
  results = [];
  list = Array(samples / 5).fill(0)
    .concat(Array((samples / 5) * 4).fill(1))
    .sort(() => 0.5 - Math.random());
  queryAll('.results .grid, .results p').forEach(e => e.innerHTML = '');
};

window.click = status => {
  if (!list.length) return;

  const light = list.pop();
  const result = light === status;
  results.push(result);

  // light up the button
  (light ? green : red).classList.add('light');
  setTimeout(() => {
    query('.light')?.classList.remove('light');
  }, 400);

  const span = document.createElement('span');
  span.innerHTML = result ? '🍪' : '⚡';
  query('.results .grid').appendChild(span);

  // end game
  if (!list.length) {
    const success = results.filter(e => e).length;
    query('.results p').innerHTML = `${success} / ${samples}<br />${(success * 100) / samples}%`;
  }
};

// init
window.init();
