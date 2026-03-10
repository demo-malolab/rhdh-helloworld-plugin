# This project show an very lean example of a custom Red Hat Developer Hub dynamic plugin

Build and deployment setup:

`node -v` -> v22.22.0
`yarn -v` -> 4.12.0

Deploying your new custom plugin:
```
#cleaning
rm -rf dist-dynamic
yarn install
yarn tsc
yarn build

#packaging and pushing OCI image of dynamic plugin
npx -y @red-hat-developer-hub/cli@latest plugin package --tag quay.io/alexmalo/rhdh-demo-plugins/hello-world:hello-fe-1.0.3
podman push quay.io/alexmalo/rhdh-demo-plugins/hello-world:hello-fe-1.0.3
```

Using your new plugin:
```
#Update the dynamic-plugin.yaml of your RHDH instance to pull this new OCI (See output of the npx command to see an example of config file addition)
Here is an example dynamic-plugins.yaml for these plugins:
plugins:
  - package: oci://quay.io/alexmalo/rhdh-demo-plugins/hello-world:hello-fe-1.0.3!first-rhdh-plugin-test
    disabled: false
    pluginConfig:
      dynamicPlugins:
        frontend:
          first-rhdh-plugin-test:
            appIcons:
              - name: chatIcon
                importName: ChatIcon
            dynamicRoutes:
              - path: /first-rhdh-plugin-test
                importName: HelloWorldPage
                menuItem:
                  text: Hello World
                  icon: chatIcon

#(Optional)This exemple plugin demonstrate a hello world calling an external API to fetch its data. For it to work, you need to include those line in your app-config.yaml of RHDH config
proxy:
      endpoints:
        '/random-number-api':
          target: http://www.randomnumberapi.com
          changeOrigin: true
          secure: false
```
