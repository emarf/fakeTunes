export const radioPlayerInit = () => {
   const radio = document.querySelector('.radio');
   const radioCoverImg = document.querySelector('.radio-cover__img');
   const radioHeaderBig = document.querySelector('.radio-header__big');
   const radioNavigation = document.querySelector('.radio-navigation');
   const radioItem = document.querySelectorAll('.radio-item');
   const radioStop = document.querySelector('.radio-stop');
   const radioVolume = document.querySelector('.radio-volume');

   const audio = new Audio();
   audio.type = 'audio/aac';

   //make a button stop disabled
   radioStop.disabled = true;

   const changeIconPlay = () => {
      if (audio.paused) {
         //add or remove class play for animation
         radio.classList.remove('play')

         radioStop.classList.remove('fa-play');
         radioStop.classList.add('fa-pause');
      } else {
         radio.classList.add('play')

         radioStop.classList.remove('fa-pause');
         radioStop.classList.add('fa-play');
      }
   }

   const selectItem = elem => {
      //delete class from the previous item
      radioItem.forEach(item => item.classList.remove('select'));
      elem.classList.add('select');
   }
   //для того чтобы найти нужную нам радиостанцию используем event, но так как все радиостанции это input
   //нам надо найти тот на который мы кликнули, для этого используется свойство event.target
   radioNavigation.addEventListener('change', event => {
      const target = event.target;
      //находим все вложенные элементы в radio-item
      const parent = target.closest('.radio-item');
      selectItem(parent);

      //add to const name of radio station
      const title = parent.querySelector('.radio-name').textContent;
      //replace headerBig and name of the station
      radioHeaderBig.textContent = title;

      const urlImg = parent.querySelector('.radio-img').src;
      radioCoverImg.src = urlImg;

      //disabled button
      radioStop.disabled = false;
      //path to radio url
      audio.src = target.dataset.radioStation;
      //start the radio station
      audio.play();
      changeIconPlay();
   });

   radioStop.addEventListener('click', () => {
      (audio.paused) ? audio.play() : audio.pause();
      changeIconPlay();
   });

   radioVolume.addEventListener('input', () => {
      audio.volume = radioVolume.value / 100;
   });


   audio.volume = 0.3;
   radioVolume.value = audio.volume * 100;

   radioPlayerInit.stop = () => {
      audio.pause();
      changeIconPlay();
   }
};