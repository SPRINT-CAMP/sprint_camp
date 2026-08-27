import { inject } from "@vercel/analytics"

inject()

import { renderHeader } from './header.js';
import { createButton } from './buttons.js';
import { renderFooter } from './footer.js';

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// 헤더 렌더링
renderHeader([
    { content: '전시회', targetSection: 'hero-section' },
    { content: '개요', targetSection: 'about-section' },
    { content: '일정', targetSection: 'schedule-section' },
    { content: '분야', targetSection: 'categories-section' },
    { content: '트랙', targetSection: 'tracks-section' },
    {
        content: '☰',
        onClick: () => {
            const iconGroup = document.querySelector('.icon-group');
            if (iconGroup) {
                iconGroup.classList.toggle('active');
            }
        }
    }
]);

// 메인 배너 버튼 렌더링
const container = document.getElementById('button-container');
if (container) {
    const resBtn = createButton('결과물 보러가기 →', {
        size: 'long',
        onClick: function () {
            location.href = 'team.html';
        }
    });
    container.append(resBtn);
}

// 푸터 렌더링
renderFooter();