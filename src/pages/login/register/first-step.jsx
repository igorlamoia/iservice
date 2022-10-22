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

// Login with google, facebook or create from zero
export function FirstStep() {
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
    passwordConfirmation: '',
    file: '',
    birthDate: '',
  };

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
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ gap: 2 }}
                justifyContent="flex-start"
                alignItems="flex-start"
              >
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
              </Stack>
              <MyInput
                label="E-mail"
                id="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(errors.email && touched.email)}
                errorMessage={errors.email}
              />
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
                    errors.passwordConfirmation && touched.passwordConfirmation
                  )}
                  errorMessage={errors.password}
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
              <input
                required
                style={{ display: 'none' }}
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
                  {imagePreview ? (
                    <ModeEdit fontSize="12px" />
                  ) : (
                    <Camera fontSize="12px" />
                  )}
                </Box>
              </InputLabel>
            </Stack>
            <MyButton isLoading={isLoading} disabled={isLoading}>
              Cadastrar
            </MyButton>
          </form>
        )}
      </Formik>
    </>
  );
}
