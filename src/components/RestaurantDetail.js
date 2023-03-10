class RestaurantDetail extends HTMLElement {
  attributeChangedCallback(name) {
    if (
      name === 'category' &&
      name === 'name' &&
      name === 'distance' &&
      name === 'isFavorite'
    ) {
      this.connectedCallback();
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
  }

  update(restaurant) {
    const { name, category, distance, description, link, isFavorite } =
      restaurant;

    this.shadowRoot.innerHTML = `
    <div class="container">
      <div class="image-container">
        <category-image category="${category}"></category-image>
        <favorite-image isFavorite="${isFavorite}"></favorite-image>
      </div>
      <div>
       <h3 class="m-4 text-title-2">${name}</h3>
       <span class="m-4 distance text-body">캠퍼스부터 ${distance}분 내</span>
       <p class="m-4 text-body">${description}</p>
       <a class="m-4 text-body" href="${link}" target="_blank">${link}</a>
      </div>
      <div class="button-container">
        <lunch-button
          name="삭제하기"
          id="deleteRestaurant"
          color="white"
        ></lunch-button>
        <lunch-button
          name="닫기"
          id="cancelModal"
          color="orange"
        ></lunch-button>
      </div>
    </div>
    `;

    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
    .text-body {
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
    }

    .text-title-2{
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
    }

    m-4{
      margin: 16px 0;
    }

    .container{
      position: fixed;
      width: 100%;
      bottom: 0;
      max-width: 360px;
      padding: 32px 16px;
      border-radius: 8px 8px 0px 0px;
      background: var(--grey-100);
    }

    .button-container {
      display: flex;
      justify-content:space-between;
      align-items:center;
      margin-top:32px;
    }

    .image-container{
      display:flex;
      justify-content:space-between;
    }
    
    .distance {
      color: var(--primary-color);
    }

`;

    this.shadowRoot.append(componentStyle);
  }

  static get observedAttributes() {
    return [
      'category',
      'name',
      'distance',
      'description',
      'link',
      'isFavorite',
    ];
  }
}

export default RestaurantDetail;
