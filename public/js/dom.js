const selector = id => document.querySelector(`#${id}`);
const create = tag => document.createElement(`${tag}`);
const userInput = selector('form__userinput');
const searchBtn = selector('form__searchbtn');
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

    const publishTime = create('h4');
    publishTime.textContent = `published ${getHoursAgo(e.publishedAt)} hours ago`;
    contentDiv.appendChild(publishTime);
    const newsContent = create('p');
    newsContent.textContent = e.description;
    contentDiv.appendChild(newsContent);
    contentDiv.className = 'news__details';

    div.appendChild(imageDiv);
    div.appendChild(contentDiv);
    div.className = 'news__article';
    newContainer.appendChild(div);
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


fetch('/latest')
  .then(res => res.json())
  .then(renderArticles);
