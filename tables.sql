drop table if exists brands, colors, sizes, shoes, cart;
create table brands(
	id serial not null primary key,
	brand_name text not null
);

insert into brands (brand_name) values ('Adidas');
insert into brands (brand_name) values ('Nike');
insert into brands (brand_name) values ('Vans');

create table colors(
	id serial not null primary key,
	color_name text not null
);

insert into colors (color_name) values ('Red');
insert into colors (color_name) values ('Yellow');
insert into colors (color_name) values ('Green');

create table sizes(
	id serial not null primary key,
	size int not null
);

insert into sizes (size) values (5);
insert into sizes (size) values (6);
insert into sizes (size) values (7);

create table shoes(
	id serial not null primary key,
	brand int not null,
	price numeric not null,
	color int not null,
	size int not null,
	in_stock int not null,
	foreign key (brand) references brands(id),
	foreign key (color) references colors(id),
	foreign key (size) references sizes(id)
);

insert into shoes (brand,price,color,size,in_stock) values (1,1999.99,1,1,500);
insert into shoes (brand,price,color,size,in_stock) values (2,1999.99,2,2,500);
insert into shoes (brand,price,color,size,in_stock) values (3,1999.99,3,3,500);
create table cart(
	id serial not null primary key,
	shoe_id int not null,
	brand int not null,
	price numeric not null,
	color int not null,
	size int not null,
	qty int not null,
	total numeric not null,
	foreign key (brand) references brands(id),
	foreign key (color) references colors(id),
	foreign key (size) references sizes(id)
);