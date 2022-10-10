import { Stack } from '@mui/material';

export function Carousel({ children }) {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 2, md: 4 }}
      // justifyContent="center"
      sx={{
        py: 2,
        overflowX: 'scroll',
        px: 4,
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        minWidth: '100%',
        '& > :first-child': {
          ml: 'auto',
        },
        '& > :last-child': {
          mr: 'auto',
        },
        scrollSnapType: 'x proximity',
        scrollPadding: '0 10px',
      }}
    >
      {children}
    </Stack>
  );
}
