import MoviesList from './components/MoviesList';
import { MemoInfoCol } from './components/InfoCol';
import SortNav from './components/SortNav';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import { loadingStatus, errorStatus } from './reducers/moviesReducerSlice';
const App = () => {
  const status = useSelector(loadingStatus);
  const error = useSelector(errorStatus);
  
  return (
    <div className="container py-4" style={{ minHeight: "100vh" }}>
      {status && <Loader />}
      {error && <h2>An error occured: {error}</h2>}

      <>
        <SortNav />
        <div className="row mt-4">
          <MoviesList />
          <MemoInfoCol />
        </div >
      </>
    </div>
  );
}

export default App;