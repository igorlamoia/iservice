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
          width: 252,
          minWidth: 252,
          height: 473.04,
        }}
        className="card-body"
        elevation={4}
      >
        <Stack direction="row">
          <Skeleton variant="circular" width={120} height={120} />
          <Stack sx={{ mt: 2, ml: 2 }}>
            <Skeleton height={25} width="4.8rem" />
            <Skeleton height={20} width="5rem" sx={{ borderRadius: 2 }} />
            <Stack direction="row" alignItems="center">
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton height={24} width="4rem" sx={{ ml: 0.5 }} />
            </Stack>
            <Skeleton height={25} width="6rem" />
            <Skeleton height={25} width="6rem" sx={{ borderRadius: 1.2 }} />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={0.7}
          justifyContent="center"
          sx={{
            mt: 1,
          }}
        >
          <Skeleton variant="circular" width={26} height={26} />
          <Skeleton variant="circular" width={26} height={26} />
          <Skeleton variant="circular" width={26} height={26} />
          <Skeleton variant="circular" width={26} height={26} />
          <Skeleton variant="circular" width={26} height={26} />
          <Skeleton variant="circular" width={26} height={26} />
          <Skeleton variant="circular" width={26} height={26} />
        </Stack>
        <Stack sx={{ mt: 0.8 }}>
          <Skeleton width={165.85} height={24} />
          <Stack direction="row">
            <Skeleton width={71.91} height={18} sx={{ borderRadius: 2 }} />
            <Skeleton
              width={71.91}
              height={18}
              sx={{ borderRadius: 2, ml: 1 }}
            />
          </Stack>
        </Stack>
        <Skeleton width={164} height={21.22} sx={{ mt: 0.8 }} />
        <Skeleton width={164} height={21.22} />
        <Stack direction="row" justifyContent="flex-end">
          <Skeleton variant="circular" height={42.38} width={42.38} />
        </Stack>
        <Skeleton width={160} height={24} sx={{ mt: 1.2 }} />
        <Stack sx={{ mt: 1 }}>
          <Skeleton width={240} height={21.22} />
          <Skeleton width={240} height={21.22} />
        </Stack>
        <Stack alignItems="center" justifyContent="center">
          <Skeleton width={252} height={70} sx={{ mt: 2, borderRadius: 2.5 }} />
        </Stack>
      </Paper>
    </div>
  );
}
