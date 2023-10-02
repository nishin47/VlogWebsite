import { Button, Container, Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
export default function MarketPageHeader() {

    const { userStore: { user, logout, isLoggedIn }, modalStore } = useStore();

    return (
        <Container text>

            <Header
                as='h4'
                content='Baltic Mallus'
                inverted
                style={{
                    fontSize: '4em',
                    fontWeight: 'bolder',
                    marginBottom: 0,
                    marginTop: '0.5em',
                    color: 'green'
                }}

            />

            <Header
                as='h2'
                content='Welcomes you to our website'
                inverted
                style={{
                    fontSize: '1.7em',
                    fontWeight: 'normal',
                    marginTop: '1.5em',
                    color: 'green'
                }}
            />

            {!isLoggedIn && <Button positive href='/login'>Login</Button>}
            {!isLoggedIn && <Button positive href='/register'>Sign Up</Button>}
        </Container>

    )



}