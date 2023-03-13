import { COUNTRY_FOOD } from '@/constants';
import asianImage from '@assets/category-asian.png';
import chineseImage from '@assets/category-chinese.png';
import etcImage from '@assets/category-etc.png';
import japaneseImage from '@assets/category-japanese.png';
import koreanImage from '@assets/category-korean.png';
import westernImage from '@assets/category-western.png';

interface CategoryImages {
  [COUNTRY_FOOD.asian]: File;
  [COUNTRY_FOOD.chinese]: File;
  [COUNTRY_FOOD.etc]: File;
  [COUNTRY_FOOD.korean]: File;
  [COUNTRY_FOOD.japanese]: File;
  [COUNTRY_FOOD.western]: File;
}

class CategoryImage extends HTMLElement {
  #categoryImage = {
    [COUNTRY_FOOD.asian]: asianImage,
    [COUNTRY_FOOD.chinese]: chineseImage,
    [COUNTRY_FOOD.etc]: etcImage,
    [COUNTRY_FOOD.korean]: koreanImage,
    [COUNTRY_FOOD.japanese]: japaneseImage,
    [COUNTRY_FOOD.western]: westernImage,
  };

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
  }

  static get observedAttributes() {
    return ['category'];
  }

  render() {
    const category = this.getAttribute('category');
    const categoryImage = this.#categoryImage[category as keyof CategoryImages];

    this.shadowRoot!.innerHTML = `
    <div class="category" >
      <img title="${category}" 
      src=${categoryImage} alt=${category}>
    </div>
    `;
  }

  setComponentStyle() {
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

    this.shadowRoot!.append(componentStyle);
  }
}

export default CategoryImage;
