import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';

//get all buttons
const playerBtn = document.querySelectorAll('.player-btn');
//get all blocks refers to buttons
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

//function to remove class active from unavailable elements
const deactivationPlayer = () => {
   //hide element
   temp.style.display = 'none';
   playerBtn.forEach((item) => {
      item.classList.remove('active');
   });
   playerBlock.forEach((item) => {
      item.classList.remove('active');
   });

   musicPlayerInit.stop();
   videoPlayerInit.stop();
   radioPlayerInit.stop();
};

playerBtn.forEach((btn, i) => {
   //принимает в себя каждую кнопку по отдельности и ставит слушатель
   btn.addEventListener('click', () => {
      deactivationPlayer();
      //add class active for each btn
      btn.classList.add('active');
      //add class active for each block refers to btn
      playerBlock[i].classList.add('active');
   })
});

videoPlayerInit();
musicPlayerInit();
radioPlayerInit();
