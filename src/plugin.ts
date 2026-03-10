import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

const pluginId = 'first-rhdh-plugin-test';

export const helloWorldPlugin = createPlugin({
  id: pluginId,
  routes: {
    root: rootRouteRef,
  },
  apis: [],
});

export const HelloWorldPage = helloWorldPlugin.provide(
  createRoutableExtension({
    name: 'HelloWorldPage',
    component: () =>
      import('./components/HelloWorldComponent').then(m => m.HelloWorldComponent),
    mountPoint: rootRouteRef,
  }),
);
