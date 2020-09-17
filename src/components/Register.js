import React, { useState } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { Button, Input } from 'react-native-elements';
import { UserContainer } from '../services';

export default function Register() {

    // API
    const axios = require('axios');

    // AUTHENTICATION SERVICE
    const userContainer = UserContainer.useContainer();


    // Registration
    async function onRegister(values: any) {
        axios.post('api/user/apply', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json"
            },
            firstname: values.firstname,
            lastname: values.lastname,
            phonenumber: values.phonenumber
        })
            .then(function (response: any){
                console.log(response);
            })
            .catch(function (error: any) {
                console.log(error)
            });
    }

    // Login
    async function onLogin(values: any) {
        axios.get('api/me', {
            headers: {
                Authorization: "Bearer " + values.token
            }
        })
            .then(function (response: any) {
                console.log(response);
                userContainer.login(values.token);
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }



    return (
      <View>
          <Formik initialValues={{ firstname: '', lastname: '', phonenumber: '' }}
                  onSubmit={values => onRegister(values)}
          >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                      <Input
                          onChangeText={handleChange('firstname')}
                          onBlur={handleBlur('firstname')}
                          value={values.firstname}
                          placeholder='Prénom'
                          textContentType='givenName'
                      />
                      <Input
                          onChangeText={handleChange('lastname')}
                          onBlur={handleBlur('lastname')}
                          value={values.lastname}
                          placeholder='Nom'
                          textContentType='familyName'
                      />
                      <Input
                          onChangeText={handleChange('phonenumber')}
                          onBlur={handleBlur('phonenumber')}
                          value={values.phonenumber}
                          placeholder='Téléphone'
                          textContentType='telephoneNumber'
                          keyboardType='phone-pad'
                      />
                      <Button onPress={handleSubmit} title='Enregistrement' />
                  </View>
              )}
          </Formik>

          <Formik initialValues={{ token: '' }}
                  onSubmit={values => onLogin(values)}
          >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                      <Input
                          onChangeText={handleChange('token')}
                          onBlur={handleBlur('token')}
                          value={values.token}
                          placeholder='Token'
                          textContentType='none'
                      />
                      <Button onPress={handleSubmit} title='Connexion' />
                  </View>
                  )}
          </Formik>
      </View>
    );
}
