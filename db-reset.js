#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Path to the SQLite database
const dbPath = path.join(__dirname, 'database', 'lurna.sqlite');
const backupPath = path.join(__dirname, 'database', 'lurna.sqlite.bak');
const isProd = process.env.NODE_ENV === 'production'

// Function to run a command and log output
function runCommand(command) {
  if(isProd) return true;
  console.log(`Running: ${command}`);
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return true;
  } catch (error) {
    console.error(`Command failed: ${error.message}`);
    if (error.stdout) console.error(error.stdout);
    if (error.stderr) console.error(error.stderr);
    return false;
  }
}

// Backup database if it exists
if (fs.existsSync(dbPath) && !isProd) {
  console.log('Backing up existing database...');
  fs.copyFileSync(dbPath, backupPath);
  console.log(`Backup created at ${backupPath}`);
}

// Delete the database file
console.log('Removing existing database...');
try {
  if (fs.existsSync(dbPath) && !isProd) {
    fs.unlinkSync(dbPath);
    console.log('Database removed successfully.');
  } else {
    console.log('No database file found to remove.');
  }
} catch (error) {
  console.error(`Error removing database: ${error.message}`);
  process.exit(1);
}

// Run migrations from scratch
console.log('Running migrations from scratch...');
const success = runCommand('npx sequelize-cli db:migrate');

if (success) {
  console.log('Migration completed successfully!');
  process.exit(0);
} else {
  console.error('Migration failed!');
  process.exit(1);
}
