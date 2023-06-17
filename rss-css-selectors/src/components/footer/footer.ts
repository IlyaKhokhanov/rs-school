import { addElement } from '../../utils/utils';
import './footer.scss';

export default function footer() {
  const footerElem: HTMLElement = addElement('footer', 'footer');

  const rssElem: HTMLElement = addElement('div', 'rss');

  const rssLink: HTMLElement = addElement('a', 'rss-link');
  rssLink.setAttribute('href', 'https://rs.school/js/');
  rssLink.setAttribute('target', '_blank');

  const rssImg: HTMLElement = addElement('img', 'rss-img');
  rssImg.setAttribute('src', './img/rss_js.png');
  rssImg.setAttribute('alt', 'rss-link');

  rssLink.append(rssImg);
  rssElem.append(rssLink);

  const githubElem: HTMLElement = addElement('div', 'github');

  const githubLink: HTMLElement = addElement('a', 'github-link');
  githubLink.setAttribute('href', 'https://github.com/IlyaKhokhanov');
  githubLink.setAttribute('target', '_blank');

  const githubImg: HTMLElement = addElement('img', 'github-img');
  githubImg.setAttribute('src', './img/gh.png');
  githubImg.setAttribute('alt', 'github');

  const githubAuthor: HTMLElement = addElement('span', 'github-author');
  githubAuthor.textContent = ' Ilya Khokhanov 2023';

  githubLink.append(githubImg, githubAuthor);
  githubElem.append(githubLink);

  footerElem.append(rssElem, githubElem);
  document.body.append(footerElem);
}
