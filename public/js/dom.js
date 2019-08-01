
const selector = id => document.querySelector(`#${id}`);
const create = tag => document.createElement(`${tag}`);
const userInput = selector('search__input');
const searchBtn = selector('search__btn');
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

  details.articles.forEach((element) => {
    const div = create('div');
    const imageDiv = create('div');
    const contentDiv = create('div');

    const image = create('img');
    image.src = element.urlToImage;
    image.setAttribute('alt', element.title);
    image.className = 'news__img';
    imageDiv.className = 'news__image';
    imageDiv.appendChild(image);

    const header = create('h1');
    contentDiv.appendChild(header);

    const articleLink = create('a');
    articleLink.href = element.url;
    articleLink.textContent = element.title;
    header.appendChild(articleLink);

    const dateDiv = create('div');
    const publishTime = create('h4');
    const clockIcon = create('i');
    clockIcon.className = 'far fa-clock';
    publishTime.textContent = getpublishTimeAgo(element.publishedAt);
    dateDiv.appendChild(clockIcon);
    dateDiv.appendChild(publishTime);
    contentDiv.appendChild(dateDiv);
    const newsContent = create('p');
    newsContent.textContent = element.description;
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

userInput.addEventListener('keydown', (e) => {
  const input = e.target.value;
  if (e.key === 'Enter') {
    togglehideLoader();
    fetch(`/search?query=${input}`)
      .then(res => res.json())
      .then(renderArticles)
      .then(togglehideLoader);
  }
});

searchBtn.addEventListener('click', () => {
  togglehideLoader();
  const input = userInput.value;
  fetch(`/search?query=${input}`)
    .then(res => res.json())
    .then(renderArticles)
    .then(togglehideLoader)
    .catch(() => window.location.replace(`/search?query=${input}`));
});

togglehideLoader();
fetch('/latest')
  .then(res => res.json())
  .then(renderArticles)
  .then(togglehideLoader)
  .catch(() => window.location.replace('/latest'));
