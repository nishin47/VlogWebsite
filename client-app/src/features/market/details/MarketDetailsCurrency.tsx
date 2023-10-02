import { observer } from "mobx-react-lite";
import { Button, Card, Header, Icon, Image, Label, Menu, Segment } from "semantic-ui-react";
import AddMinus from "../../../app/common/form/AddMinus";
import { Market } from "../../../app/models/market";
import { useStore } from "../../../app/stores/store";

interface Props {
    market: Market
}

export default observer(function MarketDetailsCurrency({ market }: Props) {

    const { userStore } = useStore();
    const { user } = userStore;


    return (
        <>
            <Segment.Group>
                <div className="leftdiv">
                    <span className="CartHeader" >My Cart</span>
                </div>
                <div className="cartParent">
                    <div className="cartLeftChild" >
                        <Image src={`../assets/marketDetails/${market.currencyImage}`} className="currenyImage" />
                    </div>
                    <Card className="cartRightChild">
                        <Card.Header className='normalheaderfont' >Draw date</Card.Header>
                        <Card.Meta className="justleft">
                            <Label color='green' >
                                <span className="justleft">06/02/2022</span>
                            </Label>
                        </Card.Meta>
                        <Card.Description className='normalfont contestDescription' >
                            Please stay tuned the draw time will be scheduled
                            <span style={{ fontFamily: 'cursive' }} color=''> 8:00 PM CET</span>
                        </Card.Description>
                    </Card>

                </div>

                <div style={{ textAlign: 'left', paddingBottom: 10 }}>
                    <span style={{ color: 'rgba(0,0,0,.4)', paddingLeft: 20, fontSize: 20 }}>per ticket :</span>
                    <span className="amountfont"  >{market.symbol}</span>
                    <span className="amountfont"  >  10.00{market.currency}</span>
                </div>


                <AddMinus />

                <Segment textAlign='right' width={10}>
                    <Button negative size='medium' style={{ width: 200 }}>Add to Cart</Button>
                    <Button positive size='medium' style={{ width: 200 }}>Place Order</Button>
     
                </Segment>



            </Segment.Group>
        </>
    )
})