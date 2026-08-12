export function renderHeader(items = []) {
  // 1. 전달받은 항목을 버튼으로 변환
  const itemsHTML = items
    .map(item => {
      const isImage = typeof item === 'string' && /\.(svg|png|jpg|jpeg|webp)$/i.test(item.trim());
      
      const content = isImage 
        ? `<img src="${item}" alt="icon">` 
        : item;

      return `<button type="button" class="icon-btn">${content}</button>`;
    })
    .join('');

  // 2. HTML 템플릿
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

  document.body.insertAdjacentHTML('afterbegin', headerTemplate);
}

/*
<script type="module">
    import { renderHeader } from './js/header.js';

    // 헤더 생성 함수 실행
    renderHeader(['🔍', '🔔', '로그인']);
</script>
*/