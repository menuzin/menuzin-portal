#!/usr/bin/env node

/**
 * Environment Setup Script
 * Ensures .env file exists with required variables
 */

const fs = require('fs');
const path = require('path');

const ENV_PATH = path.join(process.cwd(), '.env');
const ENV_EXAMPLE_PATH = path.join(process.cwd(), '.env.example');

// Required environment variables with default values
const REQUIRED_ENV_VARS = {
  DATABASE_URL: 'postgresql://postgres:password@localhost:5432/menufy?schema=public',
  ADMIN_SETUP_PIN: '123456',
};

// Template for .env file
const ENV_TEMPLATE = `# Database Connection
# IMPORTANT: Replace with your actual PostgreSQL connection string
# For local PostgreSQL: postgresql://postgres:YOUR_PASSWORD@localhost:5432/menufy?schema=public
# For Supabase: postgresql://postgres.xxxxx:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres?schema=public
DATABASE_URL="${REQUIRED_ENV_VARS.DATABASE_URL}"

# Node Environment
NODE_ENV="development"

# Admin Setup PIN (6-digit PIN for first-time admin setup)
ADMIN_SETUP_PIN="${REQUIRED_ENV_VARS.ADMIN_SETUP_PIN}"

# JWT Secret (for future use if needed)
# Generate a strong secret: openssl rand -base64 32
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-min-32-chars"

# Next.js Public URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Vercel Deployment:
# Add DATABASE_URL to Vercel Environment Variables in dashboard
# Settings > Environment Variables > Add DATABASE_URL
`;

function parseEnvFile(content) {
  const vars = {};
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip comments and empty lines
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    // Parse KEY="VALUE" or KEY=VALUE
    const match = trimmed.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.+)$/);
    if (match) {
      const key = match[1];
      let value = match[2];
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      vars[key] = value;
    }
  }
  
  return vars;
}

function formatEnvFile(vars) {
  const lines = [];
  lines.push('# Database Connection');
  lines.push('# IMPORTANT: Replace with your actual PostgreSQL connection string');
  lines.push('# For local PostgreSQL: postgresql://postgres:YOUR_PASSWORD@localhost:5432/menufy?schema=public');
  lines.push('# For Supabase: postgresql://postgres.xxxxx:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres?schema=public');
  lines.push(`DATABASE_URL="${vars.DATABASE_URL || REQUIRED_ENV_VARS.DATABASE_URL}"`);
  lines.push('');
  lines.push('# Node Environment');
  lines.push(`NODE_ENV="${vars.NODE_ENV || 'development'}"`);
  lines.push('');
  lines.push('# Admin Setup PIN (6-digit PIN for first-time admin setup)');
  lines.push(`ADMIN_SETUP_PIN="${vars.ADMIN_SETUP_PIN || REQUIRED_ENV_VARS.ADMIN_SETUP_PIN}"`);
  lines.push('');
  lines.push('# JWT Secret (for future use if needed)');
  lines.push('# Generate a strong secret: openssl rand -base64 32');
  lines.push(`JWT_SECRET="${vars.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-min-32-chars'}"`);
  lines.push('');
  lines.push('# Next.js Public URL');
  lines.push(`NEXT_PUBLIC_SITE_URL="${vars.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}"`);
  lines.push('');
  lines.push('# Vercel Deployment:');
  lines.push('# Add DATABASE_URL to Vercel Environment Variables in dashboard');
  lines.push('# Settings > Environment Variables > Add DATABASE_URL');
  
  return lines.join('\n');
}

function ensureEnvFile() {
  let envExists = fs.existsSync(ENV_PATH);
  let created = false;
  let updated = false;
  let missingVars = [];
  
  if (!envExists) {
    // Create new .env file
    console.log('📝 .env file not found. Creating new .env file...');
    fs.writeFileSync(ENV_PATH, ENV_TEMPLATE, 'utf8');
    created = true;
    console.log('✅ .env file created successfully!');
    console.log('⚠️  IMPORTANT: Update DATABASE_URL with your actual database connection string');
  } else {
    // Read existing .env file
    console.log('📄 .env file found. Checking required variables...');
    const content = fs.readFileSync(ENV_PATH, 'utf8');
    const vars = parseEnvFile(content);
    
    // Check for required variables
    for (const [key, defaultValue] of Object.entries(REQUIRED_ENV_VARS)) {
      if (!vars[key]) {
        missingVars.push(key);
      }
    }
    
    if (missingVars.length > 0) {
      // Add missing variables
      console.log(`⚠️  Missing required variables: ${missingVars.join(', ')}`);
      console.log('📝 Adding missing variables to .env...');
      
      // Preserve existing variables and add missing ones
      const updatedVars = { ...vars };
      for (const key of missingVars) {
        updatedVars[key] = REQUIRED_ENV_VARS[key];
      }
      
      // Rewrite .env file with all variables
      const newContent = formatEnvFile(updatedVars);
      fs.writeFileSync(ENV_PATH, newContent, 'utf8');
      updated = true;
      console.log(`✅ Added missing variables: ${missingVars.join(', ')}`);
    } else {
      console.log('✅ All required environment variables are present');
    }
  }
  
  // Summary
  console.log('\n📋 Summary:');
  if (created) {
    console.log('   - .env file was created');
  } else if (updated) {
    console.log('   - .env file was updated with missing variables');
  } else {
    console.log('   - .env file already contains all required variables');
  }
  
  console.log('\n⚠️  Next Steps:');
  console.log('   1. Update DATABASE_URL in .env with your actual database connection string');
  console.log('   2. Restart your dev server: npm run dev');
  console.log('   3. Run: npm run db:generate');
  console.log('   4. Run: npm run db:push');
  console.log('');
}

// Run the script
try {
  ensureEnvFile();
} catch (error) {
  console.error('❌ Error ensuring .env file:');
  console.error(error.message);
  process.exit(1);
}






