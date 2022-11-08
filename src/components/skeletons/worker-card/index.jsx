import { Divider, Paper, Skeleton, Stack } from '@mui/material';

import React from 'react';

export default function SkeletonWorkercard() {
  return (
    <div>
      <Paper
        sx={{
          p: '24px',
          overflow: 'hidden',
          borderRadius: 1.5,
          scrollSnapAlign: 'start',
          width: 270,
          minWidth: 250,
        }}
        className="card-body"
        elevation={4}
      >
        <Stack direction="row">
          <Skeleton variant="circular" width={120} height={120} />
          <Stack sx={{ mt: 2, ml: 2 }}>
            <Skeleton height={18} width="4.5rem" />
            <Skeleton height={19} width="5.5rem" sx={{ ml: 0.5 }} />
            <Skeleton height={18} width="9rem" />
            <Skeleton height={18} width="9rem" />
            <Skeleton height={18} width="9rem" />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={0.7}
          justifyContent="center"
          sx={{
            mt: 2,
          }}
        >
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
        </Stack>
        <Skeleton width={260} height={24} />
        <Skeleton width={200} height={24} />
        <Skeleton height={50} />
        <Stack direction="row" justifyContent="flex-end">
          <Skeleton variant="circular" height={42} width={42} />
        </Stack>
        <Skeleton width={200} />
        <Skeleton height={50} />
        <Stack alignItems="center">
          <Skeleton width={252} height={60} sx={{ mt: 2 }} />
        </Stack>
      </Paper>
    </div>
  );
}
