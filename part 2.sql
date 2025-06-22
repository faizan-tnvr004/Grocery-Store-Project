-- procedure to add a product

-- procedure to add a customer


create procedure add_customer(
    @c_name varchar(255),
    @c_phone varchar(20),
    @c_address varchar(max)
)
as
begin
    insert into customers (name, phone_number, address) 
    values (@c_name, @c_phone, @c_address);
	select SCOPE_IDENTITY() as customer_id;
end;
go


-- procedure to remove item from cart
create procedure remove_from_cart(@c_id int, @p_id int)
as
begin
    delete from cart where customer_id = @c_id and product_id = @p_id;
end;
go

-- procedure to place an order
create procedure place_order(@c_id int)
as
begin

--get data
    declare @total decimal(10,2);
    declare @order_id int;
	declare @quantity int
    select @total = sum(p.price * ca.quantity)
    from cart ca 
    join products p on ca.product_id = p.product_id 
    where ca.customer_id = @c_id;
    
	--insert into orders
    insert into orders (customer_id, order_date, total_price, delivery_status) 
    values (@c_id, getdate(), @total, 'pending');

    set @order_id = scope_identity();


	 --insert into order times
    insert into order_items (order_id, product_id, quantity, subtotal)
    select @order_id, ca.product_id, ca.quantity, (p.price * ca.quantity) 
    from cart ca 
    join products p on ca.product_id = p.product_id
    where ca.customer_id = @c_id;
	
	--update inventory and product
	select @quantity =  ca.quantity
    from cart ca 
    join products p on ca.product_id = p.product_id
    where ca.customer_id = @c_id;
   update i
        set i.quantity_changed = i.quantity_changed - @quantity,
            i.change_reason = 'Order placed',
            i.change_date = getdate()
        from Inventory i
		  join Order_Items oi on i.product_id = oi.product_id
        where oi.order_id = @order_id;


update p
set p.stock_quantity = stock_quantity- @quantity
from Products p
  join Order_Items oi on p.product_id = oi.product_id
        where oi.order_id = @order_id;

		--delete from cart
    delete from cart where customer_id = @c_id;

	--result
	select order_details.order_id, order_details.total_price
	from order_details
	where order_id = @order_id

end;
go

-- procedure to update order status
create procedure update_order_status(@o_id int, @new_status varchar(50))
as
begin
    update orders set delivery_status = @new_status where order_id = @o_id;
end;
go

-- view to get available products
create view available_products as
select p.product_id, p.name, p.description, p.price, c.category_name, p.available
from products p
join categories c on p.category_id = c.category_id
where p.available = 1;
go

-- view to get order details
create view order_details as
select o.order_id, o.order_date, o.total_price, o.delivery_status, 
       c.name as customer_name, c.phone_number, c.address
from orders o
join customers c on o.customer_id = c.customer_id;
go

-- view to get cart details
create view cart_details as
select ca.cart_id, cu.name as customer_name, p.name as product_name, ca.quantity, p.price, 
       (ca.quantity * p.price) as total_price
from cart ca
join customers cu on ca.customer_id = cu.customer_id
join products p on ca.product_id = p.product_id;
go

-- view to get inventory status
create view inventory_status as
select i.inventory_id, p.name as product_name, i.quantity_changed, i.change_reason, i.change_date
from inventory i
join products p on i.product_id = p.product_id;
go

create view viewAllCustomers
as
select *from Customers
go