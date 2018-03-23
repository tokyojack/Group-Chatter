INSERT INTO `groups`(`title`, `owner_id`) VALUES (?,?);
INSERT INTO `users_in_group`(`user_id`, `group_id`) VALUES (?,LAST_INSERT_ID());