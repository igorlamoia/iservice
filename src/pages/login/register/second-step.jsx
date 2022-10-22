import { Stack } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import { MyButton, MyInput } from '../../../components';
import { registerSchemaStep2 } from '../../../utils/validation/register.schema';

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
        }) => (
          <form onSubmit={handleSubmit}>
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
            <Stack sx={{ mt: 3 }} spacing={2}>
              <MyInput
                label="CPF"
                id="cpf"
                value={values.cpf}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.cpf && touched.cpf)}
                errorMessage={errors.cpf}
              />
              <MyInput
                label="Celular"
                id="phone"
                value={values.phone}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.phone && touched.phone)}
                errorMessage={errors.phone}
              />
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ gap: 2 }}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <MyInput
                  label="CEP"
                  id="zipCode"
                  value={values.zipCode}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.zipCode && touched.zipCode)}
                  errorMessage={errors.zipCode}
                />

                <MyInput
                  label="Estado UF"
                  id="state"
                  value={values.state}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.state && touched.state)}
                  errorMessage={errors.state}
                />
              </Stack>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ gap: 2 }}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <MyInput
                  label="Cidade"
                  id="city"
                  value={values.city}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.city && touched.city)}
                  errorMessage={errors.city}
                />
                <MyInput
                  label="Bairro"
                  id="neighborhood"
                  value={values.neighborhood}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.neighborhood && touched.neighborhood)}
                  errorMessage={errors.neighborhood}
                />
              </Stack>
              <MyInput
                label="Endereço"
                id="address"
                value={values.address}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.address && touched.address)}
                errorMessage={errors.address}
              />
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ gap: 2 }}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <MyInput
                  label="Número"
                  id="number"
                  value={values.number}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.number && touched.number)}
                  errorMessage={errors.number}
                />
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
            </Stack>
            <MyButton sx={{ mt: 3 }} type="submit">
              Finalizar cadastro
            </MyButton>
          </form>
        )}
      </Formik>
      <div></div>
    </>
  );
}
