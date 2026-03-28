import app from './app.js';
import { runMigrations } from './src/config/migrate.js';

const startServer = async () => {
  await runMigrations();
} 

app.listen( process.env.PORT || 3000, () =>{
    console.log(`🚀 Servidor listo en puerto ${process.env.PORT || 3000}`);
});

startServer();

/*app.get('/', (req, res) => {
  res.send("New world");
}); */