import { Button, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useAuthContext } from '../../hooks/context/AuthContext';
import {
  SocialFacebookSVG,
  SocialGoogleSVG,
  SocialTwitterkSVG,
} from '../../assets/social';

export default function SocialLogin({ setFieldValue = () => {} }) {
  const { currentUser, facebookSignIn, googleSignIn, twitterSignIn } =
    useAuthContext();

  const handleGoogleLogin = async () => {
    await googleSignIn();
  };

  const handleFacebookLogin = async () => {
    await facebookSignIn();
  };

  const handleTwitterLogin = async () => {
    await twitterSignIn();
  };

  useEffect(() => {
    if (currentUser?.displayName && setFieldValue) {
      setFieldValue('email', currentUser.email);
      setFieldValue('nickname', currentUser.displayName || '');
    }
  }, [currentUser]);

  return (
    <Stack direction="row" spacing={2}>
      <Button
        onClick={handleGoogleLogin}
        variant="outlined"
        sx={({ palette }) => ({
          border: `1px solid ${palette.border.main}`,
          display: 'flex',
          px: 1,
          borderRadius: 2,
        })}
      >
        <img style={{ margin: 'auto' }} src={SocialGoogleSVG} alt="google" />
      </Button>
      <Button
        onClick={handleFacebookLogin}
        variant="outlined"
        sx={({ palette }) => ({
          border: `1px solid ${palette.border.main}`,
          display: 'flex',
          px: 1,
          borderRadius: 2,
        })}
      >
        <img style={{ margin: 'auto' }} src={SocialFacebookSVG} alt="google" />
      </Button>
      <Button
        onClick={handleTwitterLogin}
        variant="outlined"
        sx={({ palette }) => ({
          border: `1px solid ${palette.border.main}`,
          display: 'flex',
          px: 1,
          borderRadius: 2,
        })}
      >
        <img style={{ margin: 'auto' }} src={SocialTwitterkSVG} alt="google" />
      </Button>
    </Stack>
  );
}
