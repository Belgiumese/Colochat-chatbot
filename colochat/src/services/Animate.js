import TWEEN from '@tweenjs/tween.js';

let animationCount = 0;

function animateCall(time) {
  TWEEN.update(time);
  if (animationCount) {
    requestAnimationFrame(animateCall);
  }
}

export default {
  smoothScroll(elem, scrollDistance, easing, time) {
    this.animate(elem, 'scrollTop', scrollDistance, easing, time);
  },

  animate(elem, property, stopVal, easing, time) {
    let initial = { val: elem[property] };
    animationCount++;

    new TWEEN.Tween(initial)
      .to({ val: stopVal }, time)
      .easing(easing)
      .onUpdate(() => {
        elem[property] = initial.val;
      })
      .onComplete(() => animationCount--)
      .start();

    requestAnimationFrame(animateCall);
  },

  easing: TWEEN.Easing
};