const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=12b90d1e4e264edf8eedf0be2f0992a2';
console.log(url);
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
    publishTime.textContent = `published at ${getHoursAgo(e.publishedAt)} hours ago`;
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
userInput.addEventListener('keyup', (e) => {
  const input = e.target.value;
});

searchBtn.addEventListener('click', () => {
  fetch(url)
    .then(res => res.json())
    .then(renderArticles);
});
