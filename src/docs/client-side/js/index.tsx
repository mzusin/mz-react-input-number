import { initMobileMenu } from './menu/mobile-menu';
import { initMenuCollapsible, initMenuScroll } from './menu/side-menu';
import { handleDarkLightModes } from './dark-mode';
import hljs from 'highlight.js';
import particles from 'mz-particles';
import { animationPaths } from './animation/svg-paths';

const initAnimation = () => {
  const $placeholder = document.getElementById('hp-animation');
  if(!$placeholder) return;

  particles({
    $placeholder,
    particlesNumber: 100,

    minSize: 10,
    maxSize: 30,

    particlesColors: [
      '#6bd7c6', '#368c8c', '#aae8db', '#40f18d',
      '#28b26d', '#30E3CA', '#E4F9F5', '#b0fc7e',
      '#ffc400'
    ],
    connectionColor: '#5eb2a6',

    // stars -------------
    svgPathData: animationPaths,

    // effects ------------
    rotate: true,
    // fadeInOut: true,

    // scale effect -------
    scaleInOut: true,
    maxScale: 1.6,
    minScale: 1,
    scaleStep: 0.005,
  });
};

const init = () => {

  const $special = document.getElementById('special-page');
  if($special) {
    initAnimation();

    if(hljs){
      hljs.highlightAll();
    }
    return;
  }

  initMobileMenu();
  initMenuScroll();
  initMenuCollapsible();
  handleDarkLightModes();
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});

export {};
