import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
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
import GoogleSVG from '../../../assets/social/social-google.svg';
import SocialSVG from '../../../assets/social/social-facebook.svg';
import LottieAnimacao from 'lottie-react';
import { MyButton, MyInput } from '../../../components';
import AvatarImage from '../../../assets/avatar-image.json';
import {
  strengthColor,
  strengthIndicator,
} from '../../../utils/password-strength';
import { useAuthContext } from '../../../hooks/context/AuthContext';
import SocialLogin from '../../../components/social-login';

// Login with google, facebook or create from zero
export function FirstStep({ handleNextStep }) {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [imagePreview, setimagePreview] = useState();
  const [selectedFile, setSelectedFile] = useState();

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

  const handleRegisterForm = (values) => {
    console.log('enviou');
    return;
    // TODO - Upload image to firebase storage
    if (selectedFile) {
      const uploadTask = uploadBytesResumable(
        ref(storage, `users/${currentUser.uid}/avatar`),
        selectedFile
      );
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setDoc(doc(db, 'users', currentUser.uid), {
              email: currentUser.email,
              nickname: values.nickname,
              avatar: downloadURL,
            });
          });
        }
      );
    }
  };

  const initialStateForm = {
    nickname: currentUser ? currentUser.displayName : '',
    email: currentUser ? currentUser.email : '',
    password: '',
    passwordConfirmation: '',
    file: currentUser ? currentUser.photoURL : '',
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
      <Typography
        sx={({ palette }) => ({
          fontSize: '0.7rem',
          color: palette.primary.main,
          textAlign: 'center',
          mt: 2,
        })}
      >
        Reaproveite seus dados Google ou Facebook
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
                          {!showPassword2 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    value={values.passwordConfirmation}
                    onChange={handleChange}
                    error={Boolean(
                      errors.passwordConfirmation &&
                        touched.passwordConfirmation
                    )}
                    errorMessage={errors.password}
                  />
                </Stack>
              )}
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
              <input
                style={{ display: 'none' }}
                name="file"
                type="file"
                id="file"
                onChange={onSelectFile}
              />
              <Typography sx={{ textAlign: 'center' }}>
                Foto de perfil:
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
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                    alt="profile"
                  />
                ) : !!currentUser?.photoURL ? (
                  <img
                    src={currentUser?.photoURL}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                    alt="profile"
                  />
                ) : (
                  <LottieAnimacao animationData={AvatarImage} />
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
            <MyButton
              // onClick={handleNextStep}
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Avançar
            </MyButton>
          </form>
        )}
      </Formik>
    </>
  );
}
