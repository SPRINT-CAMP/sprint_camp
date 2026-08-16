export function createChip(text, options = {}) {
    // 기본 세팅
    const { variant = 'default', iconSrc = null, iconPosition = 'left', onClick = null } = options;

    const chipElement = document.createElement('button');
    chipElement.classList.add('chip');

    // 칩 스타일
    if (variant !== 'default') {
        chipElement.classList.add(`chip-${variant}`);
    }

    // 텍스트
    const textElement = document.createElement('span');
    textElement.textContent = text;

    // 아이콘 삽입
    if (iconSrc) {
        const iconElement = document.createElement('img');
        iconElement.src = iconSrc;
        iconElement.alt = '아이콘';
        iconElement.classList.add('chip-icon');

        if (iconPosition === 'left') { // 아이콘-텍스트
            chipElement.appendChild(iconElement);
            chipElement.appendChild(textElement);
        }
        else if (iconPosition === 'right') { // 텍스트-아이콘
            chipElement.appendChild(textElement);
            chipElement.appendChild(iconElement);
        }
    }
    else {
        chipElement.appendChild(textElement);
    }

    if (onCLick) {
        chipElement.addEventListener('click', onClick);
    }

    return chipElement;
}


/*
import { createChip } from './chips.js';

const container = document.querySelector('#chip-container');

const testChip = createChip('텍스트', { 
  variant: 'purple', // purple, while (기본은 생략)
  iconSrc: './assets/test_icon.png',
  iconPosition: 'right' // left, right (없으면 생략)
  onClick: function() { // 없으면 생략
    console.log('click event');
  }
});

container.append(testChip);
*/
