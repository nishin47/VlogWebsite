import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Header, Icon, Image, Label, Message, Segment } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import MyOTPinput from '../../app/common/form/MyOTPinput';
import * as Yup from 'yup';
import LoadingComponenets from '../../app/layout/LoadingComponent';
import MyErrorMessage from '../../app/common/form/MyErrorMessage';


export default observer(function Login() {
  const { userStore } = useStore();
  const [visible, setVisible] = useState(false);
  const [header, setHeader] = useState('Login');
  const [buttonType, setbuttonType] = useState('Login');
  const [otp, setOtp] = useState('');
  const { messagetype, headermessage, content } = userStore;


  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const encodedString = urlParams.get('data');

    if (encodedString) {
      userStore.isloaded = false;
      const decodedString = atob(encodedString);
      const decodedObject = JSON.parse(decodedString);
      userStore.login_new(decodedObject);
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
        email: Yup.string().required('Email or Phone number is required'),
        password: Yup.string().required()
      }) : Yup.object({
        email: Yup.string().required('Email or Phone number is required')
      })}>

      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (

        <Segment className='Signinform' basic style={{ padding: 0 }}>
          <Grid stackable columns={1} textAlign='center'>
            <Grid.Column style={{ maxWidth: 400, margin: '0 auto' }}>
              <Segment basic>
                <Header as='h2' style={{ color: '#676F7A', fontSize: '16px' }} floated='left'>
                  {header}
                </Header>
              </Segment>
              <Segment basic style={{ padding: 0 }}>
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                  {!userStore.isLogin && <MyTextInput name='email' placeholder='Enter your e-mail' />}
                  {!visible && <MyTextInput name='password' placeholder='Enter new Password' type='password' />}
                  {userStore.isLogin && <MyTextInput name='password2' placeholder='Confirm new Password' type='password' />}


                  <Header as='h2' style={{ color: '#676F7A', fontSize: '16px', cursor: 'pointer' }} >
                    <a onClick={initiateforgotpassword}>Forgot Password</a>
                  </Header>


                  <ErrorMessage name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />

                  <Button
                    loading={isSubmitting}
                    disabled={!isValid || !dirty || isSubmitting}
                    color='teal'
                    type='submit'
                    fluid
                    size='large'
                  >
                    {buttonType}
                  </Button>
                </Form>
                {messagetype !== '' && <MyErrorMessage messagetype={messagetype} headermessage={headermessage} content={content} />}
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment basic>
                <Image src={`assets/LandingPage/home.png`}  />
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


              <Button color='youtube'  href='https://www.youtube.com/channel/UCpDgOIP0vHbwa41QDDJ6aCA'>
                <Icon name='youtube' /> YouTube
              </Button>
            </div>
          </footer>


        </Segment>

      )
      }

    </Formik >
  )
})
