import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Movie from "../components/Movie";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { fetchMovies } from "../features/movieList";

function HomeScreen() {
  const dispatch = useDispatch();
  const { loading, movies, error } = useSelector((state) => state.movieList);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  return (
    <>
      <h1>Trending Movies</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col key={movie._id} sm={12} md={6} lg={4} xl={3}>
              <Movie movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
export default HomeScreen;
