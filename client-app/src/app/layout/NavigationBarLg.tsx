import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, Label, Menu, Segment } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { router } from '../router/Route';


export default observer(function NavigationBarLg() {

    const { userStore: { user, logout, isLoggedIn } } = useStore();
    const [activeItem, setactiveItem] = useState("home");



    return (
        <Segment attached size='massive' className='Menu_header_segment'>
            <Menu secondary>


                <Menu.Item>
                  
                    <Label style={{ padding: 'none' }} as='a' color='teal' size='huge' href='/'>
                        Baltic Mallus 
                    </Label>
                </Menu.Item>
            
                <Menu.Item
                    name='D Visa Sample'
                    active={activeItem === 'd visa sample'}
                    className='HeaderDesktop_item'
                    onClick={(e) => {setactiveItem(e.currentTarget.text.toLowerCase()); router.navigate('/dvisa');}}
                />
                <Menu.Item
                    name='About us'
                    active={activeItem === 'about us'}
                    className='HeaderDesktop_item'
                    onClick={(e) => {setactiveItem(e.currentTarget.text.toLowerCase()); router.navigate('/about');}}
                   
                />


                <Menu.Menu position='right'>
                    <Dropdown item text={user?.firstName || 'Guest'}>
                        <Dropdown.Menu>
                            {!isLoggedIn && <Dropdown.Item as={NavLink} to='/login' text='Login' icon='lock' />}
                            {isLoggedIn && <Dropdown.Item onClick={logout} text='Logout' icon='power' />}
                        </Dropdown.Menu>
                    </Dropdown>

              
                </Menu.Menu>


                {/* section */}
            </Menu>
        </Segment>

    )
});