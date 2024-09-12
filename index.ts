import express from 'express';
import cors from 'cors';
import path from 'path';
import { config } from 'dotenv';
config();
import cookieParser from 'cookie-parser';
import { admin, bucket } from './config/firebaseConfig';
import sequelize from './config/sequelizeConfig';
import routerLogin from './routers/login';
import routerRegistro from './routers/registro';
import routerAuth from './routers/auth';
import routerUsersAdmin from './routers/Users';
import routerCollection from './routers/Collections';
import routerCategoriesAdmin from './routers/Categories';
import routerProducts from './routers/Products';
import routerProviders from './routers/Providers';
import routerUserDetails from './routers/UserDetails';
import routerCountries from './routers/countries';
import routerStripe from './routers/stripe';
import routerContact from './routers/contact';
import routerOrders from './routers/orders';
import routerReports from './routers/reports';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true })); 
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000', 
  credentials: true, 
}));

// Ruta principal
app.get('/api', (req, res) => {
  res.send('¡Hola, mundo!');
});

if (admin.apps.length) {
  if (bucket) {
    console.log("Firebase storage initialized");
  } else {
    console.log("Firebase storage not initialized");
  }
} else {
  console.log("Firebase admin not initialized");
}

// Configuración de rutas
app.use('/api', routerLogin);
app.use('/api', routerRegistro);
app.use('/api', routerAuth);
app.use('/api', routerUsersAdmin);
app.use('/api', routerCollection);
app.use('/api', routerCategoriesAdmin);
app.use('/api', routerProducts);
app.use('/api', routerProviders);
app.use('/api', routerUserDetails);
app.use('/api', routerCountries);
app.use('/api', routerStripe);
app.use('/api', routerContact);
app.use('/api', routerOrders);
app.use('/api', routerReports);

// Archivo estático de imágenes
app.use('/images', express.static(path.join(__dirname, 'images')));

// Sincronización de Sequelize
sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((error: Error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

// Middleware para manejar rutas no encontradas (404)
app.use((req: express.Request, res: express.Response) => {
  res.status(404).send('Route not found');
});

// Middleware para manejar errores
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});