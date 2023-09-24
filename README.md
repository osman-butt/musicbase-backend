# MusicBase Backend

This is the backend repository for MusicBase, a web application for searching artists, albums, and songs. The app is build with Node.js, Express.js and MySQL.

## Deployed app

* See a live version of the frontend [https://osman-butt.github.io/musicbase-frontend/](https://osman-butt.github.io/musicbase-frontend/)
* The frontend respository of this project is managed in a separate repository: [https://github.com/osman-butt/musicbase-frontend](https://github.com/osman-butt/musicbase-frontend).
* Link to deployed backend [https://musicbase-app.azurewebsites.net/api/v1](https://musicbase-app.azurewebsites.net/api/v1)
* API documentation can be found [here](https://github.com/osman-butt/musicbase-backend/blob/main/api-docs.md)
* ER diagram can be found [here](https://github.com/osman-butt/musicbase-backend/blob/main/ER-diagram.pdf)

## Local Development

To run the backend server locally, follow these steps:

### Prerequisites

- Node.js and npm (Node Package Manager)
- MySQL Database

### Fork and Clone

1. Fork this repository by clicking the "Fork" button in the top right corner of the GitHub page.
2. Clone the repository to your local machine using the following command in your terminal:

```bash
git clone https://github.com/osman-butt/musicbase-backend.git
```

### Install Dependencies

Navigate to the project directory and install the necessary dependencies:
```bash
cd musicbase-backend
npm install
```

### Setting Up Local Database

* Ensure you have a MySQL server running on your local machine.
* Create a new database named musicbase.
* Import the provided SQL dump file into the musicbase database to set up the initial schema and data. The file can be found [here](https://github.com/osman-butt/musicbase-backend/blob/main/sql/musicbasedb.sql) by running the command
```bash
mysql -u username -p musicbasedb < path/to/musicbasedb.sql
```
* Create a .env file a fill it with your database information
```javascript
MYSQL_HOST=localhost
MYSQL_USER= ENTER YOUR USERNAME
MYSQL_DATABASE= musicbasedb
MYSQL_PASSWORD= ENTER YOUR PASSWORD
MYSQL_PORT=3306
```
When you run the server it will now use the local MySQL database

### Running the server
Start the server using the following command:
```bash
npm start
```
