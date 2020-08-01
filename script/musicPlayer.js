import { addZero } from './supportScript.js';

export const musicPlayerInit = () => {

   const audio = document.querySelector('.audio');
   const audioImg = document.querySelector('.audio-img');
   const audioHeader = document.querySelector('.audio-header');
   const audioPlayer = document.querySelector('.audio-player');
   const audioNavigation = document.querySelector('.audio-navigation');
   const audioButtonPlay = document.querySelector('.audio-button__play');
   const audioProgress = document.querySelector('.audio-progress');
   const audioProgressTiming = document.querySelector('.audio-progress__timing');
   const audioTimePassed = document.querySelector('.audio-time__passed');
   const audioTimeTotal = document.querySelector('.audio-time__total');
   const musicVolume = document.querySelector('.audio-volume');

   //create array with all music
   const playList = ['hello', 'flow', 'speed'];

   let trackIndex = 0;

   const loadTrack = () => {
      const isPlayed = audioPlayer.paused;
      const track = playList[trackIndex];

      audioImg.src = `./audio/${track}.jpg`;
      audioHeader.textContent = track.toUpperCase();
      audioPlayer.src = `./audio/${track}.mp3`;

      //проверка для определения была ли музыка во время переключения трека
      //если да то после переключения сразу же включится след трек
      //если нет то будет на паузе
      if (isPlayed) {
         audioPlayer.pause();
      } else {
         audioPlayer.play();
      }
   }

   const prevTrack = () => {
      if (trackIndex) {
         trackIndex--;
      } else {
         trackIndex = playList.length - 1;
      }
      loadTrack();
   }

   const nextTrack = () => {
      if (trackIndex === playList.length - 1) {
         trackIndex = 0;
      } else {
         trackIndex++;
      }
      loadTrack();
   }

   //при помощи дилегирования определяем какая кнопка нажата и что сделать дальше
   audioNavigation.addEventListener('click', event => {
      const target = event.target;

      //если нужный нам класс находиться в таргете то мы...
      if (target.classList.contains('audio-button__play')) {
         audio.classList.toggle('play');
         audioButtonPlay.classList.toggle('fa-play');
         audioButtonPlay.classList.toggle('fa-pause');

         const track = playList[trackIndex];
         audioHeader.textContent = track.toUpperCase();
      }

      (audioPlayer.paused) ? audioPlayer.play() : audioPlayer.pause();

      //условия для переключения трека при помощи кнопок prev next
      if (target.classList.contains('audio-button__next')) {
         nextTrack();
      }

      if (target.classList.contains('audio-button__prev')) {
         prevTrack();
      }
   });

   //if last track ended switch to next track
   audioPlayer.addEventListener('ended', () => {
      nextTrack();
      audioPlayer.play();
   });

   audioPlayer.addEventListener('timeupdate', () => {
      const duration = audioPlayer.duration;
      const currentTime = audioPlayer.currentTime;
      const progress = (currentTime / duration) * 100;

      //change progress bar by changing width;
      audioProgressTiming.style.width = progress + '%';

      const minutesPassed = Math.floor(currentTime / 60) || '0';
      const secondPassed = Math.floor(currentTime % 60) || '0';

      const minutesTotal = Math.floor(duration / 60) || '0';
      const secondTotal = Math.floor(duration % 60) || '0';

      audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondPassed)}`;
      audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondTotal)}`;
   });

   audioProgress.addEventListener('click', event => {
      //get coordinate of track
      const x = event.offsetX;
      //получаем ширину линии состояния трека, чтобы можно было вычилсить координаты точки на которую можно перейти
      const allWidth = audioProgress.clientWidth;
      const progress = (x / allWidth) * audioPlayer.duration;
      //перезаписываем переменную чтобы timeupdate шел именно с этой секунды
      audioPlayer.currentTime = progress;
   });

   musicVolume.addEventListener('input', () => {
      audioPlayer.volume = musicVolume.value / 100;
   });

   audioPlayer.volume = 0.3;
   musicVolume.value = audioPlayer.volume * 100;

   musicPlayerInit.stop = () => {
      if (!audioPlayer.paused) {
         audioPlayer.pause();
         audio.classList.remove('play');
         audioButtonPlay.classList.remove('fa-pause');
         audioButtonPlay.classList.add('fa-play');
      }
   }
}