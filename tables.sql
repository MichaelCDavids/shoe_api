drop table if exists shoes, cart, brands, color;
create table shoes(
	id serial not null primary key,
	brand text not null,
	price numeric not null,
	color text not null,
	size int not null,
	in_stock int not null
);
create table cart(
	id serial not null primary key,
	brand text not null,
	price numeric not null,
	color text not null,
	size int not null,
	qty int not null,
	foreign key (shoe_id) references shoeList(id)
);
create table brands(
	id serial not null primary key,
	brand_name text not null
);
create table colors(
	id serial not null primary key,
	color_name text not null
);
create table shoeList(
	id serial not null primary key,
	price numeric not null,
	size int not null,
	in_stock int not null,
	foreign key (brand) references brands(id),
    foreign key (color) references colors(id)
);
