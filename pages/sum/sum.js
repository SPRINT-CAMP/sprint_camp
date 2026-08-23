import { renderHeader } from '../../js/header.js';
import { renderFooter } from '../../js/footer.js';
import { createChip } from '../../js/chips.js';

// 헤더 및 푸터 렌더링
renderHeader([
  {
    content: '../../assets/images/main.svg',
    onClick: () => {
      window.location.href = '../../index.html';
    }
  }
]);

renderFooter();

const activeFilters = new Set();
let allTeams = []; // 불러온 전체 팀 데이터 저장용

// 10개 필터 옵션 목록
const filterList = [
  { text: '분야', isHeader: true },
  { text: '데이터 마이닝 및 분석', isHeader: false },
  { text: '로봇 개발', isHeader: false },
  { text: '시큐어 코딩 · 악성코드 분석', isHeader: false },
  { text: '웹 개발', isHeader: false },
  { text: '프로그래밍 언어 학습', isHeader: false },
  { text: 'AI 모델 활용 프로젝트', isHeader: false },
  { text: '트랙', isHeader: true },
  { text: '비기너', isHeader: false },
  { text: '메이커', isHeader: false }
];

// 필터 칩 내부에 드롭다운 생성 함수 (수정됨)
function toggleDropdown(targetElement, onSelectOption) {
  let existingDropdown = document.querySelector('.filter-dropdown');

  if (existingDropdown) {
    existingDropdown.remove();
    return;
  }

  // 필터 칩 요소를 드롭다운의 부모 기준점으로 설정
  targetElement.style.position = 'relative';

  const dropdown = document.createElement('div');
  dropdown.className = 'filter-dropdown';

  filterList.forEach(item => {
    const optionEl = document.createElement('div');
    optionEl.className = `dropdown-item ${item.isHeader ? 'is-header' : ''}`;
    optionEl.textContent = item.text;

    if (!item.isHeader) {
      optionEl.addEventListener('click', (e) => {
        e.stopPropagation();
        onSelectOption(item.text);
        dropdown.remove();
      });
    }

    dropdown.appendChild(optionEl);
  });

  // targetElement(필터 칩) 자식으로 추가하여 위치를 고정
  targetElement.appendChild(dropdown);

  const handleOutsideClick = (e) => {
    if (!dropdown.contains(e.target) && !targetElement.contains(e.target)) {
      dropdown.remove();
      document.removeEventListener('click', handleOutsideClick);
    }
  };
  setTimeout(() => document.addEventListener('click', handleOutsideClick), 0);
}

// sum-chips 영역 설정 및 렌더링 함수
function setupSumChips() {
  const sumChipsContainer = document.querySelector('.sum-chips');
  if (!sumChipsContainer) return;

  function renderChipsArea() {
    sumChipsContainer.innerHTML = '';

    // ① 초기화 Chip
    const resetChip = createChip('초기화', {
      iconSrc: '../../assets/images/reset.png',
      iconPosition: 'left',
      onClick: () => {
        activeFilters.clear();
        renderChipsArea();
        renderFilteredTeams();
      }
    });

    // ② 필터 Chip
    const filterChip = createChip('필터', {
      iconSrc: '../../assets/images/filter.png',
      iconPosition: 'left',
      onClick: (e) => {
        const target = e.currentTarget || filterChip;
        toggleDropdown(target, (selectedText) => {
          activeFilters.add(selectedText);
          renderChipsArea();
          renderFilteredTeams();
        });
      }
    });

    sumChipsContainer.append(resetChip, filterChip);

    // ③ 선택된 필터 칩 추가
    activeFilters.forEach(filterName => {
      const selectedChip = createChip(filterName, {
        variant: 'purple',
        iconSrc: '../../assets/images/delete_filter.png',
        iconPosition: 'right',
        onClick: () => {
          activeFilters.delete(filterName);
          renderChipsArea();
          renderFilteredTeams();
        }
      });
      sumChipsContainer.append(selectedChip);
    });
  }

  renderChipsArea();
}

// 단일 팀 카드 생성 함수
function createTeamCard(team) {
  const card = document.createElement('article');
  card.className = 'team-card';

  const thumbnailPath = team.thumbnail && team.thumbnail.startsWith('../../')
    ? team.thumbnail
    : `../../${team.thumbnail || 'assets/images/sample_4x3.png'}`;

  card.innerHTML = `
    <div class="team-thumbnail">
      <img src="${thumbnailPath}" alt="${team.title || '프로젝트'} 썸네일" />
    </div>
    <div class="team-info">
      <h2 id="team-title">${team.title || ''}</h2>
      <p class="team-name">${team.teamName || ''}</p>
    </div>
    <div class="team-chips"></div>
  `;

  const teamChipsContainer = card.querySelector('.team-chips');

  if (team.category) {
    const isCategoryActive = activeFilters.has(team.category);
    const categoryChip = createChip(team.category, {
      variant: isCategoryActive ? 'purple' : 'default'
    });
    teamChipsContainer.append(categoryChip);
  }

  if (team.level) {
    const isLevelActive = activeFilters.has(team.level);
    const levelChip = createChip(team.level, {
      variant: isLevelActive ? 'purple' : 'default'
    });
    teamChipsContainer.append(levelChip);
  }

  return card;
}

// 선택된 필터에 따라 팀 데이터 필터링 후 렌더링하는 함수
function renderFilteredTeams() {
  const teamSection = document.querySelector('.team-section');
  if (!teamSection) return;

  teamSection.innerHTML = '';

  if (activeFilters.size === 0) {
    allTeams.forEach(team => {
      teamSection.append(createTeamCard(team));
    });
    return;
  }

  const filteredTeams = allTeams.filter(team => {
    return Array.from(activeFilters).every(filter => {
      return team.level === filter || team.category === filter;
    });
  });

  filteredTeams.forEach(team => {
    teamSection.append(createTeamCard(team));
  });
}

// 전체 데이터 불러오기 및 초기 실행
async function fetchAndRenderTeams() {
  try {
    const response = await fetch('../../data/dummy.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    allTeams = await response.json();

    setupSumChips();
    renderFilteredTeams();

  } catch (error) {
    console.error('데이터 로드 실패:', error.message);
  }
}

document.addEventListener('DOMContentLoaded', fetchAndRenderTeams);