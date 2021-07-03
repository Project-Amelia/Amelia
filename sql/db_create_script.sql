DROP TABLE customcommandimage;
DROP TABLE customcommand;
DROP TABLE userban;
DROP TABLE userwarn;
DROP TABLE userstats;
DROP TABLE discorduser;

CREATE TABLE discorduser (
    id bigint NOT NULL,
    birthdate date,
    customCommandAllowance int,
    created_at datetime,
    updated_at datetime,
    CONSTRAINT pk_id_discorduser PRIMARY KEY (id)
);

CREATE TABLE userstats (
	id bigint NOT NULL,
	hugCount int,
	kissCount int,
	cryCount int,
	patCount int,
	punchCount int,
	pokeCount int,
	slapCount int,
	superStaffCount int,
    created_at datetime,
    updated_at datetime,
	CONSTRAINT pk_id_userstats PRIMARY KEY (id),
	CONSTRAINT fk_user_stats FOREIGN KEY (id)
	REFERENCES discorduser(id)
	ON UPDATE NO ACTION
	ON DELETE NO ACTION
);

CREATE TABLE userwarn (
	id int IDENTITY(1,1) NOT NULL ,
	warnedUser bigint NOT NULL,
	description varchar(2000) NOT NULL,
	issuer bigint NOT NULL,
	revoked bit NOT NULL,
    created_at datetime,
    updated_at datetime,
	CONSTRAINT pk_id_userwarn PRIMARY KEY (id),
	CONSTRAINT fk_user_warned FOREIGN KEY (warnedUser)
	REFERENCES discorduser(id)
	ON UPDATE NO ACTION
	ON DELETE NO ACTION,
	CONSTRAINT fk_user_warn_issuer FOREIGN KEY (issuer)
	REFERENCES discorduser(id)
	ON UPDATE NO ACTION
	ON DELETE NO ACTION
);

CREATE TABLE userban (
	id int IDENTITY(1,1) NOT NULL ,
	bannedUser bigint NOT NULL,
	description varchar(2000) NOT NULL,
	issuer bigint NOT NULL,
	revoked bit NOT NULL,
    created_at datetime,
    updated_at datetime,
	CONSTRAINT pk_id_userban PRIMARY KEY (id),
	CONSTRAINT fk_user_banned FOREIGN KEY (bannedUser)
	REFERENCES discorduser(id)
	ON UPDATE NO ACTION
	ON DELETE NO ACTION,
	CONSTRAINT fk_user_ban_issuer FOREIGN KEY (issuer)
	REFERENCES discorduser(id)
	ON UPDATE NO ACTION
	ON DELETE NO ACTION
);

CREATE TABLE customcommand (
	id int IDENTITY(1,1) NOT NULL,
	discordUserId bigint NOT NULL,
	commandName varchar(64) NOT NULL,
	commandText varchar(2000) NOT NULL,
    created_at datetime,
    updated_at datetime,
	CONSTRAINT pk_id_customcommand PRIMARY KEY (id),
	CONSTRAINT fk_user_custom_command FOREIGN KEY (discordUserId)
	REFERENCES discorduser(id)
	ON UPDATE NO ACTION
	ON DELETE NO ACTION
);

CREATE TABLE customcommandimage (
	id int IDENTITY(1,1) NOT NULL,
	customCommandId int NOT NULL,
	imageUrl varchar(2000) NOT NULL,
    created_at datetime,
    updated_at datetime,
	CONSTRAINT pk_id_customcommandimage PRIMARY KEY (id),
	CONSTRAINT fk_custom_command_custom_command_image FOREIGN KEY (customCommandId)
	REFERENCES customcommand(id)
	ON UPDATE NO ACTION
	ON DELETE NO ACTION
);