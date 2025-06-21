#!/bin/sh

# Check if MongoDB is required and available
if [ -n "$MONGODB_URI" ]; then
    echo "MongoDB URI found, attempting connection test..."
    # We'll let the app handle the connection, just log the attempt
    echo "MongoDB connection will be handled by the application"
else
    echo "Warning: MONGODB_URI not set. Running in limited mode."
fi

# Check auth configuration
if [ -z "$NEXTAUTH_SECRET" ]; then
    echo "Warning: NEXTAUTH_SECRET not set"
fi

if [ -z "$GOOGLE_CLIENT_ID" ] || [ -z "$GOOGLE_CLIENT_SECRET" ]; then
    echo "Warning: Google OAuth credentials not set"
fi

# Start the application
exec "$@"
