export function renderHeader({ title = 'SPRINT CAMP', action = [] } = {}) {

  // HTML 버튼 태그 생성 (data-index 부여)
  const actionHTML = action
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
          <div class="header-logo">${title}</div>
          <div class="icon-group">
            ${actionHTML}
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
    const item = action[index];

    button.addEventListener('click', (e) => {
      if (item.targetSection) {
        const selector = item.targetSection.startsWith('#')
          ? item.targetSection
          : `#${item.targetSection}`;

        const targetElement = document.querySelector(selector);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      if (typeof item.onClick === 'function') {
        item.onClick(e);
      }
    });
  });

  const navItems = action
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.targetSection);

  if (navItems.length > 0) {
    const setActive = (activeIndex) => {
      buttons.forEach((button, index) => {
        button.classList.toggle('active', index === activeIndex);
      });
    };

    const updateActiveByScroll = () => {
      const headerEl = document.querySelector('.header');
      const offset = (headerEl ? headerEl.offsetHeight : 0) + 20;

      let currentIndex = navItems[0].index;

      navItems.forEach(({ item, index }) => {
        const selector = item.targetSection.startsWith('#')
          ? item.targetSection
          : `#${item.targetSection}`;
        const section = document.querySelector(selector);

        if (section && section.getBoundingClientRect().top - offset <= 0) {
          currentIndex = index;
        }
      });

      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      if (scrolledToBottom) {
        currentIndex = navItems[navItems.length - 1].index;
      }

      setActive(currentIndex);
    };

    window.addEventListener('scroll', updateActiveByScroll, { passive: true });
    updateActiveByScroll();
  }
}

/*
<body>
  <!-- [사용법] 자동 스크롤 기능을 적용할 단위는 <section> 태그로 감싸고 고유한 id를 부여하세요. -->
  <section id = "sec-10">
    <h1>Hello World</h1>
  </section>

  <section id = "sec-11">
    <h1>Hello World</h1>
  </section>

  <script type="module">
    import { renderHeader } from './js/header.js';

    renderHeader({
      // title 생략 시 기본값 'SPRINT CAMP'
      action: [
        {
          content: '[목록]',
          targetSection: 'sec-11' // 이동하려는 section의 id 입력 (예: 'sec-11')
        },
        {
          content: './assets/images/main.svg',
          onClick: () => {
            location.href = 'main.html'; //이동하려는 페이지 경로 입력 (예: 'main.html')
          }
        }
      ]
    });
  </script>
</body>
*/