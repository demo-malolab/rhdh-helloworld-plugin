import {
  createFrontendPlugin,
  PageBlueprint,
  NavItemBlueprint,
} from '@backstage/frontend-plugin-api';
import {
} from '@backstage/core-plugin-api';
import {
  convertLegacyRouteRef,
  convertLegacyRouteRefs,
  compatWrapper,
} from '@backstage/core-compat-api';
import ChatIcon from '@material-ui/icons/Chat';
import { rootRouteRef } from './routes';

const helloWorldPage = PageBlueprint.makeWithOverrides({
  factory(originalFactory, _) {
    return originalFactory({
      path: '/first-rhdh-plugin-test',
      routeRef: convertLegacyRouteRef(rootRouteRef),
      loader: () =>
        import('./components/HelloWorldComponent').then(m =>
          compatWrapper(<m.HelloWorldComponent />),
        ),
    });
  },
});

const helloWorldNavItem = NavItemBlueprint.make({
  params: {
    routeRef: convertLegacyRouteRef(rootRouteRef),
    title: 'Hello World',
    icon: ChatIcon,
  },
});

export default createFrontendPlugin({
  pluginId: 'first-rhdh-plugin-test',
  info: { packageJson: () => import('../package.json') },
  extensions: [helloWorldPage, helloWorldNavItem],
  routes: convertLegacyRouteRefs({
    root: rootRouteRef,
  }),
});
