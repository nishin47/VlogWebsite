import { useField } from 'formik';
import React, { useRef, useState } from 'react';
import { Dropdown, Form, Icon, Input, Label, Modal, Select } from 'semantic-ui-react';
import LoadingComponenets from '../../layout/LoadingComponent';
import MyListInput from './MyListInput';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';

const options = [
    { key: 'Estonia', text: 'Estonia (+372)', value: '+372' },
    { key: 'articles', text: 'Articles', value: 'articles' },
    { key: 'products', text: 'Products', value: 'products' },
]
interface Props {
    placeholder: string;
    type?: string;
    name: string;
    label?: string;
    onChange: (value: string) => void;
    value: string;
    isPhone: boolean;
}

export default observer(function MyEPInput(props: Props) {

    const boxRef = useRef<HTMLDivElement>(null);
    const { modalStore } = useStore();
    const [modal, setModal] = useState(false);
    const [field, meta] = useField(props.name);
    const inputOnChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const target = e.target;
        let targetValue = target.value;
        props.onChange(targetValue);

    };

    const showPopup = () => {
        modalStore.openModal(<MyListInput />)
        console.log(boxRef.current?.offsetTop! + 10);
        console.log(boxRef.current?.offsetLeft);
    };

    return (

        <div ref={boxRef}>
            <Form.Field error={meta.touched && !!meta.error} >
                <Input labelPosition='right' type='text' placeholder={props.placeholder} style={{paddingBottom : '10px'}}>
                    {props.isPhone && 
                    
                    <Label onClick={() => { modalStore.openParent()}} basic style={{ color: '#289893' }}></Label>}

                    <label>{props.label}</label>
                    <input {...field} {...props} onChange={(e) => inputOnChange(e)} />
                </Input>

                <Modal
                    dimmer='inverted'
                    open={modalStore.modal.country}
                    onClose={() => { modalStore.closeParent() }}
                    style={{ position: 'fixed', top: '50%', left: '66%', transform: 'translate(-50%, -50%)', height: '300px', width: '300px' }}
                >

                    <Modal.Content>
                        <MyListInput />
                    </Modal.Content>

                </Modal>


                {meta.touched && meta.error ? (
                    <Label basic color='red' style={{ width: '100%', marginTop: '10px' }}>{meta.error}</Label>
                ) : null}

            </Form.Field>
        </div>
    )
});