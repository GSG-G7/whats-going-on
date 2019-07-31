const selector = id => document.querySelector(`#${id}`);
const create = tag => document.createElement(`${tag}`);
const userInput = selector('form__userinput');
const searchBtn = selector('form__searchbtn');

const getHoursAgo = d => Math.ceil((Date.now() - Date.parse(d.replace('T', ' ').replace('Z', ' '))) / 3600000);
const renderArticles = (details) => {
  const newContainer = create('div');

  details.articles.forEach((e) => {
    const div = create('div');
    const imageDiv = create('div');
    const contentDiv = create('div');

    const image = create('img');
    image.className = 'news__image';
    image.src = e.urlToImage;
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

    div.appendChild(imageDiv);
    div.appendChild(contentDiv);
    newContainer.appendChild(div);
  });
  newContainer.id = 'container';
  newContainer.className = 'container';
  selector('news-section').replaceChild(newContainer, selector('container'));
};

searchBtn.addEventListener('click', () => {
  const input = userInput.value;
  fetch(`/search/${input}`)
    .then(res => res.json())
    .then(renderArticles);
});


fetch('/latest')
  .then(res => res.json())
  .then(renderArticles);
