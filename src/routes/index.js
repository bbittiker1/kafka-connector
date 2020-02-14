import admin from './admin';

export default {
  admin
};

export const setRoutes = (app, passport) => {
  // Routes
  app.use('/v1/kafka-connector/admin', admin);
};
