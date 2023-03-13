import RestaurantList, {
  CategoryAll,
  Restaurant,
} from '../domain/RestaurantList';
import { $ } from '../utils';
import FilterBox from './FilterBox';
import RestaurantBox from './RestaurantBox';
import RestaurantTab from './RestaurantTab';

class RestaurantBoxes extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
  }

  drawRestaurants() {
    const categoryFilter = $('#categoryFilter') as FilterBox;
    const sortingFilter = $('#sortingFilter') as FilterBox;
    const favoriteTab = $('#favoriteTab') as RestaurantTab;

    const categoryValue = categoryFilter.getSelectValue() as CategoryAll;
    const sortingValue = sortingFilter.getSelectValue();

    const englishSortingValue = sortingValue === '이름순' ? 'name' : 'distance';

    const filteredList = RestaurantList.getList(
      categoryValue,
      englishSortingValue
    );

    if (favoriteTab.isSelect()) {
      const favoriteRestaurant = filteredList.filter(
        (restaurant) => restaurant.isFavorite === true
      );
      this.restaurantListRender(favoriteRestaurant);
      return;
    }

    this.restaurantListRender(filteredList);
  }

  getRestaurant(restaurant: Restaurant) {
    const restaurantBox = document.createElement(
      'restaurant-box'
    ) as RestaurantBox;
    restaurantBox.update(restaurant);

    return restaurantBox;
  }

  restaurantListRender(restaurants: Restaurant[]) {
    const list = this.shadowRoot!.querySelector(
      '#restaurantList'
    ) as HTMLUListElement;

    list.innerHTML = '';

    if (restaurants.length === 0) {
      list.innerHTML = '<div class="empty">음식점 목록이 비었습니다</div>';
      return;
    }

    restaurants.forEach((restaurant: Restaurant) => {
      const restaurantTemplate = this.getRestaurant(restaurant);
      this.shadowRoot!.querySelector('#restaurantList')?.insertAdjacentElement(
        'beforeend',
        restaurantTemplate
      );
    });
  }

  render() {
    this.shadowRoot!.innerHTML = '<ul id="restaurantList"></ul>';
  }

  setComponentStyle() {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
        ul {
          display: flex;
          flex-direction: column;
          position:relative;
          top:200px;
          padding: 0 16px;
          margin: 16px 0;
        }
        
        .empty{
          display:flex;
          justify-content:center;
          align-items:center;
          height:400px;
          font-weight: 400;
          font-size: 18px;
          line-height: 24px;
        }
      
        `;

    this.shadowRoot!.append(componentStyle);
  }
}

export default RestaurantBoxes;
