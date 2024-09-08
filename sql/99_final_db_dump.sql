-- Create the 'user' table
CREATE TABLE IF NOT EXISTS `user` (
    `username` VARCHAR(255) PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL
);

-- Create the 'home' table
CREATE TABLE IF NOT EXISTS `home` (
    `street_address` VARCHAR(255) PRIMARY KEY,
    `state` VARCHAR(255) NOT NULL,
    `zip` VARCHAR(10) NOT NULL,
    `sqft` DECIMAL(10, 2) NOT NULL,
    `beds` INT NOT NULL,
    `baths` INT NOT NULL,
    `list_price` DECIMAL(15, 2) NOT NULL
);

-- Create the 'user_home' table to establish the many-to-many relationship
CREATE TABLE IF NOT EXISTS `user_home` (
    `username` VARCHAR(255),
    `street_address` VARCHAR(255),
    FOREIGN KEY (`username`) REFERENCES `user`(`username`),
    FOREIGN KEY (`street_address`) REFERENCES `home`(`street_address`),
    PRIMARY KEY (`username`, `street_address`)
);

-- Insert unique users into 'user' table
INSERT INTO `user` (`username`, `email`)
SELECT DISTINCT `username`, `email` FROM `user_home`;

-- Insert unique homes into 'home' table
INSERT INTO `home` (`street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`)
SELECT DISTINCT `street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price` 
FROM `user_home`;

-- Insert relationships into 'user_home' table
INSERT INTO `user_home` (`username`, `street_address`)
SELECT `username`, `street_address` FROM `user_home`;
