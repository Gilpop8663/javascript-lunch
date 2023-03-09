import { COUNTRY_FOOD } from '../constants/index.ts';
import koreanImage from '../assets/category-korean.png';
import chineseImage from '../assets/category-chinese.png';
import japaneseImage from '../assets/category-japanese.png';
import westernImage from '../assets/category-western.png';
import asianImage from '../assets/category-asian.png';
import etcImage from '../assets/category-etc.png';

class CategoryImage extends HTMLElement {
  #categoryImage = {
    [COUNTRY_FOOD.korean]: koreanImage,
    [COUNTRY_FOOD.chinese]: chineseImage,
    [COUNTRY_FOOD.japanese]: japaneseImage,
    [COUNTRY_FOOD.western]: westernImage,
    [COUNTRY_FOOD.asian]: asianImage,
    [COUNTRY_FOOD.etc]: etcImage,
  };

  attributeChangedCallback(name) {
    if (name === 'category') {
      this.connectedCallback();
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
      .category {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 64px;
        height: 64px;
        min-width: 64px;
        min-height: 64px;
      
        margin-right: 16px;
      
        border-radius: 50%;
        background: var(--lighten-color);
      }
      
      img {
        width: 36px;
        height: 36px;
      }
`;

    const category = this.getAttribute('category');

    this.shadowRoot.innerHTML = `
    <div class="category">
      <img src=${this.#categoryImage[category]} alt=${category}>
    </div>
    `;

    this.shadowRoot.append(componentStyle);
  }

  static get observedAttributes() {
    return ['category'];
  }
}

export default CategoryImage;
