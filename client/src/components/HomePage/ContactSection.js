import React, { useState, useRef, useEffect } from 'react';
import { Button, Box, Typography, Grid, Container } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';
import Wave from 'react-wavify';
import emailjs, { send } from '@emailjs/browser';
import TextfieldWrapper from '../FormsUI/Textfield/index';

const initialValues = {
  userFirstname: '',
  userLastname: '',
  userEmail: '',
  userMessage: '',
};

const valSchema = Yup.object().shape({
  userFirstname: Yup.string().required('Obligatorio').min(2, 'Ingresa un nombre completo'),
  userLastname: Yup.string().required('Obligatorio').min(2, 'Ingresa un apellido completo'),
  userEmail: Yup.string().email('Email inválido').required('Obligatorio'),
  userMessage: Yup.string().required('Obligatorio'),
});

const ContactSection = () => {
  const formValues = useRef();
  const [submitted, setSubmitted] = useState('');

  const localHandleSubmit = (values, { resetForm }) => {
    console.log('values: ', formValues.current.values);
    console.log('type values: ', typeof formValues.current.values);

    emailjs
      .send(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        formValues.current.values,
        process.env.REACT_APP_EMAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          setSubmitted('Gracias por tu mensaje');
          resetForm();
        },
        (error) => {
          console.log(error.text);
          setSubmitted('');
        }
      );
  };

  return (
    <div id="contact">
      <Box PaperProps={{ m: 0, p: 0 }}>
        <Wave
          className="wave-end"
          fill="#042A2B"
          paused={false}
          options={{
            height: 20,
            amplitude: 55,
            speed: 0.17,
            points: 5,
          }}
        />
        {/* <Grid container>
          <Grid item xs={12}> */}
        <Container>
          <div>
            <Formik
              innerRef={formValues}
              initialValues={initialValues}
              validationSchema={valSchema}
              onSubmit={(values, { resetForm }) => {
                localHandleSubmit(values, { resetForm });
              }}
            >
              {({ dirty, isValid }) => (
                <Form className="contact-form">
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography
                        className="mb-5 font-semibold  underline-offset-2 "
                        color="white"
                        sx={{ textAlign: 'center', fontSize: '2rem' }}
                      >
                        Contáctanos!
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ paddingRight: 0.5 }}>
                      <TextfieldWrapper className="form-input" name="userFirstname" label="Nombre" />
                    </Grid>
                    <Grid item xs={6} sx={{ paddingLeft: 0.5 }}>
                      <TextfieldWrapper className="form-input" name="userLastname" label="Apellido" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextfieldWrapper className="form-input" name="userEmail" label="Correo electrónico" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextfieldWrapper className="form-input" name="userMessage" label="Ingresa tu Mensaje" />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="submitted">{submitted}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        className="font-bold"
                        id="action-btn"
                        variant="outlined"
                        disabled={!dirty || !isValid}
                        type="submit"
                      >
                        {' '}
                        PONERSE EN CONTACTO
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
        {/* </Grid>
        </Grid> */}
      </Box>
    </div>
  );
};

export default ContactSection;
