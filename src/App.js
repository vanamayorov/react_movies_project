import InfoCol from './components/InfoCol';
import SortNav from './components/SortNav';
import Loader from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { loadingStatus } from './reducers/moviesReducerSlice';
import MoviesContainer from './components/MoviesContainer';
import Header from './components/Header';
import { useEffect } from 'react';
import ApiService from './API/ApiService';
import { endPoints } from './config/config';
import Cookies from 'universal-cookie';
import { setUser } from './reducers/userReducer';

const cookies = new Cookies();

const App = () => {
  const status = useSelector(loadingStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const session_id = cookies.get('session_id');

      if (session_id) {
        const user = await ApiService.get(endPoints.account, {
          params: {
            session_id: session_id
          }
        });
        dispatch(setUser(user));
      }
    }

    getUser();
  }, []); //eslint-disable-line

  return (
    <div className='global-wrapper'>
      <Header />

      {status && <Loader />}

      <div className="container py-4">
        <SortNav />
        <div className="row mt-4">
          <MoviesContainer />
          <InfoCol />
        </div >
      </div>
    </div>
  );
}

export default App;