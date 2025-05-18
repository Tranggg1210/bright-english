const express = require('express');

const apiRoute = express.Router();

const listRoutesApi = [
  {
    path: '/users',
    route: require('./user.route'),
  },
  {
    path: '/auth',
    route: require('./auth.route'),
  },
  {
    path: '/topics',
    route: require('./topic.route'),
  },
  {
    path: '/vocabularies',
    route: require('./vocabulary.route'),
  },
  {
    path: '/conversations',
    route: require('./conversation.route'),
  },
  {
    path: '/exercises',
    route: require('./exercise.route'),
  },
  {
    path: '/logs',
    route: require('./log.route'),
  },
  {
    path: '/user-vocabularies',
    route: require('./user-vocabulary.route'),
  },
  {
    path: '/study-trackingtime',
    route: require('./study-tracking-time.route'),
  },
  {
    path: '/contact',
    route: require('./contact.route'),
  },
  {
    path: '/report',
    route: require('./report.route'),
  },
  {
    path: '/user_conversation',
    route: require('./user_conversation.route'),
  },
   {
    path: '/cloudianry',
    route: require('./upload.route'),
  }
];

listRoutesApi.forEach((route) => {
  apiRoute.use(route.path, route.route);
});

module.exports = apiRoute;
