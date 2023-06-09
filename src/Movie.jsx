function Movie({ data, TRAILER, IMGPATH }) {
  function getColor(average) {
    if (average > 7) {
      return 'green';
    } else if (average < 5) {
      return 'red';
    } else {
      return 'yellow';
    }
  }

  return (
    <div className="movies-container">
      {data.map(({ id, title, poster_path, vote_average, overview }) => {
        return (
          <div className="movie" key={id}>
            <a href={TRAILER + title + ' trailer'} target="_blank">
              <img src={IMGPATH + poster_path} alt={title} />
            </a>
            <div className="title">
              <h4>{title}</h4>
              <span style={{ color: getColor(vote_average) }}>
                {vote_average} <i className="fa-solid fa-star"></i>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Movie;
