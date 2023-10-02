import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Grid, Header, Icon, Image, Label, Segment } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import LoadingComponenets from '../../app/layout/LoadingComponent';
import MyErrorMessage from '../../app/common/form/MyErrorMessage';
import { LoginValues } from '../../app/models/user';


export default observer(function ConfirmPasswordMb() {
    const { userStore } = useStore();
    const { messagetype, headermessage, content } = userStore;
    var obj: LoginValues = {
        email: '',
        password: ''
    };


    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const data = urlParams.get('data');
        obj = data ? JSON.parse(atob(data)) : undefined;
        console.log(obj!.email!);

    }, [window.location.search]);



    if (!userStore.isloaded) return <LoadingComponenets content='Signing you in...' />

    return (
        <Formik initialValues={{ email: '', password: '', firsttime: false, error: null }}
            onSubmit={(values, { setErrors }) =>

                userStore.changepassword({ ...values, email: obj!.email! }).catch(error => setErrors({
                    error
                }))

            }
            validationSchema={Yup.object({
                password: Yup.string()
                    .required('Password is required')
                    .min(8, 'Password must be at least 8 characters')
                    .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/,
                        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
                    ),
                password2: Yup.string()
                    .required('Please confirm your password')
                    .oneOf([Yup.ref('password')], 'Passwords must match')
            })}>

            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (

                <Segment className='Signinform' basic style={{ padding: 0 }}>
                    <Grid stackable columns={1} textAlign='center'>
                        <Grid.Column style={{ maxWidth: 400, margin: '0 auto' }}>
                            <Segment basic>
                                <Header as='h2' style={{ color: '#676F7A', fontSize: '16px' }} floated='left'>
                                Enter Password
                                </Header>
                            </Segment>
                            <Segment basic style={{ padding: 0 }}>
                                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                <MyTextInput name='password' placeholder='Enter new Password' type='password' />
                                    <MyTextInput name='password2' placeholder='Confirm new Password' type='password' />

                                    <ErrorMessage name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />
                                    <Button loading={isSubmitting} disabled={!isValid || !dirty || isSubmitting} color='teal' type='submit' fluid size='large'>
                                        Confirm Password
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