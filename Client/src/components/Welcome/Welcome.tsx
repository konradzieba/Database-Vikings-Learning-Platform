import { Text, Anchor, Paper, Button } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <Text className={classes.title}>
      Hejka <Button>Kliknij</Button>
    </Text>
  );
}
