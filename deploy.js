#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Deploying Lurna AI to Fly.io...\n');

try {
  execSync('fly version', { stdio: 'inherit' });
  
  console.log('✓ Fly CLI detected\n');
  
  console.log('📦 Starting deployment...');
  execSync('fly deploy --local-only', { stdio: 'inherit' });
  
  console.log('\n✅ Deployment completed successfully!');
  console.log('\n📊 You can check your app status with:');
  console.log('   fly status');
  console.log('\n📋 View logs with:');
  console.log('   fly logs');
  console.log('\n🔧 Check app health with:');
  console.log('   fly status --all');
  
} catch (error) {
  console.error('\n❌ Deployment failed:');
  
  if (error.message.includes('fly: command not found') || error.message.includes('not recognized')) {
    console.error('\n🔧 Fly CLI is not installed. Install it from:');
    console.error('   https://fly.io/docs/getting-started/installing-flyctl/');
    console.error('\n   After installation, run:');
    console.error('   fly auth login');
    console.error('   fly launch');
  } else {
    console.error(`\n   ${error.message}`);
    console.error('\n💡 Common solutions:');
    console.error('   1. Make sure you are logged in: fly auth login');
    console.error('   2. Create the app first: fly launch');
    console.error('   3. Create the volume: fly volumes create lurna_data --region dfw --size 1');
  }
  
  process.exit(1);
}
