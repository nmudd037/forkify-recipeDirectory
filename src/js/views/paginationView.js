import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      //console.log(btn);

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      //console.log(goToPage);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //console.log(numPages);
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage + 1);
    }

    // Last Page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage - 1);
    }

    // Other Pages
    if (curPage < numPages) {
      return `
        ${this._generateMarkupButton('prev', curPage - 1)}
        ${this._generateMarkupButton('next', curPage + 1)}
      `;
    }

    // Page 1, and there are no other pages
    return '';
  }

  _generateMarkupButton(btnDirection, pageNumber) {
    return `
        <button data-goto="${pageNumber}" class="btn--inline pagination__btn--${btnDirection}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${
      btnDirection === `prev` ? 'left' : 'right'
    }"></use>
            </svg>
            <span>Page ${pageNumber}</span>
        </button>
    `;
  }
}

export default new PaginationView();
