import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Image, Label, Menu } from 'semantic-ui-react';
import { Market } from '../../../app/models/market';


interface Props {
    market: Market
}

export default function MarketPageItem({ market }: Props) {

    return (


        <Card >
            <Image src={`assets/markets/${market.imageId}`} wrapped ui={false} size='tiny' style={{ width: '100px' }} />
           

            <Card.Content>
                <Card.Header>{market.marketName}</Card.Header>
                {   }




                {/* <Label className='CategoryClass' attached="bottom right" color="green">
                    <Icon name="dollar" /> 2000
                </Label> */}
            </Card.Content>
            <Button style={{ background: 'rgb(196 199 205)', color: '#1c1919' }} as={Link} to={market ? '/dvisa': `market/`}>Click here</Button>

        </Card>

    )
}
