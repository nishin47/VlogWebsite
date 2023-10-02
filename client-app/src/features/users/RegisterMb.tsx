import React, { useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Grid, Header, Label, Segment, Image, Icon } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import 'react-phone-number-input/style.css'
import MyErrorMessage from '../../app/common/form/MyErrorMessage';
import PrivacyPolicyCheckbox from '../../app/common/form/MyCheckBox';



export default observer(function Register() {


    const { userStore } = useStore();
    const { messagetype, headermessage, content } = userStore;
    const [isPrivacyChecked, setPrivacyChecked] = useState(false);

    const handleCheckboxChange = (isChecked: boolean) => {

        setPrivacyChecked(isChecked);
        // Do something with the updated isChecked value
    };


    return (
        <Formik initialValues={{ email: '', firstname: '', lastname: '', password: '', countrycode: '', phonenumber: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                userStore.register(values).catch(error => setErrors({
                    error
                }))
            }
            validationSchema={
                Yup.object({
                    email: Yup.string().email('Invalid email').required('Email is required'),
                    phonenumber: Yup.string()
                        .matches(/^\d+$/, 'Invalid phone number')
                        .required('Phone number is required'),
                    password: Yup.string()
                        .required('Password is required')
                        .min(8, 'Password must be at least 8 characters')
                        .matches(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/,
                            'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
                        ),
                    password2: Yup.string()
                        .required('Confirm Password is required')
                        .oneOf([Yup.ref('password')], 'Passwords must match'),
                    firstname: Yup.string().required(),
                    lastname: Yup.string().required(),
                })
            }>

            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (

                <Segment className='Signinform' basic style={{ padding: 0 }}>
                    <Grid stackable columns={1} textAlign='center'>
                        <Grid.Column style={{ maxWidth: 400, margin: '0 auto' }}>
                            <Grid columns='equal' width='100%'>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment basic>
                                            <Header as='h2' style={{ color: '#676F7A', fontSize: '16px' }} floated='left'>
                                                Create Account
                                            </Header>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment basic>
                                            <Grid>
                                                <Grid.Row>
                                                    <Grid.Column width={2}>
                                                        <h2 className="ui disabled header" style={{ fontSize: '16px' }}>Or</h2>
                                                    </Grid.Column>
                                                    <Grid.Column width={10}>
                                                        <Header as='h2' style={{ color: '#676F7A', fontSize: '16px' }} floated='left'>
                                                            <a href='/login'> Sign in </a>
                                                        </Header>
                                                    </Grid.Column>
                                                </Grid.Row>


                                            </Grid>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>

                            </Grid>
                            <Segment basic >
                                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'  >

                                    <MyTextInput name='email' placeholder='E-mail' type='email' />
                                    <MyTextInput name='phonenumber' placeholder='Phone number' type='tel' />
                                    <MyTextInput name='password' placeholder='Password' type='password' />
                                    <MyTextInput name='password2' placeholder='Confirm Password' type='password' />
                                    <MyTextInput name='firstname' placeholder='First Name' />
                                    <MyTextInput name='lastname' placeholder='Last Name' />

                                    <Segment basic>
                                        <PrivacyPolicyCheckbox handleCheckboxChange={handleCheckboxChange} />
                                    </Segment>

                                    <ErrorMessage name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />
                                    <Button loading={isSubmitting} disabled={!isPrivacyChecked || !isValid || !dirty || isSubmitting} color='teal' type='submit' fluid size='large'>
                                        Submit
                                    </Button>
                                </Form>

                                {messagetype !== '' && <MyErrorMessage messagetype={messagetype} headermessage={headermessage} content={content} />}
                            </Segment>
                        </Grid.Column>

                        <Grid.Column>
                            <Segment basic>
                                <Image src={`assets/LandingPage/home.png`} />
                            </Segment>

                        </Grid.Column>
                    </Grid>

                    <footer className="footer" >
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '16px', color: '#333333', margin: '0' }}>Baltic Mallus ©</p>
                            <p style={{ fontSize: '14px', color: '#777777', margin: '0' }}>
                                Welcome to our website! We're thrilled to have you join us on an incredible adventure as we explore the captivating beauty and rich cultural heritage of the Baltics.
                            </p>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Button color='instagram' href='https://www.instagram.com/baltic_mallus/' >
                                <Icon name='instagram' /> Instagram
                            </Button>


                            <Button color='youtube' href='https://www.youtube.com/channel/UCpDgOIP0vHbwa41QDDJ6aCA'>
                                <Icon name='youtube' /> YouTube
                            </Button>
                        </div>
                    </footer>


                </Segment>

            )}

        </Formik>
    )
})