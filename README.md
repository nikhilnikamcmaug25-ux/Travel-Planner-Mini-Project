//users

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('user','admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

//feedback 

create table feedback(
    ->  id int AUTO_INCREMENT,
    -> user_id int not null,
    -> trip_id int null,
    -> message text not null,
    -> created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -> primary key (id)
    -> );

//trips

CREATE TABLE trips (
    trip_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, 
    trip_name VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10,2),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


//itinerary

CREATE TABLE itinerary (
    itinerary_id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT,
    day_number INT,
    activity VARCHAR(255),
    location VARCHAR(100),
    time VARCHAR(50),
    notes TEXT,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE
);

//contact us

create table contact_us(
    -> id int AUTO_INCREMENT PRIMARY KEY,
    -> name varchar(100),
    -> email varchar(100),
    -> subject varchar(100),
    -> message text not null,
    -> created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -> IS_READ boolean default false
    -> );