import { observer } from 'mobx-react-lite';
import { Fragment, useEffect, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import LoadingComponenets from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import MarketFooter from '../market/dashboard/MarketFooter';
import MarketPage from '../market/dashboard/MarketPage';


export default observer(function LandingPage() {

    const { marketStore,userStore } = useStore();
    const { loadMarkets, marketRegistry } = marketStore;
    const { isLoggedIn } = userStore;
    const [screenHeight] = useState(window.innerHeight-window.innerHeight*0.1);
   

  
    useEffect(() => {

        if(marketRegistry.size<=1) loadMarkets();
  
     }, [marketRegistry.size,loadMarkets])
 


    if (marketStore.loadingInitial && isLoggedIn) return <LoadingComponenets content='Initializing' />

    return (



        <Fragment>

            <Segment inverted textAlign='center' vertical style={{ padding: '5em', background: 'white', height: screenHeight}}>
                <MarketPage />
            </Segment>

        </Fragment>

    )
})