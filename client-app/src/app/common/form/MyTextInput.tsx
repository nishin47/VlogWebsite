import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    type?: string;
    name: string;
    label?: string;
    style?:{};


}

export default function MyTextInput(props: Props) {

    const [field, meta] = useField(props.name);



    if (props.name === 'password' || props.name === 'password2')
        return (
            <Form.Field error={meta.touched && !!meta.error}>

                <div className="ui action left icon input password-container">
                    <i className="unlock alternate icon"></i>
                    <input {...field} {...props} />
                </div>
                
                {meta.touched && meta.error ? (
                    <Label basic color='red' style={{ width: '100%', marginTop: '10px' }}>{meta.error}</Label>
                ) : null}
            </Form.Field>
        )


    return (


        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props}  />
            {meta.touched && meta.error ? (
                <Label basic color='red' style={{ width: '100%', marginTop: '10px' }}>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}