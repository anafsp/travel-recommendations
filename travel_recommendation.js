async function getDataFromApi() {
  const url = "./travel_recommendation_api.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
    document.querySelector('[data-form-search]').addEventListener('submit', async e => {
        e.preventDefault();

        const wordSearched = e.currentTarget.querySelector('input[type="text"]').value.toLowerCase();
        console.log(wordSearched);
        const data = await getDataFromApi();
        console.log(data);
    });
});
