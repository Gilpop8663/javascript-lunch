import RestaurantList, { Restaurant } from './RestaurantList';
import RestaurantBoxes from '../components/RestaurantBoxes';
import RestaurantTab from '../components/RestaurantTab';
import { DEFAULT_RESTAURANTS, LOCAL_STORAGE_KEY } from '../constants';
import { $ } from '../utils';

class App {
  play() {
    const restaurantList = $('restaurant-boxes') as RestaurantBoxes;

    this.setRestaurantData();
    this.selectEvent();
    restaurantList.drawRestaurants();
  }

  selectEvent() {
    const allTab = $('#allTab') as RestaurantTab;
    const favoriteTab = $('#favoriteTab') as RestaurantTab;
    const restaurantList = $('restaurant-boxes') as RestaurantBoxes;

    favoriteTab.notSelect();

    allTab.addEventListener('click', () => {
      allTab.select();
      favoriteTab.notSelect();
      restaurantList.drawRestaurants();
    });

    favoriteTab.addEventListener('click', () => {
      allTab.notSelect();
      favoriteTab.select();
      restaurantList.drawRestaurants();
    });
  }

  setRestaurantData() {
    const userList: Restaurant[] = RestaurantList.getLocalStorage();

    if (userList.length > 0) return;

    const restaurants = JSON.stringify(DEFAULT_RESTAURANTS);
    localStorage.setItem(LOCAL_STORAGE_KEY, restaurants);
  }
}

export default App;
