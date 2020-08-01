// !second variant how to export file
// const videoPlayerInit = () => {
//    console.log('videoPlayer');
// };
// export default videoPlayer;

export const videoPlayerInit = () => {
   const videoPlayer = document.querySelector('.video-player');
   const videoButtonPlay = document.querySelector('.video-button__play');
   const videoButtonStop = document.querySelector('.video-button__stop');
   const videoProgress = document.querySelector('.video-progress');
   const videoTimePassed = document.querySelector('.video-time__passed');
   const videoTimeTotal = document.querySelector('.video-time__total');
   const videoVolume = document.querySelector('.video-volume');

   //change the icon of the video player
   const toggleIcon = () => {
      //we have two classes with different icons and need to change them when video play
      // or stop
      if (videoPlayer.paused) {
         videoButtonPlay.classList.remove('fa-pause');
         videoButtonPlay.classList.add('fa-play');
      } else {
         videoButtonPlay.classList.add('fa-pause');
         videoButtonPlay.classList.remove('fa-play');
      }
   }
   const togglePlay = () => {
      //if video paused start play() , else pause()
      (videoPlayer.paused) ? videoPlayer.play() : videoPlayer.pause();
   };

   const stopPlay = () => {
      //stop video and made time = 0
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
   };

   //if n < 10 add zero to n-variable else stay like before
   const addZero = n => n < 10 ? '0' + n : n;

   //добавляет слушатель клик на функцию togglePlay
   videoPlayer.addEventListener('click', togglePlay);
   videoButtonPlay.addEventListener('click', togglePlay);

   //change icon from play to pause and vice versa
   videoPlayer.addEventListener('play', toggleIcon);
   videoPlayer.addEventListener('pause', toggleIcon);

   videoButtonStop.addEventListener('click', stopPlay);

   //this listener change time of our video
   videoPlayer.addEventListener('timeupdate', () => {
      //countdown from start
      const currentTime = videoPlayer.currentTime;
      //maximum time of video
      const duration = videoPlayer.duration;

      //вычисляем прогресс видео чтобы белый ползунок двигался вместе с секундами видео
      videoProgress.value = (currentTime / duration) * 100;

      //count full minutes and second from start
      let minutePassed = Math.floor(currentTime / 60);
      let secondsPassed = Math.floor(currentTime % 60);
      //count maximum video time
      let minuteTotal = Math.floor(duration / 60);
      let secondsTotal = Math.floor(duration % 60);

      //add minutes and second to our player
      //replace the initial values ​​with the ones we counted
      videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
      videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
   });

   //change progress of video(сделать активной полоску прогресса видео)
   videoProgress.addEventListener('change', () => {
      const duration = videoPlayer.duration;
      const value = videoProgress.value;

      //изменяем currentTime чтобы видео переключилось в нужный нам моент
      videoPlayer.currentTime = (value * duration) / 100;
   });

   //add volume for our video player
   videoVolume.addEventListener('input', () => {
      //так как значение videoVolume изменяется от 0 до 100
      //а здесь нам надо изменения от 0 до 1 производим вычисления
      videoPlayer.volume = videoVolume.value / 100;
   });
   //set the initial value of volume
   videoPlayer.volume = 0.3;
   videoVolume.value = videoPlayer.volume * 100;

   videoPlayerInit.stop = () => {
      if (!videoPlayer.paused) {
         stopPlay();
      }
   }
};
