import * as React from 'react';
import { List, ListItem, Box, Stack, Pagination } from '@mui/material';
import Card from '@mui/material/Card';
import { bool } from 'yup';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export function Gallery({ children }) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 1200,
      }}
    >
      {/* <List
        disablePadding={bool}
        sx={{
          maxWidth: 1200,
        }}
      > */}
      <ImageList sx={{}} cols={3} component={Card} rowHeight={550}>
        {children.map((item) => (
          <ImageListItem
            key={item.Card}
            sx={{
              marginBottom: 2,
              marginRight: 2,
              marginTop: 1,
              marginLeft: 2,
            }}
          >
            <Card variant="outlined">{item}</Card>
          </ImageListItem>
        ))}
      </ImageList>
      {/* <Stack spacing={2} sx={{ paddingTop: 2 }}>
        <Pagination count={10} disabled />
      </Stack> */}
    </Box>
  );
}
{
  /* <Card
  spacing={1}
  variant="outlined"
  sx={{ display: 'flex', flexDirection: 'row' }}
>
  {children}
</Card>; */
}
