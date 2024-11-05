# COMPASS CAR

## Requirements

### 1. Environment Setup

#### a. Create a `.env` file

Create a `.env` file in the root directory of the project and add the following variables:

```dotenv
# MySQL configuration
MYSQL_DATABASE=your_database_name
MYSQL_ROOT_PASSWORD=your_password
```
#### b. create necessary folders

- .docker/db_data

### c. Set folder permissions (Linux)

Grant appropriate permissions to the created folders. This is necessary to ensure the Docker containers can access and manage the data correctly. Run the following commands:

```bash
sudo chmod -R 775 ./.docker/db_data
sudo chown -R 1001:1001 ./.docker/db_data
sudo chmod -R 775 ./mysql-init
sudo chown -R 1001:1001 ./mysql-init
```
**Note: Make sure that the 1001:1001 user and group IDs are appropriate for your system. Adjust as needed.**

## Installation

1. Start Docker Containers

To build and start the Docker containers, run:
```bash
docker compose up
```

This will pull the required images and set up the environment.

2. Install Dependencies 

After the containers are up, install the project dependencies using npm:
```bash
npm install
```

### Running the app

Once the setup is complete and dependencies are installed, you can run the application with the following command

```bash
npm start
```
This will start the development server and you can access the app on the designated port (check your .env file or default settings).

### Troubleshooting

- If you encounter any issues with Docker, ensure that your system has Docker and Docker Compose installed and running properly.
- Double-check that the .env file is correctly configured with your MySQL credentials and database name.

### Notes

- Make sure to replace the placeholders in the .env file (your_database_name and your_password) with your actual database name and password.
- The application is designed to work with MySQL. Make sure the Docker container for MySQL starts without error



