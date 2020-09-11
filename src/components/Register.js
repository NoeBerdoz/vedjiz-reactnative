import React, { useState } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
    return (
      <View>
          <Formik initialValues={{ firstname: '', lastname: '', telephoneNumber: '' }}
                  onSubmit={values => console.log(values)}
          >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                      <Input
                          onChangeText={handleChange('firstname')}
                          onBlur={handleBlur('firstname')}
                          value={values.firstname}
                          placeholder='Prénom'
                          textContentType='givenName'
                          style={{ marginBottom: 50 }}
                      />
                      <Input
                          onChangeText={handleChange('lastname')}
                          onBlur={handleBlur('lastname')}
                          value={values.lastname}
                          placeholder='Nom'
                          textContentType='familyName'
                          style={{ marginBottom: 50 }}
                      />
                      <Button onPress={handleSubmit} title='Enregistrement' />
                  </View>
              )}
          </Formik>

          <Formik initialValues={{ token: '' }}
                  onSubmit={values => console.log(values)}
          >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                      <Input
                          onChangeText={handleChange('token')}
                          onBlur={handleBlur('token')}
                          value={values.token}
                          placeholder='Token'
                          textContentType='none'
                          style={{ marginBottom: 50 }}
                      />
                      <Button onPress={handleSubmit} title='Connexion' />
                  </View>
                  )}
          </Formik>
      </View>
    );
}
