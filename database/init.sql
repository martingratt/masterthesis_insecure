CREATE DATABASE IF NOT EXISTS masterthesis;
USE masterthesis;
CREATE TABLE IF NOT EXISTS jersey
(
    id            int auto_increment
        primary key,
    club          varchar(1000) null,
    size          varchar(255) null,
    name          varchar(255) null,
    year          year         null,
    colour        varchar(255) null,
    number        int          null,
    websiteUserId int          null
);

CREATE TABLE IF NOT EXISTS website_user
(
    id       int auto_increment
        primary key,
    username varchar(255) null,
    password varchar(255) null,
    city     varchar(255) null,
    role     int          null
);

INSERT INTO masterthesis.jersey (id, club, size, name, year, colour, number, websiteUserId) VALUES (1, 'Real Madrid', 'L', 'Cristiano Ronaldo', 2018, 'White', 7, 1);
INSERT INTO masterthesis.jersey (id, club, size, name, year, colour, number, websiteUserId) VALUES (2, 'Real Madrid', 'L', 'Eden Hazard', 2021, 'White', 7, 2);
INSERT INTO masterthesis.jersey (id, club, size, name, year, colour, number, websiteUserId) VALUES (3, 'Real Madrid', 'M', 'Marcelo', 2017, 'Black', 12, 2);

INSERT INTO masterthesis.website_user (id, username, password, city, role) VALUES (1, 'martin', 'dc647eb65e6711e155375218212b3964', 'Wörgl', 1);
INSERT INTO masterthesis.website_user (id, username, password, city, role) VALUES (2, 'andreas', 'dc647eb65e6711e155375218212b3964', 'Wien', 2);
