const express = require('express');
const path = require('path');
const pokemonRoutes = require('./routes/pokemonRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const sequelize = require('./config/database');
const app = express();

sequelize.sync({ force: false }).then(() => {
    console.log('Tabelas sincronizadas com o banco de dados!');
}).catch(err => {
    console.error('Erro ao sincronizar tabelas: ', err);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});
app.use('/', pokemonRoutes);
app.use('/', trainerRoutes);

app.use((req, res) => {
    res.status(404).render('error', { message: 'Página não encontrada' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

