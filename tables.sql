drop table if exists brands, colors, sizes, shoes, cart;
create table brands
(
	id serial not null primary key,
	brand_name text not null
);
create table colors
(
	id serial not null primary key,
	color_name text not null
);
create table sizes
(
	id serial not null primary key,
	size int not null
);
create table shoes
(
	id serial not null primary key,
	brand_id int not null,
	price numeric not null,
	color_id int not null,
	size_id int not null,
	in_stock int not null,
	foreign key (brand_id) references brands(id),
	foreign key (color_id) references colors(id),
	foreign key (size_id) references sizes(id)
);
create table cart
(
	id serial not null primary key,
	shoe_id int not null,
	qty int not null,
	total numeric not null,
	foreign key (shoe_id) references shoes(id)
);