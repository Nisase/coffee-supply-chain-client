import React, { useState, useRef } from 'react';
import { Button, Box, Typography, Grid, Container } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Wave from 'react-wavify';
import emailjs from '@emailjs/browser';
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
            height: 30,
            amplitude: 55,
            speed: 0.17,
            points: 5,
          }}
        />
        <div>
          <Formik
            innerRef={formValues}
            initialValues={initialValues}
            validationSchema={valSchema}
            onSubmit={(values, { resetForm }) => {
              localHandleSubmit(values, { resetForm });
            }}
          >
            {/* bg-slate-300 */}
            {({ dirty, isValid }) => (
              <Form className="contact-form  p-5 my-14 rounded-2xl">
                <div className="grid gap-5">
                  <div>
                    <Typography
                      className="mb-2 mt-2 font-semibold  underline-offset-2 "
                      color="white"
                      sx={{ textAlign: 'center', fontSize: '2rem' }}
                    >
                      Contáctanos!
                    </Typography>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-0 lg:gap-x-5">
                    <div>
                      <TextfieldWrapper className="mb-5 lg:mb-0 form-input" name="userFirstname" label="Nombre" />
                    </div>
                    <div>
                      <TextfieldWrapper className="form-input" name="userLastname" label="Apellido" />
                    </div>
                  </div>
                  <div>
                    <TextfieldWrapper className="form-input" name="userEmail" label="Correo electrónico" />
                  </div>
                  <div>
                    <TextfieldWrapper
                      className="lg:mb-1 form-input"
                      name="userMessage"
                      label="Ingresa tu mensaje"
                      multiline
                    />
                  </div>
                  <div>
                    <Typography className="submitted">{submitted}</Typography>
                  </div>
                  <div>
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
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    </div>
  );
};

export default ContactSection;
