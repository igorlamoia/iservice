import { Slide, useScrollTrigger } from '@mui/material';
import { cloneElement } from 'react';

export function HideOnScroll(barProps) {
  const { children, window } = barProps;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  const heightToShadow = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {cloneElement(children, {
        elevation: heightToShadow ? 4 : 0,
      })}
    </Slide>
  );
}
