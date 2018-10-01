drop table if exists shoes, cart, brands, colors, sizes ;
create table shoes(
	id serial not null primary key,
	brand text not null,
	price numeric not null,
	color text not null,
	size int not null,
	in_stock int not null
);
-- create table cart(
-- 	id serial not null primary key,
-- 	brand text not null,
-- 	price numeric not null,
-- 	color text not null,
-- 	size int not null,
-- 	qty int not null
-- );
-- create table brands(
-- 	id serial not null primary key,
-- 	name text not null
-- );
-- create table colors(
-- 	id serial not null primary key,
-- 	name text not null
-- );
-- create table shoeList(
-- 	id serial not null primary key,
-- 	price numeric not null,
-- 	size int not null,
-- 	in_stock int not null
-- 	foreign key (brand) references brands(id),
--     foreign key (weekday_id) references weekdays(id)
-- );

insert into shoes (brand, price, color, size, in_stock) values ('Nike',1099.99,'orange',5, 9);
insert into shoes (brand, price, color, size, in_stock) values ('Adidas',1999.99,'slategray',7, 7);
insert into shoes (brand, price, color, size, in_stock) values ('Converse',2999.99,'blue',8, 12);
insert into shoes (brand, price, color, size, in_stock) values ('Puma',1950.99,'green',6, 20);
insert into shoes (brand, price, color, size, in_stock) values ('Fila',1599.99,'red',4, 10);
insert into shoes (brand, price, color, size, in_stock) values ('Sketchers',999.99,'black',3, 30);
insert into shoes (brand, price, color, size, in_stock) values ('Nike',1099.99,'white',6, 9);
insert into shoes (brand, price, color, size, in_stock) values ('Adidas',1999.99,'black',8, 7);
insert into shoes (brand, price, color, size, in_stock) values ('Converse',2999.99,'red',9, 12);
insert into shoes (brand, price, color, size, in_stock) values ('Puma',1950.99,'white',7, 20);
insert into shoes (brand, price, color, size, in_stock) values ('Fila',1599.99,'white',4, 10);
insert into shoes (brand, price, color, size, in_stock) values ('Sketchers',599.99,'white',3, 30);
