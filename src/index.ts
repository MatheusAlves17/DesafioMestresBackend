import express from 'express';
import router from './router/router';

const app = express();
app.use(express.json());
app.use(router)

app.listen(8080, () => {
    console.log("Servidor tá on!");
})