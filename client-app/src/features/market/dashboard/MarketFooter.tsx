import React, { Fragment } from 'react';
import { Advertisement, Button, Card, Container, Grid, Header, Icon, Image, List, Segment } from 'semantic-ui-react';

export default function MarketFooter() {

    return (
        <Container>
            <Grid divided inverted stackable>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Header inverted as='h4' content='About' />
                        <List link inverted>
                            <List.Item className='footeritem' as='a'>Sitemap</List.Item>
                            <List.Item className='footeritem' as='a'>Contact Us</List.Item>
                    
                        </List>
                    </Grid.Column>
                    <Grid.Column width={3}>
                       
                    </Grid.Column>
                    <Grid.Column width={7}>
                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )

}