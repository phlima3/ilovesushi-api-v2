#!/bin/bash

echo "🚀 Starting Render deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build application
echo "🏗️ Building application..."
npm run build

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Seed database (optional)
echo "🌱 Seeding database..."
npx prisma db seed || echo "⚠️ Seed failed or not needed"

echo "✅ Deployment completed successfully!" 