#!/usr/bin/env node

const { runMigrations } = require('./migrations/scripts/run');

const command = process.argv[2] || 'migrate';
const validCommands = ['migrate', 'rollback', 'status'];

if (!validCommands.includes(command)) {
  console.error(`Invalid command: ${command}. Valid commands are: ${validCommands.join(', ')}`);
  process.exit(1);
}

const success = runMigrations(command);

if (!success) {
  console.error('Migration failed');
  process.exit(1);
}

console.log('Migration completed successfully');
process.exit(0);
