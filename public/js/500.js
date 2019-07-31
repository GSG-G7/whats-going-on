function s() {
  setTimeout(() => {
    document.querySelector('body').classList.remove('loading');
  }, 1000);
}

s();
