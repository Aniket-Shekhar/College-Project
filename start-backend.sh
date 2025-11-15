#!/bin/bash

echo "========================================"
echo "  Starting Git History Explorer Backend"
echo "========================================"
echo ""

cd backend

# Check for .env file
if [ ! -f .env ]; then
    echo "ERROR: .env file not found!"
    echo "Creating .env file..."
    cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/git-explorer
JWT_SECRET=de986251ecda13832080ba4b5020d2da51d8f7cfa6ada5104c16b1c4212499b5
OPENAI_API_KEY=
EOF
    echo ".env file created!"
    echo ""
fi

# Check dependencies
if [ ! -d node_modules ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

echo "Starting backend server..."
echo ""
echo "========================================"
echo "  Backend will run on http://localhost:5000"
echo "  Press Ctrl+C to stop the server"
echo "========================================"
echo ""

npm run dev

