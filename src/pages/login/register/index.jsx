import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Paper, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import { auth, db, storage } from '../../../firebase';
import DrawerAppBar from '../../../components/app-bar';
import { LogoTipo, OrTag } from '..';
import { registerSchema } from '../../../utils/validation/register.schema';
import GoogleSVG from '../../../assets/social/social-google.svg';
import SocialSVG from '../../../assets/social/social-facebook.svg';
import Add from '../../../assets/add-image.svg';
import { MyButton, MyInput } from '../../../components';

export default function Register() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitAntigo = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            // create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // create empty user chats on firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/');
          } catch (err) {
            console.log(err.message);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  const handleRegisterForm = {};

  const initialStateForm = {
    nickname: '',
    email: '',
    password: '',
    file: '',
  };

  const [imagePreview, setimagePreview] = useState();
  const [selectedFile, setSelectedFile] = useState();

  // UseEffect para foto preview
  useEffect(() => {
    if (!selectedFile) {
      setimagePreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setimagePreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <DrawerAppBar />
      <Container
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Paper sx={{ p: 4, minWidth: { sm: 375 } }} elevation={4}>
          <Stack>
            <Stack
              spacing={1}
              sx={{
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <LogoTipo />
              <Typography>Cadastre-se</Typography>
              <Typography>Olá, seja bem vindo!</Typography>
              <Typography
                sx={({ palette }) => ({
                  fontSize: '0.7rem',
                  color: palette.primary.main,
                  // textAlign: 'center',
                })}
              >
                Reaproveite seus dados Google ou Facebook
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center">
              <img src={GoogleSVG} alt="google" />
              <img src={SocialSVG} alt="google" />
            </Stack>
            <OrTag />
            <Stack alignItems="center">
              <Typography
                sx={{
                  fontSize: '0.7rem',
                  display: 'flex',
                  gap: 1,
                }}
              >
                <Typography
                  sx={({ palette }) => ({
                    color: palette.primary.main,
                    fontSize: '0.7rem',
                  })}
                >
                  Inscreva-se
                </Typography>
                com novos dados
              </Typography>
            </Stack>
            <Formik
              initialValues={initialStateForm}
              validationSchema={registerSchema}
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
                  <Stack spacing={2}>
                    <MyInput
                      label="Nome/Apelido"
                      id="nickname"
                      value={values.nickname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(errors.nickname && touched.nickname)}
                      errorMessage={errors.nickname}
                    />
                    <MyInput
                      label="E-mail"
                      id="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(errors.email && touched.email)}
                      errorMessage={errors.email}
                    />
                    <MyInput
                      label="Senha"
                      id="password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(errors.password && touched.password)}
                      errorMessage={errors.password}
                    />
                    <input
                      required
                      style={{ display: 'none' }}
                      type="file"
                      id="file"
                      onChange={onSelectFile}
                    />
                    <label
                      htmlFor="file"
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        justifyItems: 'center',
                        margin: '10px auto',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={imagePreview || Add}
                        style={{
                          height: 50,
                          width: 50,
                          borderRadius: 10,
                          objectFit: 'cover',
                        }}
                        alt="profile"
                      />
                      <Typography sx={{ ml: 1 }}>
                        {imagePreview ? 'Trocar foto' : 'Adicionar foto'}
                      </Typography>
                    </label>
                  </Stack>
                  <MyButton isLoading={isLoading} disabled={isLoading}>
                    Cadastrar
                  </MyButton>
                </form>
              )}
            </Formik>

            <Typography sx={{ textAlign: 'center', mt: 2, fontSize: '0.8rem' }}>
              Já possui conta? <Link to="/login">Login</Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
