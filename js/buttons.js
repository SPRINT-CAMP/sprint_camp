export function createButton(text, options = {}) {
    // 기본 세팅
    const { iconSrc = null, size = 'default' } = options;

    const buttonElement = document.createElement('button');
    buttonElement.classList.add('btn');

    if (size === 'long') {
        buttonElement.classList.add('btn-long');
    }

    // 아이콘
    if (iconSrc) {
        const iconElement = document.createElement('img');
        iconElement.src = iconSrc;
        iconElement.alt = '아이콘';
        iconElement.classList.add('btn-icon');

        buttonElement.appendChild(iconElement);
    }

    // 텍스트
    const textElement = document.createElement('span');
    textElement.textContent = text;
    buttonElement.appendChild(textElement);

    return buttonElement;
}

/*
<script type="module">import { createButton } from './js/buttons.js';

        const container = document.getElementById('button-container');

        const basicBtn = createButton('시연 영상 보기', {
            iconSrc: 'https://via.placeholder.com/24/cccccc/000000?text=I'
        });

        const longBtn = createButton('결과물 확인하기', {
            size: 'long',
            iconSrc: 'https://via.placeholder.com/24/cccccc/000000?text=I'
        });

        container.append(basicBtn, longBtn);</script>
*/