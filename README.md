# Event-Manager-App
## How to run event manager app?

### Backend server
Create python virtual environment and enter it

Linux:
```bash
python3 -m venv venv
. venv/bin/activate
```
Windows:
```cmd
python -m venv venv
.\venv\Scripts\activate
```

Install all required packages:
```
pip3 install -r requirements.txt
```

Migrate the db and run the server:
```
cd backend
python3 manage.py migrate
python3 manage.py runserver
```

### Mobile client

Install all required packages:
```
cd frontend_mobile
npm install
```

Run expo app:
```
npm run web
```
