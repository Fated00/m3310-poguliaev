(function () {
  window.addEventListener('load', function () {
    setTimeout(() => {
      const navigation = performance.getEntriesByType("navigation")[0];

      const loadTime = navigation.loadEventEnd > 0
        ? (navigation.loadEventEnd - navigation.startTime) / 1000
        : (performance.now() - navigation.startTime) / 1000;

      let loadParagraph = document.querySelector('.page-load__paragraph');
      loadParagraph.append(loadTime + ' seconds.')
    },0);
  });
})();

