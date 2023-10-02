import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


import MarketPageHeader from './MarketPageHeader';
import MarketPageItem from './MarketPageItem';


export default observer(function MarketPage() {

  
    const { marketStore ,userStore} = useStore();
    const { groupedMarkets } = marketStore;
    const { isLoggedIn } = userStore;

   

    return (

        <Grid columns={4} stackable >
            <MarketPageHeader />
        
            <Grid.Row>


                {isLoggedIn && groupedMarkets.map(([group, markets]) => (

                    <Grid.Column style={{ paddingTop: '20px' }}>
                    
                        {markets.map(market => (

                            <MarketPageItem key={market.id} market={market} />
                        ))}

                    </Grid.Column>
                ))}


            </Grid.Row>
        </Grid>


    )
})