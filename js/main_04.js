'use strict';

document.addEventListener('DOMContentLoaded', function() {
  const pageTitle = document.getElementById('pageTitle');
  const openButton = document.getElementById('open');
  const overlay = document.querySelector('.overlay');
  const closeButton = document.getElementById('close');
  const titleDiv = document.querySelector('.title');
  

  
  // スクロールによるフェードアウト効果
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const maxScroll = window.innerHeight * 0.8;
    pageTitle.style.opacity = Math.max(0, 1 - currentScroll / maxScroll);
  });

  // ハンバーガーメニューの開閉機能
  openButton.addEventListener('click', () => {
    overlay.classList.toggle('show');
    titleDiv.classList.toggle('hide');
    openButton.classList.toggle('hide');
  });

  closeButton.addEventListener('click', () => {
    overlay.classList.remove('show');
    titleDiv.classList.remove('hide');
    openButton.classList.remove('hide');
  });

  // ナビゲーションリンクのクリックイベント
  overlay.querySelectorAll('li a').forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('show');
      titleDiv.classList.remove('hide');
      openButton.classList.remove('hide');
    });
  });

  // カルーセルの制御
  document.querySelectorAll('.photo_category').forEach((carousel) => {
    setupCarousel(carousel);
  });

  function setupCarousel(carousel) {
    let slideIndex = 0;
    const slides = carousel.querySelectorAll('li');
    const totalSlides = slides.length;
    const nextButtons = carousel.querySelectorAll('.next');
    const prevButtons = carousel.querySelectorAll('.prev');
    const dots = [];
    const dotsContainer = carousel.parentElement.querySelector('.carouselButtons'); // 修正：親要素から適切な子要素を参照
    // let currentIndex = 0;

    if (!dotsContainer) {
      console.error("Dots container not found for carousel: ", carousel);
      return; // ここで処理を中断する
    }

  function moveSlides() {
    carousel.querySelector('ul').style.transform = `translateX(-${slideIndex * 100}%)`;
  }

  function setupDots() {
    console.log("Setting up dots for carousel: ", carousel);
    for (let i = 0; i < slides.length; i++) {
      const button = document.createElement('button');
      button.addEventListener('click', () => {
        // currentIndex = i;
        slideIndex = i;
        // dots.forEach(dot => {
        //   dot.classList.remove('current');
        // });
        dots.forEach(dot => dot.classList.remove('current'));
        dots[slideIndex].classList.add('current');
        // dots[currentIndex].classList.add('current');

        updateButtons();
        moveSlides();
      });
      dots.push(button);
      // document.querySelector('.carouselButtons').appendChild(button);

      // デバッグ: dotsContainerの状態を確認
      // if (!dotsContainer) {
      //   console.error("Dots container not found for carousel: ", carousel);
      // } else {
        console.log("Appending button to dots container: ", dotsContainer);
        dotsContainer.appendChild(button);
      }

    if (dots.length > 0) {
      dots[0].classList.add('current');   
    }
  }

  setupDots();
  updateButtons();

  nextButtons.forEach((nextButton) => {
    nextButton.addEventListener('click', () => {
      if (slideIndex < totalSlides -1) {
        slideIndex++;
        moveSlides();
        updateButtons();
      }
    });
  });

  prevButtons.forEach((prevButton) => {
    prevButton.addEventListener('click', () => {
      if (slideIndex > 0) {
        slideIndex--;
        moveSlides();
        updateButtons();
      }
    });
  });

  // ボタンの状態を更新する関数
  function updateButtons() {
    // ここではquerySelectorAllから得られるコレクションをforEachで回して、
    // 個別にスタイルを適用しています。
    prevButtons.forEach(button => {
      button.style.visibility = slideIndex > 0 ? 'visible' : 'hidden';
    });
    nextButtons.forEach(button => {
      button.style.visibility = slideIndex < totalSlides - 1 ? 'visible' : 'hidden';
    });

    // ドットの状態を更新
    dots.forEach((dot, index) => {
      dot.classList.toggle('current', index === slideIndex);
    });
  }

  // 

}
});







