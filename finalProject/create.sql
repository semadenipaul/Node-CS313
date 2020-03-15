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

CREATE TABLE national_parks
(
    id SERIAL NOT NULL PRIMARY KEY,
    national_park VARCHAR(200),
    image   VARCHAR(500) NOT NULL,
    us_state VARCHAR(200) NOT NULL,
    nature1 VARCHAR(200) NOT NULL,
    nature2 VARCHAR(200) NOT NULL,
    activities1 VARCHAR(200) NOT NULL,
    activities2 VARCHAR(200) NOT NULL,
    activities3 VARCHAR(200) NOT NULL,
    vacation_time INT NOT NULL
);

CREATE TABLE previous_parks_visited
(
    id SERIAL NOT NULL PRIMARY KEY,
    person INT NOT NULL REFERENCES person(id),
    national_parks INT NOT NULL REFERENCES national_parks(id),
    UNIQUE (person, national_parks)
);

CREATE TABLE person_reviews
(
    id SERIAL NOT NULL PRIMARY KEY,
    previous_parks_visited INT NOT NULL REFERENCES previous_parks_visited(id),
    reviews_content TEXT
);