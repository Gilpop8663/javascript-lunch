import RestaurantList, {
  Category,
  Distance,
  Restaurant,
} from '../domain/RestaurantList';
import { $ } from '../utils';
import AddRestaurantModal from './AddRestuarntModal';
import AddSelect from './AddSelect';
import DescriptionInput from './DescriptionInput';
import LinkInput from './LinkInput';
import NameInput from './NameInput';
import RestaurantBoxes from './RestaurantBoxes';

class AddRestaurantForm extends HTMLElement {
  addRestaurantEvent() {
    this.shadowRoot!.querySelector('#addRestraunt')?.addEventListener(
      'click',
      (event) => {
        event.preventDefault();

        const { category, name, distance, description, link, isFavorite } =
          this.getFormValues();

        if (this.isError()) {
          return;
        }

        const restaurant: Restaurant = {
          category: category as Category,
          name,
          distance: distance,
          description,
          link,
          isFavorite: Boolean(isFavorite),
        };

        const restaurants = RestaurantList.getLocalStorage();
        const isDuplicate =
          restaurants.length > 0
            ? restaurants.find((res: Restaurant) => res.name === name)
            : false;

        if (isDuplicate) {
          const nameInput = this.shadowRoot!.querySelector(
            '#name'
          ) as NameInput;
          nameInput.showErrorMessage('음식점 목록에 이미 존재하는 식당입니다.');

          return;
        }

        RestaurantList.add(restaurant);

        this.resetForm();

        const addRestaurantModal = $(
          '#addRestaurantModal'
        ) as AddRestaurantModal;

        const list = $('restaurant-boxes') as RestaurantBoxes;

        addRestaurantModal.closeModal();

        list.drawRestaurants();
      }
    );
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
    this.addRestaurantEvent();
    this.closeModalEvent();
  }

  closeModalEvent() {
    this.shadowRoot!.querySelector('#cancelModal')?.addEventListener(
      'click',
      () => {
        const addRestaurantModal = $(
          'add-restaurant-modal'
        ) as AddRestaurantModal;

        addRestaurantModal.closeModal();
      }
    );
  }

  getFormValues() {
    const categorySelect = this.shadowRoot!.querySelector(
      '#category'
    ) as AddSelect;
    const nameInput = this.shadowRoot!.querySelector('#name') as NameInput;
    const distanceSelect = this.shadowRoot!.querySelector(
      '#distance'
    ) as AddSelect;
    const descriptionInput = this.shadowRoot!.querySelector(
      '#description'
    ) as DescriptionInput;
    const linkInput = this.shadowRoot!.querySelector('#link') as LinkInput;

    const category = categorySelect.getSelectValue() as Category;
    const name = nameInput.getTextValue();
    const distance = Number(distanceSelect.getSelectValue()) as Distance;
    const description = descriptionInput.getTextValue();
    const link = linkInput.getTextValue();

    return { category, name, distance, description, link, isFavorite: false };
  }

  isError() {
    const categorySelect = this.shadowRoot!.querySelector(
      '#category'
    ) as AddSelect;
    const nameInput = this.shadowRoot!.querySelector('#name') as NameInput;
    const distanceSelect = this.shadowRoot!.querySelector(
      '#distance'
    ) as AddSelect;
    const descriptionInput = this.shadowRoot!.querySelector(
      '#description'
    ) as DescriptionInput;
    const linkInput = this.shadowRoot!.querySelector('#link') as LinkInput;

    const categoryError = categorySelect.isError();
    if (categoryError) {
      categorySelect.showErrorMessage();
      return true;
    }

    const nameError = nameInput.getErrorKind();
    if (nameError) {
      nameInput.showErrorMessage(nameError);
      return true;
    }

    const distanceError = distanceSelect.isError();
    if (distanceError) {
      distanceSelect.showErrorMessage();
      return true;
    }

    const descriptionError = descriptionInput.getErrorKind();
    if (descriptionError) {
      descriptionInput.showErrorMessage(descriptionError);
      return true;
    }

    const linkError = linkInput.getErrorKind();
    if (linkError) {
      linkInput.showErrorMessage(linkError);
      return true;
    }

    return false;
  }

  render() {
    this.shadowRoot!.innerHTML = /* html */ `
        <div class="container scrollbar-hide fixed-size">
          <h2 class="title text-title">새로운 음식점</h2>
          <form id="restaurantForm">
            <add-select
              name="카테고리"
              id="category"
              options="한식,중식,일식,양식,아시안,기타"
            ></add-select>
            <name-input name="이름" id="name"></name-input>
            <add-select
              name="거리(도보 이동 시간)"
              id="distance"
              options="5,10,15,20,30"
            ></add-select>
            <description-input
              name="설명"
              id="description"
              caption="메뉴 등 추가 정보를 입력해 주세요."
            ></description-input>
            <link-input
              name="참고 링크"
              id="link"
              caption="매장 정보를 확인할 수 있는 링크를 입력해 주세요."
            ></link-input>
            <div class="button-container">
              <lunch-button
              name="취소하기"
              id="cancelModal"
              color="white"
              ></lunch-button>
              <lunch-button
              name="추가하기"
              id="addRestraunt"
              color="orange"
              ></lunch-button>
            </div>
          </form>
        </div>
    `;
  }

  resetForm() {
    const nameInput = this.shadowRoot!.querySelector('#name') as NameInput;
    const descriptionInput = this.shadowRoot!.querySelector(
      '#description'
    ) as DescriptionInput;
    const linkInput = this.shadowRoot!.querySelector('#link') as LinkInput;

    nameInput.reset();
    descriptionInput.reset();
    linkInput.reset();
    this.shadowRoot!.querySelectorAll('add-select').forEach((element) => {
      const addSelect = element as AddSelect;
      addSelect.reset();
    });
  }

  setComponentStyle() {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = /* css */ `
      .text-title {
        font-size: 20px;
        line-height: 24px;
        font-weight: 600;
      }

      .container {
        position: fixed;
        bottom: 0;
        width:100%;
        max-width:390px;
        padding: 32px 16px;
        border-radius: 8px 8px 0px 0px;
        background: var(--grey-100);
        z-index:3;
      }

      .fixed-size{
        -webkit-box-sizing: border-box; 
        -moz-box-sizing: border-box;    
        box-sizing: border-box;    
      }
      
      .title {
        margin-bottom: 36px;
      }

      .button-container {
        display: flex;
        justify-content:space-between;
        align-items:center;
      }

      .button-container:first-child {
        margin-right:16px;
      }

      .scrollbar-hide{
        -ms-overflow-style: none; 
        scrollbar-width: none;
      }
  
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }

      @media (max-height: 900px) {
        .container {
          top:100px;
          overflow-x:hidden;
          overflow-y:scroll;
        }
      }

`;

    this.shadowRoot!.append(componentStyle);
  }
}

export default AddRestaurantForm;
