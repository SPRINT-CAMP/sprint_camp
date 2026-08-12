export function renderFooter() {
  const footerTemplate = `
    <footer class="footer">
      제5대 인공지능대학 학생회 AIR
    </footer>
  `;

  document.body.insertAdjacentHTML('beforeend', footerTemplate);
}

/*
<script type="module">
  import { renderFooter } from './js/footer.js';

  renderFooter();
</script>
*/