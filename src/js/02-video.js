import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// отслеживает событие timeupdate чере з on
player.on('timeupdate', throttle(onPlay, 1000));

// сохраняет данные в строку в секундах с помошью localStorage.setItem
function onPlay ({seconds}) {
    localStorage.setItem('videoplayer-current-time', seconds)
};

player.setCurrentTime(
    JSON.parse(localStorage.getItem('videoplayer-current-time'))
)


