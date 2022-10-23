import React from 'react';
import { Box, Grid, Paper, Stack, styled } from '@mui/material';
import { Field, Formik } from 'formik';
import { MyButton, MyInput } from '../../../components';
import { registerSchemaStep2 } from '../../../utils/validation/register.schema';
import InputMask from 'react-input-mask';

export function SecondStep() {
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

  const handleRegisterForm = (values) => {
    console.log(values);
  };

  console.log('renderizando');

  const Item = styled(Paper)(({ theme }) => ({}));

  return (
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
      }) => (
        <form onSubmit={handleSubmit}>
          <Box sx={{ flexGrow: 1, mt: 3 }}>
            <MyInput
              label="Data de nascimento"
              type="date"
              shrink
              id="birthDate"
              value={values.birthDate}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(errors.birthDate && touched.birthDate)}
              errorMessage={errors.birthDate}
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
                  onChange={handleChange}
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
              label="Complemento"
              id="complement"
              value={values.complement}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(errors.complement && touched.complement)}
              errorMessage={errors.complement}
            />
          </Stack>
          <MyButton sx={{ mt: 3 }} type="submit">
            Finalizar cadastro
          </MyButton>
        </form>
      )}
    </Formik>
  );
}
