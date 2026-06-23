const mysql = require('mysql2/promise');

async function testUser(user) {
  try {
    const conn = await mysql.createConnection({
      host: '102.223.37.189',
      user: user,
      password: 'Password_123',
      database: 'osticket_db'
    });
    console.log(`Success: ${user}`);
    await conn.end();
  } catch(e) {
    console.log(`Failed: ${user} - ${e.message}`);
  }
}

async function run() {
  await testUser('dash_writer');
  await testUser('root');
  await testUser('admin');
  await testUser('osticket');
  await testUser('dash_admin');
}
run();
