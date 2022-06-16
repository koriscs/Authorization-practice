---users table
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email varchar(50) UNIQUE not null,
    password varchar(50) not null,
    created_at date default current_date
);