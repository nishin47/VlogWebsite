import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Grid, Header, Image, Label, Segment } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import LoadingComponenets from '../../app/layout/LoadingComponent';
import MyErrorMessage from '../../app/common/form/MyErrorMessage';
import { LoginValues } from '../../app/models/user';


export default observer(function ConfirmPassword() {
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

                <Segment className='Signinform'>
                    <Grid columns={2} padded>
                        <Grid.Column width={10}>
                            <Segment basic>
                                <Image src={`assets/LandingPage/home.png`} />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column   width={6} textAlign='center' style={{ maxWidth: 410, background: 'white', marginTop: '10%', maxHeight: 300 }}  >
                            <Grid columns='equal' width='100%'>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment basic>
                                            <Header as='h2' style={{ color: '#676F7A', fontSize: '16px' }} floated='left'>
                                                Enter Password
                                            </Header>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment basic>
                                            <Grid>
                                                <Grid.Row>
                                                    <Grid.Column width={2}>
                                                        <h2 className="ui disabled header" style={{ fontSize: '16px' }}></h2>
                                                    </Grid.Column>
                                                    <Grid.Column width={10}>
                                                        <Header as='h2' style={{ color: '#676F7A', fontSize: '16px' }} floated='left'>

                                                        </Header>
                                                    </Grid.Column>
                                                </Grid.Row>


                                            </Grid>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>

                            </Grid>

                            <Segment basic>
                                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >

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
                    </Grid>
                </Segment>

            )}

        </Formik>
    )
})