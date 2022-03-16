import app from './app';
import 'dotenv/config';

const PORT = process.env.PORT || 300;

app.listen(PORT, () => console.log(`Running at Port:${PORT}.`));
