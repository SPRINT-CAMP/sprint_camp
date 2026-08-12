export function renderHeader(items = []) {

  // HTML 버튼 태그 생성 (data-index 부여)
  const itemsHTML = items
    .map((item, index) => {
      // .svg, .png 등 이미지 경로인지 확인
      const isImage = typeof item.content === 'string' && /\.(svg|png|jpg|jpeg|webp)$/i.test(item.content.trim());
      const innerHTML = isImage ? `<img src="${item.content}" alt="icon">` : item.content;

      return `<button type="button" class="icon-btn" data-index="${index}">${innerHTML}</button>`;
    })
    .join('');

  // 헤더 HTML 템플릿
  const headerTemplate = `
    <header class="header">
      <div class="header-container">
        <div class="component-container">
          <div class="header-logo">SPRINT CAMP</div>
          <div class="icon-group">
            ${itemsHTML}
          </div>
        </div>
      </div>
    </header>
  `;

  // body 최상단에 헤더 추가
  document.body.insertAdjacentHTML('afterbegin', headerTemplate);

  // 생성된 버튼들에 클릭 이벤트 바인딩
  const buttons = document.querySelectorAll('.header .icon-btn');
  buttons.forEach((button, index) => {
    button.addEventListener('click', items[index].onClick);
  });
}

/*
<script type="module">
    import { renderHeader } from './js/header.js';

    renderHeader([
    {
      content: './assets/images/main.svg',
      onClick: () => {
        location.href = '페이지.html';
      }
    }
    ]);
</script>
*/