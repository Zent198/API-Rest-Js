import app from './app.js';

const PORT = process.env.PORT ||3000 ;

app.listen( PORT, () =>{
    console.log("Servidor Funcionado")
});

app.get('/', (req, res) => {
  res.send("New world");
});