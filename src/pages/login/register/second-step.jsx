import React, { useState } from 'react';
import { Alert, Box, Grid, Snackbar, Stack } from '@mui/material';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { MobileDatePicker } from '@mui/x-date-pickers';

import { MyButton, MyInput } from '../../../components';
import { registerSchemaStep2 } from '../../../utils/validation/register.schema';
import { api, apiViacep } from '../../../utils/api';
import { isEmptyObject } from '../../../utils/object';
import { useAuthContext } from '../../../hooks/context/AuthContext';
import { removeSymbols } from '../../../utils/format';
import { useInteractivityContext } from '../../../hooks/context/interactivityContext';

export function SecondStep() {
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [errorForm, setErrorForm] = useState({ error: false });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logUserInApi } = useAuthContext();

  const { setInteractivityError, setInteractivitySuccess } =
    useInteractivityContext();

  const initialStateForm = {
    cpf: '',
    phone: '',
    zipCode: '',
    address: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    neighborhood: '',
    birthDate: '',
  };

  const handleRegisterForm = async (values) => {
    try {
      setIsLoading(true);
      await api.post('cadastrar/usuario', {
        nome: currentUser.displayName,
        email: currentUser.email,
        cpf: removeSymbols(values.cpf),
        numTelefone: removeSymbols(values.phone),
        cep: removeSymbols(values.zipCode),
        estado: values.state,
        cidade: values.city,
        bairro: values.neighborhood,
        rua: values.address,
        endNumero: values.number,
        endComplemento: values.complement,
        idFirebase: currentUser.uid,
        dataNascimento: values.birthDate,
        linkFoto: currentUser.photoURL,
      });
      logUserInApi(currentUser.uid);
      // console.log('data', data);
      setIsLoading(false);
      setInteractivitySuccess(
        'Cadastro finalizado com sucesso! Seja bem-vindo(a)!'
      );
      navigate('/');
    } catch (err) {
      setIsLoading(false);
      if (err?.response?.data?.mensagem) {
        return setInteractivityError(err?.response?.data?.mensagem);
      }
      setErrorForm({ error: true, message: 'Falha na API' });
    }
  };

  const handleZipCode = async (e, setFieldValue) => {
    const regexPattern = /^[0-9]{5}-[0-9]{3}$/;
    try {
      if (regexPattern.test(e.target.value)) {
        setIsLoadingCep(true);

        const { data } = await apiViacep.get(`${e.target.value}/json/`);
        if (data.erro) {
          throw new Error('CEP inválido');
        }
        setFieldValue('state', data.uf);
        setFieldValue('city', data.localidade);
        setFieldValue('neighborhood', data.bairro);
        setFieldValue('address', data.logradouro);
        setFieldValue('complement', data.complemento);
      }
    } catch (error) {
      setFieldValue('state', '');
      setFieldValue('city', '');
      setFieldValue('neighborhood', '');
      setFieldValue('address', '');
      setFieldValue('complement', '');
      setErrorForm({ error: true, message: error.message });
    } finally {
      setIsLoadingCep(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialStateForm}
        validationSchema={registerSchemaStep2}
        onSubmit={async (values) => {
          handleRegisterForm(values);
        }}
      >
        {({
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1, mt: 3 }}>
              <MobileDatePicker
                onChange={(value) => setFieldValue('birthDate', value, true)}
                value={values.birthDate}
                onBlur={handleBlur}
                toolbarTitle="Selecione sua data de nascimento"
                renderInput={(params) => (
                  <MyInput
                    {...params}
                    label="Data de nascimento"
                    id="birthDate"
                    onBlur={handleBlur}
                    error={Boolean(errors.birthDate && touched.birthDate)}
                    errorMessage={errors.birthDate}
                  />
                )}
              />
              <Grid container columnSpacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask="999.999.999-99"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cpf}
                  >
                    {() => (
                      <MyInput
                        label="CPF"
                        id="cpf"
                        error={Boolean(errors.cpf && touched.cpf)}
                        errorMessage={errors.cpf}
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputMask
                    mask="(99) 99999-9999"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  >
                    {() => (
                      <MyInput
                        label="Celular"
                        id="phone"
                        value={values.phone}
                        error={Boolean(errors.phone && touched.phone)}
                        errorMessage={errors.phone}
                      />
                    )}
                  </InputMask>
                </Grid>
              </Grid>
              <Grid container columnSpacing={2}>
                <Grid item xs={8}>
                  <InputMask
                    mask="99999-999"
                    onChange={(e) => {
                      handleZipCode(e, setFieldValue);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.zipCode}
                  >
                    {() => (
                      <MyInput
                        label="CEP"
                        id="zipCode"
                        value={values.zipCode}
                        error={Boolean(errors.zipCode && touched.zipCode)}
                        errorMessage={errors.zipCode}
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={4}>
                  <MyInput
                    isLoading={isLoadingCep}
                    label="UF"
                    id="state"
                    value={values.state}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.state && touched.state)}
                    errorMessage={errors.state}
                  />
                </Grid>
              </Grid>
              <Grid container columnSpacing={2}>
                <Grid item xs={6}>
                  <MyInput
                    isLoading={isLoadingCep}
                    label="Cidade"
                    id="city"
                    value={values.city}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.city && touched.city)}
                    errorMessage={errors.city}
                  />
                </Grid>
                <Grid item xs={6}>
                  <MyInput
                    isLoading={isLoadingCep}
                    label="Bairro"
                    id="neighborhood"
                    value={values.neighborhood}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.neighborhood && touched.neighborhood)}
                    errorMessage={errors.neighborhood}
                  />
                </Grid>
              </Grid>
              <Grid container columnSpacing={2}>
                <Grid item xs={8}>
                  <MyInput
                    isLoading={isLoadingCep}
                    label="Endereço"
                    id="address"
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.address && touched.address)}
                    errorMessage={errors.address}
                  />
                </Grid>
                <Grid item xs={4}>
                  <MyInput
                    label="Nº"
                    id="number"
                    value={values.number}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.number && touched.number)}
                    errorMessage={errors.number}
                  />
                </Grid>
              </Grid>
            </Box>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{ gap: 2 }}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <MyInput
                isLoading={isLoadingCep}
                label="Complemento"
                id="complement"
                value={values.complement}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.complement && touched.complement)}
                errorMessage={errors.complement}
              />
            </Stack>
            <MyButton
              sx={{ mt: 3 }}
              type="submit"
              disabled={!isEmptyObject(errors) || isLoading}
              isLoading={isLoading}
            >
              Finalizar cadastro
            </MyButton>
          </form>
        )}
      </Formik>
      <Snackbar
        open={errorForm.error}
        autoHideDuration={6000}
        onClose={() => setErrorForm(false)}
      >
        <Alert
          onClose={() => setErrorForm(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorForm.message}
        </Alert>
      </Snackbar>
    </>
  );
}
