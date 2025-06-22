
🛒 HF Grocery Store Management System
A full-stack web application for managing a grocery store, built with React, Node.js, Express, and SQL Server (SSMS).
The system supports customer login, product browsing, cart management, and admin-level inventory control.
________________________________________
📁 Project Structure
grocery-store/
├── backend/                # Node.js + Express APIs
├── frontend/               # React + MUI UI
│   ├── part1_tables.sql    # Tables creation
│   ├── part2_views.sql     # Views definitions
│   ├── part3_procedures.sql # Stored procedures
├── README.md
________________________________________
🧠 Features
👥 Customers
•	Browse categories and products
•	View detailed product pages
•	Add/remove items from cart
•	Place orders
🛠 Admin
•	Add new products, categories, and inventory
•	View all orders and update their status
•	Manage stock availability
________________________________________
🗄 Database (SQL Server)
Database scripts are organized into three parts:
1.	part1_tables.sql – creates all necessary tables like Product, Inventory, Cart, Orders, Customer, etc.
2.	part2_views.sql – defines useful views like available_products, cart_details, order_details, and inventory_status.
3.	part3_procedures.sql – includes stored procedures for:
o	Product management: add_product, update_product, delete_product
o	Customer management: add_customer
o	Cart operations: add_to_cart, remove_from_cart
o	Order handling: place_order, update_order_status
________________________________________
⚙️ Tech Stack
•	Frontend: React, Material UI (MUI)
•	Backend: Node.js, Express
•	Database: SQL Server (SSMS)
•	Architecture: MVC Pattern
________________________________________
🚀 Getting Started
1. Clone the Repository
git clone https://github.com/your-username/grocery-store.git  
cd grocery-store  
2. Setup the Database
1.	Open SQL Server Management Studio (SSMS)
2.	Execute the SQL files in order:
o	part1.sql
o	part2.sql
o	part3.sql
3. Install Backend Dependencies
cd backend  
npm install  
4. Start Backend Server
node index.js  
Make sure to configure your dbConfig.js with the correct SQL Server credentials.
5. Start Frontend
cd ../frontend  
npm install  
npm start  
________________________________________
📝 To-Do (Optional Enhancements)
•	Add user authentication with JWT
•	Enable image upload for products
•	Add search and filtering functionality
•	Implement order tracking and invoice generation
________________________________________
📬 Contact
Faizan Tanveer
Email: faizantnvr@gmail.com
________________________________________
📄 License
This project is for academic use. All rights reserved.

