import { addElement } from '../../utils/utils';
import './footer.scss';

export default function footer() {
  const innerFooter = `
    <div class="rss">
      <a href="https://rs.school/js/" target="_blank"
        ><img class="rss-img" src="./img/rss_js.png" alt="rss-link" />
      </a>
    </div>
    <div class="github">
      <a
        class="github-link"
        href="https://github.com/IlyaKhokhanov"
        target="_blank"
      >
        <img class="github-img" src="./img/gh.png" alt="github" />
        <span class="github-author"> Ilya Khokhanov 2023</span>
      </a>
    </div>
  `;

  const footerElem: HTMLElement = addElement('footer', 'footer');
  footerElem.innerHTML = innerFooter;
  document.body.append(footerElem);
}
