var mysql = require('mysql');

var config = require('../config/config');
var connection = mysql.createConnection(config.db);

connection.query('CREATE TABLE `groups` (\
 `id` int(11) NOT NULL AUTO_INCREMENT,\
 `title` varchar(255) DEFAULT NULL,\
 `owner_id` int(11) NOT NULL,\
 `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\
 PRIMARY KEY (`id`),\
 KEY `owner_id` (`owner_id`)\
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1');

connection.query('CREATE TABLE `users` (\
 `id` int(11) NOT NULL AUTO_INCREMENT,\
 `username` varchar(50) NOT NULL,\
 `password` char(60) NOT NULL,\
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\
 PRIMARY KEY (`id`),\
 UNIQUE KEY `username` (`username`)\
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1');

connection.query('CREATE TABLE `users_in_group` (\
 `id` int(11) NOT NULL AUTO_INCREMENT,\
 `user_id` int(11) NOT NULL,\
 `group_id` int(11) NOT NULL,\
 `joined_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\
 PRIMARY KEY (`id`),\
 KEY `user_id` (`user_id`),\
 KEY `group_id` (`group_id`)\
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1');

console.log('Success: Database Created!');

connection.end();