DROP TABLE person;
DROP TABLE national_parks;
DROP TABLE previous_parks_visited;
DROP TABLE person_reviews;

CREATE TABLE person
(
    id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(200),
    last_name VARCHAR(200),
    USER_NAME VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    person_email VARCHAR(100),
    new_person BOOLEAN,
    city VARCHAR(100),
    state VARCHAR(100)
);

CREATE TABLE person_reviews
(
    id SERIAL NOT NULL PRIMARY KEY,
    person INT NOT NULL REFERENCES person(id),
    reviews_content TEXT
);