const cardList = document.querySelector('#card-list');

const getTopRatedMovies = async (searchWord) => {
  const url = `http://localhost:3000/api/movies?${searchWord ? `searchWord=${searchWord}` : ''}`;
  // fetch 함수를 사용하여, 해당 주소(url)로 GET 요청을 보냅니다. 이를 통해 Server에서 영화 목록을 받아옵니다.
  const response = await fetch(url);

  if (response.status !== 200) {
    throw new Error('API call error!');
  }
  // 'response'의 본문을 JSON 형식으로 Parsing하여 반환합니다.
  return await response.json();
};

function renderMovieCard(movieList) {
  // console.log(movieList);
  cardList.innerHTML = movieList
    .map((movie) => {
      return `<li class="movie-card" id=${movie.id}>
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
              <h3 class="movie-title">${movie.title}</h3>
              <p>${movie.overview}</p>
              <p>Rating: ${movie.vote_average}</p>
            </li>`;
    })
    .join('');
}
// movieList.map((movie) => { ... }) 부분에서 map 함수는 movieList 배열의 각 요소에 대해 주어진 callback 함수를 실행하고,
// 반환된 값들을 새로운 배열로 생성합니다. 이 때 각 영화 요소를 나타내는 HTML 문자열로 변환합니다.

// '.join('')'은 이렇게 생성된 HTML 문자열 배열을 빈 문자열로 연결하여 하나의 큰 HTML 문자열을 생성합니다.
// 이렇게 생성된 문자열은 최종적으로 cardList.innerHTML에 할당됩니다.

document.addEventListener('DOMContentLoaded', async () => {
  const topRatedMovies = await getTopRatedMovies();
  renderMovieCard(topRatedMovies);

  // 사용자가 검색어를 입력했을 경우, 실행되는 구문입니다.
  const form = document.querySelector('#search-form');
  form.addEventListener('click', async function () {
    const searchWord = document.querySelector('#search-input').value;
    const topRatedMovies = await getTopRatedMovies(searchWord);
    renderMovieCard(topRatedMovies);
  });
});

const menuIdSender = ({ target }) => {
  // cardList 이외의 영역을 'click' 했다면, 무시합니다.
  if (target === cardList) return;

  if (target.matches('.movie-card')) {
    alert(target.id);
  } else {
    alert(target.parentNode.id);
  }
};

cardList.addEventListener('click', menuIdSender);
