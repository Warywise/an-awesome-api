import app from './app';
import 'dotenv/config';
import 'reflect-metadata';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Running at Port:${PORT}.`));
