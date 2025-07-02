const { execSync } = require('child_process');
const path = require('path');

function runMigrations(mode = 'migrate') {
  const env = process.env.NODE_ENV || 'development';
  console.log(`Running migrations in ${env} environment`);
  
  try {
    let command;
    
    switch (mode) {
      case 'migrate':
        command = `npx sequelize-cli db:migrate --env ${env}`;
        break;
      case 'rollback':
        command = `npx sequelize-cli db:migrate:undo --env ${env}`;
        break;
      case 'status':
        command = `npx sequelize-cli db:migrate:status --env ${env}`;
        break;
      default:
        console.error(`Unknown migration mode: ${mode}`);
        return false;
    }
    
    console.log(`Running: ${command}`);
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return true;
  } catch (error) {
    console.error(`Migration failed: ${error.message}`);
    if (error.stdout) console.error(error.stdout);
    if (error.stderr) console.error(error.stderr);
    return false;
  }
}

module.exports = { runMigrations };
