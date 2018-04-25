# Eternal Client

![Build Status](https://travis-ci.org/jortizsao/eternal-client.svg?branch=master)
[![codebeat badge](https://codebeat.co/badges/5d14cee5-8bd4-47bc-969d-5439b818db44)](https://codebeat.co/projects/github-com-jortizsao-eternal-client-develop)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2181cc21d9974153a06e4c963b5afc30)](https://www.codacy.com/app/jortizsao/eternal-client?utm_source=github.com&utm_medium=referral&utm_content=jortizsao/eternal-client&utm_campaign=Badge_Grade)

Eternal is a personal project of an e-commerce site based on the latest technologies in the backend as well as the frontend.

This repository refers to the client side of the application ("eternal client" in the architecture diagram).

If you are interested in the backend part, please check the following repository: [Eternal Server](https://github.com/jortizsao/eternal-server)

The two projects are completely decoupled. Thus, they are flexible enough, that you can use both projects together, or the server side alone as API using your own frontend, or using your own backend with the Eternal frontend.

## Demo

I have a working demo of both projects (client and server) deployed on AWS as described in the architecture diagram that you can find down below.

If you are interested in seeing this demo in action, please contact me at javier.ortizsaorin@gmail.com to arrange a meeting.

![Home page](https://s3.amazonaws.com/eternal-architecture/eternal5.gif)

![CMS](https://s3.amazonaws.com/eternal-architecture/eternal-client-1.gif)

## Architecture

![ARCHITECTURE](https://s3.amazonaws.com/eternal-architecture/eternal-architecture.png)

## 10000' view technologies

This is the overall list of technologies that the frontend leans on:

### [Vue.js](https://vuejs.org/)

The frontend has been developed using [Vue.js](https://vuejs.org/framework).

This framework offers great features that allows to create rich and performant UI's.

Some of these features are:

* Composable view components
* Reactivity system
* Virtual DOM
* Component scoped CSS

### [Apollo GraphQL Client](https://www.apollographql.com/client)

Apollo Client is the GraphQL library that retrieves the data from the server.
It also has other great assets:

* Data normalisation
* Cache
* Store management. You can get rid off Vuex or other store managements

* ### [Storyblok](https://www.storyblok.com/)

API based and headless CMS that fits perfectly with Vue.js.

Thanks to this CMS, the content (banners, headlines, pictures, texts...) of your site can be configured, previewed the final result before publishing to production.

All its assets are served by a CDN in order to get a higher performance.

* ### [AWS Cloudfront](https://aws.amazon.com/cloudfront/)

Amazon's content delivery network that delivers the static assets (_.js, _.css, images...) with a low latency.

* ### [Sunrise Theme](https://github.com/commercetools/commercetools-sunrise-theme)

The look and feel of the site is based on this template (some changes have been added due to my personal preferences).

## Development tools

This project includes the following development tools already configured:

* **[Vue.js](https://vuejs.org)**: UI framework
* **GraphQL**: [Apollo Client](https://www.apollographql.com/client) Library that connects the frontend to the backend, querying the data from the GraphQL server.
* **Unit tests**: Vue.js provides an official library for unit tests called [Vue Test Utils](https://vue-test-utils.vuejs.org/en/). Eternal client comes with Vue Test Utils configured. The selected test runner to run the tests is [Jest](https://facebook.github.io/jest/)
* **Bundler**: [Webpack](https://webpack.js.org/) is the default bundler.
* **Transpiler**: [Babel](https://babeljs.io/) is configured to transpile ESx javascript.
* **Linter**: [ESLint](https://eslint.org/) with [AirBnB rules](https://github.com/airbnb/javascript)
* **Formatter**: [Prettier](https://github.com/prettier/prettier) has been added to format the code following the ESLint rules before any commit.
* **Commit Validation**: Each commit message is validated by [validate-commit](https://github.com/willsoto/validate-commit) using the [JSHint preset](https://github.com/willsoto/validate-commit/blob/master/conventions/jshint.md)

## Contact

If you have any questions or suggestions feel free to contact me:

Javier Ortiz Saorin javier.ortizsaorin@gmail.com
