const selector = id => document.querySelector(`#${id}`);
const create = tag => document.createElement(`${tag}`);
const userInput = selector('search__input');
const searchBtn = selector('search__btn');
const loader = selector('lds-hourglass');
const togglehideLoader = () => loader.classList.toggle('hide');

const getHoursAgo = d => Math.ceil((Date.now() - Date.parse(d.replace('T', ' ').replace('Z', ' '))) / 3600000);
const renderArticles = (details) => {
  const newContainer = create('div');

  details.articles.forEach((e) => {
    const div = create('div');
    const imageDiv = create('div');
    const contentDiv = create('div');

    const image = create('img');
    image.src = e.urlToImage;
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
    publishTime.textContent = `${getHoursAgo(e.publishedAt)} hours ago`;
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


searchBtn.addEventListener('click', () => {
  togglehideLoader();
  const input = userInput.value;
  fetch(`/search/${input}`)
    .then(res => res.json())
    .then(renderArticles)
    .then(togglehideLoader);
});

togglehideLoader();
fetch('/latest')
  .then(res => res.json())
  .then(renderArticles)
  .then(togglehideLoader);
