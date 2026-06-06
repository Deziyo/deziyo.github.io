/* ==========================================
   面包渣 - 交互脚本
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.getElementById('search');
  var pills = document.querySelectorAll('.pill');
  var cards = document.querySelectorAll('.card');
  var noResults = document.getElementById('no-results');
  var activePill = 'all';

  function filter() {
    var keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var visible = 0;

    cards.forEach(function (card) {
      var tags = card.getAttribute('data-tags') || '';
      var title = card.getAttribute('data-title') || '';
      var summary = card.getAttribute('data-summary') || '';
      var text = title + ' ' + summary + ' ' + tags;

      var catMatch = false;
      if (activePill === 'all') {
        catMatch = true;
      } else {
        catMatch = tags.indexOf(activePill) !== -1;
      }

      var searchMatch = true;
      if (keyword) {
        searchMatch = text.indexOf(keyword) !== -1;
      }

      if (catMatch && searchMatch) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visible === 0 ? 'block' : 'none';
    }
  }

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');
      activePill = this.getAttribute('data-cat') || 'all';
      filter();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filter);
  }
});
