# Chat App

Real time chat application using Web Socket server.

## Installation

Clone the repository

```bash
git clone https://github.com/sameep-sehgal/chatapp
```

Install all the dependencies for frontend React App

```bash
cd frontend
npm install
```

Install all the dependencies for Web Socket server.

```bash
cd ../websocket-server
npm install
```

Install all the requirements  for Django backend.

```bash
cd ..
pip install -r requirement.txt
```

## Usage

Start all the servers.

```bash
cd backend
python manage.py runserver
cd ../frontend
npm start
cd ../websocket-server
npm start
```
Django server started on port 8000.

Websocket server started on port 3001.

React server started on port 3000.


