import { v4 as uuidv4 } from 'uuid';

export  function generateRandomUuid(): string {
    const randomValues = new Array(16);
    for (let i = 0; i < 16; i++) {
        randomValues[i] = Math.floor(Math.random() * 256);
    }
    return uuidv4({ random: randomValues });
}
