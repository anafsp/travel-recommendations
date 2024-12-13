async function getDataFromApi() {
  const url = "./travel_recommendation_api.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

function getCardsHtml(data) {
    return data.reduce((acc, cur) => {
        return acc + 
            `<div class="card">
                <img src="${cur.imageUrl}">
                <div class="card__text">
                    <h3>${cur.name}</h3>
                    <p>${cur.description}</p>
                    <button>Visit</button>
                </div>
            </div>`;
    }, '');
}

document.addEventListener("DOMContentLoaded", async () => {
    const data = await getDataFromApi();

    let htmlResults;
    document.querySelector('[data-form-search]').addEventListener('submit', async e => {
        e.preventDefault();

        const wordSearched = e.currentTarget.querySelector('input[type="text"]').value.toLowerCase();

        switch(wordSearched) {
            case 'country':
            case 'countries':
                const citiesData = data.countries.reduce((acc,country) => {
                    return acc.concat(country.cities.reduce((acc,city) => {
                        return acc.concat(city);
                    }, []));
                }, []);
                htmlResults = getCardsHtml(citiesData);
                break;
            case 'beach':
            case 'beaches':
                htmlResults = getCardsHtml(data.beaches);
                break;
            case 'temple':
            case 'temples':
                htmlResults = getCardsHtml(data.temples);
                break;
            default:
                htmlResults = '<p class="search-results__not-found">No results found.</p>'
                break;
        }

        document.querySelector('[data-search-results]').innerHTML = htmlResults;
    });
});
