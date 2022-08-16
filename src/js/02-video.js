import Player from '@vimeo/player';
import throttle from 'lodash.throttle';



const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const VIDEOPLAYER_CURRENT_TIME = 'videoplayer-current-time';

// создание const на обработку ошибок
const save = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const getItemKey = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const removeKey = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};



// отслеживает событие timeupdate чере з on
player.on('timeupdate', throttle(onPlay, 1000));

// сохраняет данные в строку в секундах с помошью localStorage.setItem
function onPlay ({seconds}) {
  save(VIDEOPLAYER_CURRENT_TIME, seconds);
}

    if (getItemKey(VIDEOPLAYER_CURRENT_TIME)) {
        player.setCurrentTime(getItemKey(VIDEOPLAYER_CURRENT_TIME));
    };



