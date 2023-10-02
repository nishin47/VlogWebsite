import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Flag, Grid, Input, Popup, Segment, Table } from 'semantic-ui-react';
import countries from '../../../data/country.json';
import { useStore } from '../../stores/store';
import MyTextInput from './MyTextInput';
import { observer } from 'mobx-react-lite';




export default observer(function MyListInput() {

    const [Country, setCountry] = useState(countries);
    const { modalStore } = useStore();


    const FilterCountry = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const target = e.target;
        let targetValue = target.value;
        setCountry(countries.filter(country => country.country.toLowerCase().includes(targetValue.toLowerCase()) == true));

    };

    const saveCcode = (e: React.MouseEvent<HTMLInputElement>) => {

        const target = e.target as HTMLTableRowElement;
        let ccode;
        if (!isNaN(Number(target.innerText)))
            ccode = parseInt(target.innerText)
        else
            ccode = countries.find(co => co.country === target.innerText)?.code;
        if (ccode)
            modalStore.setCountry(ccode);

            modalStore.closeParent();

    }

    const flagRenderer = (item: any) => <Flag name={item} />

    return (

        <Grid stackable>


            <Segment basic style={{ maxHeight: '300px', maxWidth: 'auto', overflowY: 'auto' }}>
                {/* Content to display in the scrollable popup */}
                {/* Add as much content as needed */}
                <Input style={{ width: '100%' }} placeholder='Enter country' onChange={(e) => FilterCountry(e)} />

                <Table basic style={{ width: '100%' }}>
                    <Table.Body>
                        {Country.map((country) => (
                            <Table.Row key={country.id} className='codePhone' onClick={saveCcode}>
                                <Table.Cell>{flagRenderer(country.country.toLowerCase())}</Table.Cell>
                                <Table.Cell>{country.country}</Table.Cell>
                                <Table.Cell>{country.code}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Segment>


        </Grid>
    )
});