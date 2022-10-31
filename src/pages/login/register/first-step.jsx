/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemButton,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import {
  Visibility,
  VisibilityOff,
  ModeEdit,
  Camera,
} from '@mui/icons-material';
import { auth, db, storage } from '../../../firebase';
import { OrTag } from '..';
import { registerSchema } from '../../../utils/validation/register.schema';
import { MyButton, MyInput } from '../../../components';
import {
  strengthColor,
  strengthIndicator,
} from '../../../utils/password-strength';
import { useAuthContext } from '../../../hooks/context/AuthContext';
import SocialLogin from '../../../components/social-login';
import { isEmptyObject } from '../../../utils/object';
import { FotoComponent } from './photo-component';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Login with google, facebook or create from zero
export function FirstStep({ handleNextStep }) {
  const [errorForm, setErrorForm] = useState({ error: false });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [imagePreview, setimagePreview] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [progress, setProgress] = useState(0);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const handleClickShowPassword = () => {
    setShowPassword((old) => !old);
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2((old) => !old);
  };

  const { currentUser, logOut } = useAuthContext();

  const createUser = async (values) => {
    console.log('createUser');
    console.log('selectedFile', selectedFile);

    // Create user
    const userCreated = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    if (selectedFile) {
      // Create sobrescrever a imagem do usuário Caso ele suba uma imagem
      const storageRef = ref(
        storage,
        `avatar-iserviceProfile-${values.nickname + userCreated.user.uid}`
      );
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progresso =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progresso);
        },
        (error) => {
          throw new Error(error);
          // setErrorForm({ error: true, message: error?.message });
        },
        () =>
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              // Update profile
              await updateProfile(userCreated.user, {
                displayName: values.nickname,
                photoURL: downloadURL,
              });
              // create user on firestore
              await setDoc(doc(db, 'users', userCreated.user.uid), {
                uid: userCreated.user.uid,
                displayName: values.nickname,
                email: userCreated.user.email,
                photoURL: downloadURL,
              });

              // create empty user chats on firestore
              await setDoc(doc(db, 'userChats', userCreated.user.uid), {});
              setIsLoading(false);
              // navigate('/');
            } catch (error) {
              throw new Error(error);
              // console.log(error);
              // setErrorForm({ error: true, message: error?.message });
              // setIsLoading(false);
            }
          })
      );
    } else {
      await updateProfile(userCreated.user, {
        displayName: values.nickname,
      });
      // create user on firestore
      await setDoc(doc(db, 'users', userCreated.user.uid), {
        uid: userCreated.user.uid,
        displayName: values.nickname,
        email: userCreated.user.email,
      });

      // create empty user chats on firestore
      await setDoc(doc(db, 'userChats', userCreated.user.uid), {});
      setIsLoading(false);
      // navigate('/');
    }
    handleNextStep(1);
  };

  const createOrUpdateSocialUser = async (values) => {
    console.log('createOrUpdateSocialUser');
    console.log('selectedFile', selectedFile);
    // Quer atualizar foto
    if (selectedFile) {
      // Create sobrescrever a imagem do usuário Caso ele suba uma imagem
      const storageRef = ref(
        storage,
        `avatar-iserviceProfile-${values.nickname + currentUser.uid}`
      );
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progresso =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progresso);
        },
        (error) => {
          throw new Error(error);
          // setErrorForm({ error: true, message: error?.message });
        },
        () =>
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              // Update profile
              await updateProfile(currentUser, {
                displayName: values.nickname,
                photoURL: downloadURL,
              });
              // create or update user on firestore
              await setDoc(doc(db, 'users', currentUser.uid), {
                uid: currentUser.uid,
                displayName: values.nickname,
                email: currentUser.email,
                photoURL: downloadURL,
              });

              // create empty user chats on firestore
              await setDoc(doc(db, 'userChats', currentUser.uid), {});
              setIsLoading(false);
              // navigate('/');
            } catch (error) {
              throw new Error(error);
              // console.log(error);
              // setErrorForm({ error: true, message: error?.message });
              // setIsLoading(false);
            }
          })
      );
    } else {
      await updateProfile(currentUser, {
        displayName: values.nickname,
      });
      // create or Update user on firestore
      await setDoc(doc(db, 'users', currentUser.uid), {
        uid: currentUser.uid,
        displayName: values.nickname,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
      });

      // create empty user chats on firestore
      await setDoc(doc(db, 'userChats', currentUser.uid), {});
      setIsLoading(false);
      // navigate('/');
    }
    handleNextStep(1);
  };

  const handleRegisterForm = async (values) => {
    setIsLoading(true);
    try {
      if (!currentUser) {
        return createUser(values);
      }
      createOrUpdateSocialUser(values);
    } catch (error) {
      console.log(error);
      setErrorForm({ error: true, message: error?.message });
      setIsLoading(false);
    }
  };

  const initialStateForm = {
    nickname: currentUser ? currentUser.displayName : '',
    email: currentUser ? currentUser.email : '',
    password: '',
    passwordConfirmation: '',
    file: '',
  };

  console.log('Usuário ai:', currentUser);

  useEffect(() => {
    setSelectedFile(undefined); // Limpa file escolhido caso usuário troque de conta
  }, [currentUser]);

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

  // change profile image
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
      <Typography sx={{ fontSize: '0.7rem', mt: 2, textAlign: 'center' }}>
        Reaproveite seus dados, fazendo{' '}
        <Typography
          variant="span"
          sx={({ palette }) => ({
            fontSize: '0.7rem',
            color: palette.primary.main,
            // m: 1,
          })}
        >
          Login
        </Typography>{' '}
        com:
      </Typography>

      <Formik
        initialValues={initialStateForm}
        validationSchema={() => registerSchema(Boolean(currentUser))}
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
            <Stack sx={{ my: 1 }} justifyContent="center" alignItems="center">
              <SocialLogin setFieldValue={setFieldValue} />
            </Stack>
            <OrTag />
            <Stack alignItems="center">
              <Typography
                sx={{
                  fontSize: '0.7rem',
                }}
              >
                <Typography
                  variant="span"
                  sx={({ palette }) => ({
                    color: palette.primary.main,
                    fontSize: '0.7rem',
                  })}
                >
                  Inscreva-se{' '}
                </Typography>
                com novos dados
              </Typography>
            </Stack>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ gap: 2 }}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <MyInput
                  label="Nome/Apelido"
                  id="nickname"
                  {...(currentUser && { shrink: true })}
                  value={values.nickname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(errors.nickname && touched.nickname)}
                  errorMessage={errors.nickname}
                />
              </Stack>
              <MyInput
                label="E-mail"
                id="email"
                {...(currentUser && { disabled: true, shrink: true })}
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.email && touched.email)}
                errorMessage={errors.email}
              />
              {!currentUser && (
                <>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    sx={{ gap: 2 }}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <MyInput
                      label="Senha"
                      onBlur={handleBlur}
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      value={values.password}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
                      error={Boolean(errors.password && touched.password)}
                      errorMessage={errors.password}
                    />
                    <MyInput
                      label="Confirmar Senha"
                      onBlur={handleBlur}
                      id="passwordConfirmation"
                      type={showPassword2 ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword2}
                          >
                            {!showPassword2 ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      value={values.passwordConfirmation}
                      onChange={handleChange}
                      error={Boolean(
                        errors.passwordConfirmation &&
                          touched.passwordConfirmation
                      )}
                      errorMessage={errors.passwordConfirmation}
                    />
                  </Stack>
                  {strength !== 0 && (
                    <FormControl fullWidth>
                      <Box sx={{ mb: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item>
                            <Box
                              style={{ backgroundColor: level?.color }}
                              sx={{ width: 85, height: 8, borderRadius: '7px' }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" fontSize="0.75rem">
                              {level?.label}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </FormControl>
                  )}
                </>
              )}
              <input
                style={{ display: 'none' }}
                name="file"
                type="file"
                id="file"
                onChange={onSelectFile}
              />
              <Typography sx={{ textAlign: 'center' }}>
                Foto de perfil
              </Typography>
              <InputLabel
                htmlFor="file"
                sx={({ palette }) => ({
                  cursor: 'pointer',
                  borderRadius: '50%',
                  border: `2px solid ${palette.border.main}`,
                  height: '100px',
                  width: '100px',
                  overflow: 'unset',
                })}
                style={{ margin: '10px auto' }}
              >
                {isLoading && <CircularProgressWithLabel value={progress} />}
                {!isLoading && (
                  <FotoComponent
                    imagePreview={imagePreview}
                    currentUser={currentUser}
                  />
                )}
                <Box
                  sx={({ palette }) => ({
                    ml: 1,
                    position: 'absolute',
                    top: -6,
                    right: 4,
                    bgcolor: palette.border.main,
                    borderRadius: '50%',
                    p: 0.7,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    Zindex: 100000,
                  })}
                >
                  {imagePreview || Boolean(currentUser) ? (
                    <ModeEdit fontSize="12px" />
                  ) : (
                    <Camera fontSize="12px" />
                  )}
                </Box>
              </InputLabel>
            </Stack>
            <MyButton type="submit" isLoading={isLoading} disabled={isLoading}>
              Avançar
            </MyButton>
          </form>
        )}
      </Formik>
      {Boolean(currentUser) && (
        <ListItemButton sx={{ my: '0.5rem' }} onClick={() => logOut(auth)}>
          <Typography sx={{ textAlign: 'center', width: '100%' }}>
            Sair da Conta
          </Typography>
        </ListItemButton>
      )}
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

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'flex' }}>
      <CircularProgress variant="determinate" {...props} size={100} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
