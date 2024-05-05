'use strict';

document.addEventListener('DOMContentLoaded', function () {
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

  // 全体のミュート状態を管理する変数
  let globalMuteState = true;

  // 各動画のミュート状態が変更されたら全体のミュート状態を更新
  document.querySelectorAll('.movies .vid_main').forEach(video => {
    video.addEventListener('volumechange', () => {
      globalMuteState = video.muted; // 現在の動画のミュート状態を保存
    });
  });

  // カルーセルの制御
  function setupCarousel(carousel) {
    let slideIndex = 0;
    const slides = carousel.querySelectorAll('li');
    const totalSlides = slides.length;
    const nextButtons = carousel.querySelectorAll('.next');
    const prevButtons = carousel.querySelectorAll('.prev');
    const dots = [];
    const dotsContainer = carousel.parentElement.querySelector('.carouselButtons');

    if (!dotsContainer) {
      console.error("Dots container not found for carousel:", carousel);
      return;
    }

    // スライドの移動を制御
    function moveSlides() {
      carousel.querySelector('ul').style.transform = `translateX(-${slideIndex * 100}%)`;
      const videos = carousel.querySelectorAll('.vid_main');

      // 全ての動画を停止してから、現在の動画に全体のミュート状態を適用
      videos.forEach(v => {
        v.pause();
        v.currentTime = 0;
        v.muted = true;
      });

      if (videos[slideIndex]) {
        videos[slideIndex].muted = globalMuteState;
        videos[slideIndex].play();
      }

      updateButtons(); // ボタンの状態を更新
    }

    // ドットボタンの設定
    function setupDots() {
      for (let i = 0; i < slides.length; i++) {
        const button = document.createElement('button');
        button.addEventListener('click', () => {
          slideIndex = i;
          dots.forEach(dot => dot.classList.remove('current'));
          dots[slideIndex].classList.add('current');
          moveSlides();
        });
        dots.push(button);
        dotsContainer.appendChild(button);
      }

      if (dots.length > 0) {
        dots[0].classList.add('current');
      }
    }

    setupDots();
    updateButtons(); // 初期表示のため

    // 「次へ」ボタンのクリックイベント
    nextButtons.forEach(nextButton => {
      nextButton.addEventListener('click', () => {
        if (slideIndex < totalSlides - 1) {
          slideIndex++;
          moveSlides();
        }
      });
    });

    // 「前へ」ボタンのクリックイベント
    prevButtons.forEach(prevButton => {
      prevButton.addEventListener('click', () => {
        if (slideIndex > 0) {
          slideIndex--;
          moveSlides();
        }
      });
    });

    // ボタンの状態を更新する関数
    function updateButtons() {
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
  }

  // すべてのカルーセルを設定
  document.querySelectorAll('.photo_category').forEach(setupCarousel);
  document.querySelectorAll('.movies').forEach(setupCarousel);
});
