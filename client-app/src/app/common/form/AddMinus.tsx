import { observer } from 'mobx-react-lite';
import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

export default observer(function AddMinus() {


    const {commonStore} = useStore();
    const { initialCounter } = commonStore;

    return (
    <div style={{ textAlign: 'left', paddingLeft: '20px', paddingBottom: '10px' }}>

        <Menu compact size='tiny' style={{ height: '10px' }}>
            <Menu.Item as='a' onClick={() => { commonStore.minusCounter() }}>
                <Icon name='minus' size='tiny' />

            </Menu.Item>
            <Menu.Item  >
                {initialCounter}

            </Menu.Item>
            <Menu.Item as='a' onClick={() => { commonStore.addCounter() }}>
                <Icon name='plus' size='tiny' />
            </Menu.Item>

        </Menu>

    </div>)

})