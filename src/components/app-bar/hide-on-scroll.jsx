import { Slide, useScrollTrigger } from '@mui/material';

export function HideOnScroll(barProps) {
  const { children, window } = barProps;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
