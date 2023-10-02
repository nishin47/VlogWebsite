import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Button, Grid, Header, Image, Label, Segment } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import LoadingComponenets from '../../app/layout/LoadingComponent';
import MyErrorMessage from '../../app/common/form/MyErrorMessage';


export default observer(function LoginMb() {
    const { userStore } = useStore();
    const [visible, setVisible] = useState(false);
    const [header, setHeader] = useState('Login');
    const [buttonType, setbuttonType] = useState('Login');
    const { messagetype, headermessage, content } = userStore;


    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const data = urlParams.get('data');
        const mode = urlParams.get('mode');
        const type = mode ? JSON.parse(atob(mode)) : undefined;

        if (data) {

            const decodedString = atob(data);
            const decodedObject = JSON.parse(decodedString);
            if (type === 0) {
                userStore.isloaded = false;
                userStore.login_new(decodedObject);
            }

        }

    }, [window.location.search]);


    const initiateforgotpassword = () => {

        setVisible(true);
        setHeader("Forgot Password");
        setbuttonType('Sent email');

    };


    if (!userStore.isloaded) return <LoadingComponenets content='Loading app' />

    return (
        <Formik initialValues={{ email: '', password: '', firsttime: false, error: null }}
            onSubmit={(values, { setErrors }) =>

                visible ? userStore.forgotpassword(values).catch(error => setErrors({
                    error
                })) : userStore.login_new(values).catch(error => setErrors({
                    error
                }))

            }
            validationSchema={!visible ? Yup.object({
                email: Yup.string().required('Email is required'),
                password: Yup.string().required()
            }) : Yup.object({
                email: Yup.string().required('Email is required')
            })}>

            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (

                <Segment className='Signinform'>
                    <Grid columns={2} padded>
                        <Grid.Column width={10}>
                            <Segment basic>
                                <Image src={`assets/LandingPage/home.png`} />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={6} textAlign='center' style={{ maxWidth: 400, background: 'white', marginTop: '10%', maxHeight: 350 }}  >
                            <Grid columns='equal' width='100%'>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment basic>
                                            <Header as='h2' style={{ color: '#676F7A', fontSize: '16px' }} floated='left'>
                                                {header}
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

                                    {!userStore.isLogin &&
                                        <MyTextInput name='email' placeholder='Enter your e-mail' />}


                                    {(!visible || userStore.isLogin) &&
                                        <MyTextInput name='password' placeholder='Enter new Password' type='password' />}
                                    {userStore.isLogin && <MyTextInput name='password2' placeholder='Confirm new Password' type='password' />}




                                    <Header as='h2' style={{ color: '#676F7A', fontSize: '16px', cursor: 'pointer' }} >
                                        <a onClick={initiateforgotpassword}>Forgot Password</a>
                                    </Header>


                                    <ErrorMessage name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />
                                    <Button loading={isSubmitting} disabled={!isValid || !dirty || isSubmitting} color='teal' type='submit' fluid size='large'>
                                        {buttonType}
                                    </Button>

                                </Form>

                                {messagetype !== '' && headermessage !== content && <MyErrorMessage messagetype={messagetype} headermessage={headermessage} content={content} />}


                            </Segment>



                        </Grid.Column>
                    </Grid>


                </Segment>

            )}

        </Formik>
    )
})