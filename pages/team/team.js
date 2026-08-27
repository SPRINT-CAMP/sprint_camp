import { renderHeader } from '../../js/header.js';
import { renderFooter } from '../../js/footer.js';
import { createButton } from '../../js/buttons.js';
import { createChip } from '../../js/chips.js';

const params = new URLSearchParams(window.location.search);
const teamId = params.get('id');

async function getTeamData() {

    const response = await fetch('../../data/dummy.json');

    if (!response.ok) {
        throw new Error('팀 데이터를 불러오지 못했습니다.');
    }

    const teams = await response.json();

    const team = teams.find((item) => item.id === teamId);

    if (!team) {
        throw new Error('해당 팀을 찾을 수 없습니다.');
    }

    return team;
}

async function renderTeamPage() {

    try {

        const team = await getTeamData();

        document.title = `${team.teamName} | SPRINT CAMP`;

        document.querySelector('#team-thumbnail').src = `../../${team.thumbnail}`;

        document.querySelector('#team-title').textContent = team.title;

        document.querySelector('#team-name').textContent = team.teamName;

        document.querySelector('#team-description').textContent =
            team.description;


        const leader = team.members.find(
            (member) => member.isLeader
        );

        const members = team.members.filter(
            (member) => !member.isLeader
        );

        document.querySelector('#team-leader').textContent =
            leader
                ? `${leader.major} ${leader.name}`
                : '-';

        document.querySelector('#team-members').textContent =
            members.length > 0
                ? members
                    .map((member) => `${member.major} ${member.name}`)
                    .join('\u00A0\u00A0')
                : '-';

        const chipContainer = document.querySelector('#team-chips');

        const categoryChip = createChip(team.category);

        const levelChip = createChip(team.level);

        chipContainer.append(
            categoryChip,
            levelChip
        );

        const buttonContainer =
            document.querySelector('#team-buttons');

        if (team.demo) {

            const demoButton = createButton(
                '시연 영상 보기',
                {
                    iconSrc: '../../assets/images/ic_video.svg',

                    onClick: () => {
                        window.open(
                            team.demo,
                            '_blank',
                            'noopener,noreferrer'
                        );
                    }
                }
            );
            buttonContainer.appendChild(demoButton);
        }

        if (team.github) {
            const githubButton = createButton(
                '결과물 확인하기',
                {
                    iconSrc: '../../assets/images/ic_link.svg',
                    onClick: () => {
                        window.open(
                            team.github,
                            '_blank',
                            'noopener,noreferrer'
                        );
                    }
                }
            );
            buttonContainer.appendChild(githubButton);
        }
        renderPptImages(team.ppt_img);
    } catch (error) {
        console.error(error);
        document.querySelector('.team-page').innerHTML = `
      <div class="error-message">
        <h1>페이지를 불러올 수 없습니다.</h1>
      </div>
    `;
    }
}

function renderPptImages(images) {

    if (!images || images.length === 0) {
        return;
    }

    const mainImage =
        document.querySelector('#main-ppt-image');

    const thumbnailContainer =
        document.querySelector('#ppt-thumbnails');

    let currentImageIndex = 0;

    mainImage.src = `../../${images[0]}`;

    images.forEach((image, index) => {

        const button =
            document.createElement('button');

        button.type = 'button';
        button.classList.add('ppt-thumbnail');

        if (index === currentImageIndex) {
            button.classList.add('active');
        }

        const img =
            document.createElement('img');

        img.src = `../../${image}`;
        img.alt = `프로젝트 이미지 ${index + 1}`;

        button.appendChild(img);

        button.addEventListener('click', () => {

            currentImageIndex = index;

            mainImage.src =
                `../../${images[currentImageIndex]}`;

            document
                .querySelectorAll('.ppt-thumbnail')
                .forEach((item) => {
                    item.classList.remove('active');
                });

            button.classList.add('active');
        });

        thumbnailContainer.appendChild(button);
    });
}

renderHeader([
    {
        content: '../../assets/images/main.svg',
        onClick: () => { window.location.href = '../main.html'; }
    },
    {
        content: '../../assets/images/list.svg',
        onClick: () => { window.location.href = '../sum/sum.html'; }
    }
]);

renderFooter();

renderTeamPage();