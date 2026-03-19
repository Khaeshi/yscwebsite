import { Argon2id } from 'oslo/password';
const hash = await new Argon2id().hash('cktabss12212003');
console.log(hash);