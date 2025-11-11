document.addEventListener('DOMContentLoaded', function () {
  let currentLocation = document.location.pathname.split('/').pop();
  let menuLinks = document.querySelectorAll('.nav__link');

  for (let link of menuLinks) {
    if (link.getAttribute('href') === currentLocation) {
      link.classList.add('highlight')
    } else {
      link.classList.remove('highlight')
    }
  }
});

