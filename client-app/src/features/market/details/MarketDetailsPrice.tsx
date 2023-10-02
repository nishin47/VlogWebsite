import { observer } from "mobx-react-lite";
import { Icon, Label, Segment } from "semantic-ui-react";
import { Market } from "../../../app/models/market";
import { useStore } from "../../../app/stores/store";

interface Props {
    market: Market
}


export default observer(function MarketDetailsPrice({ market }: Props) {


    const { commonStore } = useStore();
    const { initialCounter } = commonStore;

    return (
        <>
            <Segment>

                <div style={{ textAlign: 'left' }}>
                    <span className="pricedetail" >Price Details</span>
                </div>

                <Segment.Group vertical style={{ border: 'none', boxShadow: 'none' }}>

                    <div style={{ display: 'flex', width: '100%', paddingBottom: 10, border: 'none' }}>
                        <div style={{ width: '50%', paddingRight: '20px', paddingLeft: '20px', textAlign: 'left' }}>
                            <span className="normalfont">Price</span>
                            <span className="normalfont">({initialCounter} Ticket)</span>
                        </div>
                        <div style={{ width: '50%', paddingRight: '20px', paddingLeft: '20px', textAlign: 'left' }}>
                            <span className="normalfont" style={{ float: 'left' }}>{market.symbol}</span>
                            <span className="normalfont">{10 * initialCounter}</span>
                            <span className="normalfont"> {market.currency}</span>
                        </div>
                    </div>

                </Segment.Group>

                <Segment.Group vertical style={{ border: 'none', boxShadow: 'none' }}>

                    <div style={{ display: 'flex', width: '100%', paddingBottom: 10, border: 'none' }}>
                        <div style={{ width: '50%', paddingRight: '20px', paddingLeft: '20px', textAlign: 'left' }}>
                            <span className="normalfont">Quantity</span>
                        </div>
                        <div style={{ width: '50%', paddingRight: '20px', paddingLeft: '20px', textAlign: 'left' }}>
                            <span className="normalfont">{initialCounter}</span>
                        </div>
                    </div>

                </Segment.Group>
                <Segment.Group vertical style={{ border: 'none', boxShadow: 'none' }}>

                    <div style={{ display: 'flex', width: '100%', paddingBottom: 10, border: 'none' }}>
                        <div style={{ width: '50%', paddingRight: '20px', paddingLeft: '20px', textAlign: 'left' }}>
                            <span className="normalfont">Sevice charge</span>
                        </div>
                        <div style={{ width: '50%', paddingRight: '20px', paddingLeft: '20px', textAlign: 'left' }}>
                            <span className="normalfont">$0</span>
                            <span className="strikethrough">10%</span>

                        </div>
                    </div>

                </Segment.Group>



                <Segment.Group vertical style={{ border: 'none', boxShadow: 'none' }}>

                    <div style={{ display: 'flex', width: '100%', paddingBottom: 10, border: 'none' }}>
                        <div style={{ width: '50%', paddingRight: '20px', paddingLeft: '20px', textAlign: 'left' }}>
                            <span style={{ fontWeight: 600 }} className="normalfont">Total Amount</span>
                        </div>
                        <div style={{ width: '50%', paddingRight: '20px', paddingLeft: '20px', textAlign: 'left' }}>
                            <span className="normalfont" style={{float:'left'}} >{market.symbol}</span>
                            <span className="normalfont">{10 * initialCounter}</span>&nbsp;
                            <span className="normalfont">{market.currency}</span>

                        </div>
                    </div>

                </Segment.Group>



            </Segment>

            <Segment textAlign='left' style={{ border: 'none', boxShadow: 'none', paddingTop: '10%' }}>
                <Label as='a' size='huge'>
                    <Icon name='protect' />
                    Safe and Secure Payments.
                </Label>
            </Segment>


        </>

    )
})