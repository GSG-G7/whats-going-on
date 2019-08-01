
const selector = id => document.querySelector(`#${id}`);
const create = tag => document.createElement(`${tag}`);
const userInput = selector('search__input');
const searchBtn = selector('search__btn');
const form = selector('form');
const loader = selector('lds-hourglass');
const togglehideLoader = () => loader.classList.toggle('hide');

const getpublishTimeAgo = (publishDate) => {
  const numOfHours = Math.ceil((Date.now() - Date.parse(publishDate)) / 3600000);
  if (numOfHours >= 24) {
    return `${Math.floor(numOfHours / 24)} days ago`;
  }
  return `${numOfHours} hours ago`;
};

const renderArticles = (details) => {
  const newContainer = create('div');

  details.articles.forEach((e) => {
    const div = create('div');
    const imageDiv = create('div');
    const contentDiv = create('div');

    const image = create('img');
    image.src = e.urlToImage;
    image.setAttribute('alt', e.title);
    image.className = 'news__img';
    imageDiv.className = 'news__image';
    imageDiv.appendChild(image);

    const header = create('h1');
    contentDiv.appendChild(header);

    const articleLink = create('a');
    articleLink.href = e.url;
    articleLink.textContent = e.title;
    header.appendChild(articleLink);

    const dateDiv = create('div');
    const publishTime = create('h4');
    const clockIcon = create('i');
    clockIcon.className = 'far fa-clock';
    publishTime.textContent = getpublishTimeAgo(e.publishedAt);
    dateDiv.appendChild(clockIcon);
    dateDiv.appendChild(publishTime);
    contentDiv.appendChild(dateDiv);
    const newsContent = create('p');
    newsContent.textContent = e.description;
    contentDiv.appendChild(newsContent);
    contentDiv.className = 'news__details';

    div.appendChild(imageDiv);
    div.appendChild(contentDiv);
    div.className = 'news__article';
    newContainer.appendChild(div);
    newContainer.appendChild(create('hr'));
  });

  newContainer.id = 'container';
  newContainer.className = 'container';
  selector('news-section').replaceChild(newContainer, selector('container'));
};

function fetchInput() {
  const input = userInput.value;
  togglehideLoader();
  fetch(`/search?query=${input}`)
    .then(res => res.json())
    .then(renderArticles)
    .then(togglehideLoader);
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchInput();
});

togglehideLoader();
fetch('/latest')
  .then(res => res.json())
  .then(renderArticles)
  .then(togglehideLoader);
