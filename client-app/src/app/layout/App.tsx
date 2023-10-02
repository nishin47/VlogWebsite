import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import NavigationBar from './NavigationBar';
import LandingPage from '../../features/home/LandingPage';
import Login from '../../features/users/Login';



function App() {

  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {

    if (commonStore.token) {

      userStore.getUser().finally(() => commonStore.setAppLoaded())
    }

    else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app' />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      
      <NavigationBar />
      {location.pathname === '/' ? <LandingPage /> : (

        <>
          <div className='Signinform' style={{ marginTop: '0em', width: '100%',marginLeft: '0em !important;',marginRight: '0em !important;' }}>
            <Outlet />
          </div>
        </>
      )}



    </>
  );
}

export default observer(App);
