drop table if exists brands, colors, sizes, shoes, cart, images, shoe_names;
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

create table images(
	id serial not null primary key,
	image_location text
);

create table shoe_names(
	id serial not null primary key,
	shoe_name text
);

create table shoes
(
	id serial not null primary key,
	image_location_id int,
	shoe_name_id int not null,
	brand_id int not null,
	price numeric not null,
	color_id int not null,
	size_id int not null,
	in_stock int not null,
	foreign key (brand_id) references brands(id),
	foreign key (color_id) references colors(id),
	foreign key (size_id) references sizes(id),
	foreign key (image_location_id) references images(id),
	foreign key (shoe_name_id) references shoe_names(id)

);
create table cart
(
	id serial not null primary key,
	shoe_id int not null,
	qty int not null,
	total numeric not null,
	foreign key (shoe_id) references shoes(id)
);