import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Movie({ movie }) {
  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <Link to={`movie/:${movie._id}`}>
          <Card.Img src={movie.image}></Card.Img>
        </Link>

        <Card.Body>
          <Link to={`/movie/${movie._id}`}>
            <Card.Title as="div">
              <strong>{movie.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <div className="my-3">
              {movie.rating} from {movie.numReviews} reviews
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
export default Movie;
