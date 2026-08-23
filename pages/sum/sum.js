import { renderHeader } from '../../js/header.js';
import { renderFooter } from '../../js/footer.js';
import { createButton } from '../../js/buttons.js';
import { createChip } from '../../js/chips.js';

//TODO: 페이지 연결
renderHeader([
    {
        content: '../../assets/images/main.svg',

        onClick: () => {
            window.location.href = '../../index.html';
        }
    }
]);

renderFooter();