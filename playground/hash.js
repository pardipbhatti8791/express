const bcrypt = require('bcrypt');

async function run() {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('12345', salt);
    console.log(salt);
    console.log(hash);
}

run();