const input = document.querySelector("#searchInput");
const apikey = "350db24d";

const img = document.querySelector("#img");
const title = document.querySelector("#title");
const plot = document.querySelector("#plot");
const director = document.querySelector("#director");
const writers = document.querySelector("#writers");
const stars = document.querySelector("#stars");
const rating = document.querySelector("#rating");
const info = document.querySelector("#info");

const genreElements = document.querySelectorAll(".genre");

info.classList.add("hidden");

input.addEventListener("keydown", async (event) => {
  if (event.key !== "Enter") return;

  const movieName = input.value.trim();
  if (!movieName) return;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?t=${movieName}&apikey=${apikey}`,
    );

    const data = await response.json();

    if (data.Response === "False") {
      alert("Movie not found!");
      return;
    }

    img.src =
      data.Poster !== "N/A"
        ? data.Poster
        : "https://via.placeholder.com/300x450?text=No+Image";

    title.textContent = data.Title;
    plot.textContent = data.Plot;
    director.textContent = data.Director;
    writers.textContent = data.Writer;
    stars.textContent = data.Actors;
    rating.textContent = data.imdbRating + "/10";
    console.log(data);

    info.classList.remove("hidden");
    info.classList.add("flex-row");

    const genresArray = data.Genre.split(",");

    genreElements.forEach((element, index) => {
      if (genresArray[index]) {
        element.textContent = genresArray[index].trim();
        element.classList.remove("hidden");
      } else {
        element.classList.add("hidden");
      }
    });

    input.value = "";
  } catch (error) {
    console.log("Error:", error);
  }
});
