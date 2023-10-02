import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Icon, Image, Label, Segment } from "semantic-ui-react";
import LoadingComponenets from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import MarketDetailsCurrency from "./MarketDetailsCurrency";
import MarketDetailsPrice from "./MarketDetailsPrice";

export default observer(function MarketDetailsParent() {

    const { marketStore } = useStore();
    const { selectedMarket: market, loadMarket, loadingInitial } = marketStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadMarket(id);
    }, [id, loadMarket])



    if (loadingInitial || !market) return <LoadingComponenets />;

   
    return (

        <Fragment >
            <Segment inverted textAlign='center' vertical style={{ background: 'white', width: '100%' }}>
                <Grid columns={2} padded='horizontally'>
                    <Grid.Column width={10}>
                        <MarketDetailsCurrency market={market} />
                    </Grid.Column>
                    <Grid.Column width={1} style={{ visibility: 'none' }}>

                    </Grid.Column>
                    <Grid.Column width={5}>
                        <MarketDetailsPrice market={market} />
                    </Grid.Column>
                </Grid>
            </Segment>

        </Fragment>


    )
})