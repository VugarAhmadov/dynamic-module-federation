import { ReactNode } from 'react';
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { Shell } from '@admin/components/shell';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider>
          <Notifications />
          <Shell>{children}</Shell>
        </MantineProvider>
      </body>
    </html>
  );
}
