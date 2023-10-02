import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Label, Menu, Sidebar } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { router } from '../router/Route';
function Overlay() {
    return (
        <div style={{
            backgroundColor: " rgb(255 255 255);",
            position: "fixed",
            height: "110vh",
            width: "100%",
        }} />
    )
}

function HamIcon() {
    return (


        <div>
            <Label style={{ padding: 'none', marginLeft: '-30%' }} as='a' color='teal' size='huge' href='/'>
                Baltic Mallus
            </Label>
            <i className="big bars icon" style={{ float: 'right' }} />
        </div>
    )
}



function CloseIcon() {
    return (<i className="big close red icon" />)
}


export default observer(function NavigationBarMb() {

    const { userStore: { isLoggedIn, logout } } = useStore();
    const [activeItem, setactiveItem] = useState("home");
    const [visible, setVisible] = useState(false);
    const [icon, setIcon] = useState(HamIcon);


    const hideSidebar = () => {

        setIcon(HamIcon)
        setVisible(false)
    }

    const showSidebar = () => {

        setIcon(CloseIcon)
        setVisible(true)
    }
    const toggleSidebar = () => {
        visible ? hideSidebar() : showSidebar()
    }

    return (
        <>
            {visible && <Overlay />}
            <Menu
                size="tiny"
                borderless
                attached
                className='Menu_header_segment'
            >
                <Menu.Item>
                    <Icon inverted name='home' />
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item onClick={toggleSidebar}>
                        {icon}
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Sidebar as={Menu}
                animation='slide along'
                icon='labeled'
                vertical
                visible={visible}
                style={{ width: '80%' }}
            >
                <Menu.Item>
                    <Icon name='home' width="35px" height="35px" style={{ margin: "0 auto" }} alt="" />
                </Menu.Item>

                <Menu.Item
                    name='home'
                    to='/'
                    active={activeItem === 'home'}
                    onClick={(e) => setactiveItem(e.currentTarget.text.toLowerCase())}
                />
                <Menu.Item
                    name='D Visa Sample documents'
                    active={activeItem === 'd visa sample documents'}
                    onClick={(e) => { setactiveItem(e.currentTarget.text.toLowerCase()); router.navigate('/dvisa'); hideSidebar(); }}
                />
                <Menu.Item
                    name='About us'
                    active={activeItem === 'about us'}
                    onClick={(e) => { setactiveItem(e.currentTarget.text.toLowerCase()); router.navigate('/about'); hideSidebar(); }}
                />
                {!isLoggedIn && <Menu.Item
                    name='login'
                    as={NavLink} to='/login'
                    active={activeItem === 'login'}
                    onClick={(e) => {
                        setactiveItem(e.currentTarget.text.toLowerCase());
                        hideSidebar();
                    }} uge
                    position="right"
                />}
                {!isLoggedIn && <Menu.Item
                    name='Sign Up'
                    as={NavLink} to='/register'
                    active={activeItem === 'sign up'}
                    onClick={(e) => {
                        setactiveItem(e.currentTarget.text.toLowerCase());
                        hideSidebar();
                    }}
                />}

                {isLoggedIn && <Menu.Item
                    name='Logout'
                    as={NavLink} to='/'
                    active={activeItem === 'logout'}
                    onClick={(e) => {
                        setactiveItem(e.currentTarget.text.toLowerCase());
                        logout();
                        hideSidebar();
                    }}
                />}
            </Sidebar>
        </>
    )
});