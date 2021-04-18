USE [master]
GO
/****** Object:  Database [DiaperJungle]    Script Date: 4/18/2021 3:03:45 PM ******/
CREATE DATABASE [DiaperJungle]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DiaperJungle', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\DiaperJungle.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DiaperJungle_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\DiaperJungle_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [DiaperJungle] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DiaperJungle].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DiaperJungle] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DiaperJungle] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DiaperJungle] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DiaperJungle] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DiaperJungle] SET ARITHABORT OFF 
GO
ALTER DATABASE [DiaperJungle] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DiaperJungle] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DiaperJungle] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DiaperJungle] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DiaperJungle] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DiaperJungle] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DiaperJungle] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DiaperJungle] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DiaperJungle] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DiaperJungle] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DiaperJungle] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DiaperJungle] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DiaperJungle] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DiaperJungle] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DiaperJungle] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DiaperJungle] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DiaperJungle] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DiaperJungle] SET RECOVERY FULL 
GO
ALTER DATABASE [DiaperJungle] SET  MULTI_USER 
GO
ALTER DATABASE [DiaperJungle] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DiaperJungle] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DiaperJungle] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DiaperJungle] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DiaperJungle] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'DiaperJungle', N'ON'
GO
ALTER DATABASE [DiaperJungle] SET QUERY_STORE = OFF
GO
USE [DiaperJungle]
GO
/****** Object:  Table [dbo].[Order_Product]    Script Date: 4/18/2021 3:03:45 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order_Product](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NOT NULL,
	[product_id] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 4/18/2021 3:03:45 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[prod_id] [int] NOT NULL,
	[product_quantity] [int] NOT NULL,
	[pay_type] [varchar](50) NOT NULL,
	[total_cost] [money] NOT NULL,
	[user_id] [int] NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment_Type]    Script Date: 4/18/2021 3:03:45 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment_Type](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[pay_type] [varchar](50) NOT NULL,
	[account_number] [int] NOT NULL,
	[user_id] [int] NOT NULL,
 CONSTRAINT [PK_Payment_Type] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 4/18/2021 3:03:45 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[type_id] [int] NOT NULL,
	[price] [money] NOT NULL,
	[title] [varchar](50) NOT NULL,
	[description] [varchar](max) NOT NULL,
	[quantity] [int] NOT NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Type]    Script Date: 4/18/2021 3:03:45 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Type](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[category] [varchar](50) NULL,
 CONSTRAINT [PK_Product_Type] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 4/18/2021 3:03:45 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [varchar](50) NOT NULL,
	[last_name] [varchar](50) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[username] [nvarchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
	[is_admin] [bit] NOT NULL,
	[payment_id] [int] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Order_Product] ON 

INSERT [dbo].[Order_Product] ([id], [order_id], [product_id]) VALUES (3, 3, 93)
SET IDENTITY_INSERT [dbo].[Order_Product] OFF
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([id], [prod_id], [product_quantity], [pay_type], [total_cost], [user_id]) VALUES (3, 93, 20, N'PayPal', 100.6000, 6)
INSERT [dbo].[Orders] ([id], [prod_id], [product_quantity], [pay_type], [total_cost], [user_id]) VALUES (6, 94, 50, N'Credit card', 22.0000, 6)
SET IDENTITY_INSERT [dbo].[Orders] OFF
SET IDENTITY_INSERT [dbo].[Payment_Type] ON 

INSERT [dbo].[Payment_Type] ([id], [pay_type], [account_number], [user_id]) VALUES (1, N'PayPal', 83746, 6)
INSERT [dbo].[Payment_Type] ([id], [pay_type], [account_number], [user_id]) VALUES (2, N'Mastercard', 48362, 6)
INSERT [dbo].[Payment_Type] ([id], [pay_type], [account_number], [user_id]) VALUES (3, N'Mastercard', 345677, 7)
INSERT [dbo].[Payment_Type] ([id], [pay_type], [account_number], [user_id]) VALUES (4, N'Visa', 34643, 9)
SET IDENTITY_INSERT [dbo].[Payment_Type] OFF
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (91, 1, 92.8500, N'justo', N'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 100)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (92, 2, 71.8900, N'ut', N'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 54)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (93, 3, 5.0300, N'vel pede morbi', N'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 99)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (94, 4, 50.3000, N'ac leo pellentesque', N'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 81)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (95, 5, 89.7600, N'venenatis lacinia', N'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 75)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (96, 6, 20.9200, N'in leo maecenas pulvinar lobortis est', N'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 41)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (97, 7, 71.1900, N'vulputate justo', N'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 37)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (98, 8, 59.7200, N'metus arcu adipiscing', N'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 30)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (99, 9, 23.6400, N'nisl ut volutpat', N'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 50)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (100, 10, 83.2900, N'nonummy integer non velit', N'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 18)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (101, 11, 24.1300, N'pede ullamcorper augue a suscipit', N'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 96)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (102, 12, 1.7300, N'parturient montes nascetur ridiculus', N'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 67)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (103, 13, 42.8200, N'bibendum felis', N'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 7)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (104, 14, 0.5200, N'justo sit amet sapien', N'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 100)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (105, 15, 72.4400, N'dignissim vestibulum', N'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 98)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (106, 16, 35.7400, N'aliquam', N'Phasellus in felis. Donec semper sapien a libero. Nam dui.', 56)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (107, 17, 30.3600, N'nisl ut volutpat sapien arcu', N'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 42)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (108, 18, 15.1400, N'maecenas leo', N'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 96)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (109, 19, 70.7500, N'dis parturient', N'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 30)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (110, 20, 76.1400, N'dis', N'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 1)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (111, 21, 89.6000, N'platea dictumst maecenas', N'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 62)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (112, 22, 20.9200, N'morbi sem', N'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 81)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (113, 23, 97.1000, N'consectetuer adipiscing elit proin risus', N'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 28)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (114, 24, 35.2900, N'sapien quis libero nullam', N'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 81)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (115, 25, 98.5800, N'leo rhoncus sed vestibulum sit amet', N'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 12)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (116, 26, 78.7900, N'commodo vulputate justo', N'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 30)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (117, 27, 99.6900, N'maecenas tincidunt lacus at velit', N'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 91)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (118, 28, 23.9800, N'a libero nam dui proin leo', N'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 97)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (119, 29, 76.5700, N'tortor eu pede', N'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 21)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity]) VALUES (120, 30, 85.9800, N'morbi ut odio cras', N'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 90)
SET IDENTITY_INSERT [dbo].[Product] OFF
SET IDENTITY_INSERT [dbo].[Product_Type] ON 

INSERT [dbo].[Product_Type] ([id], [category]) VALUES (1, N'Ford')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (2, N'Hyundai')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (3, N'Chevrolet')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (4, N'Land Rover')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (5, N'Toyota')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (6, N'Kia')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (7, N'Acura')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (8, N'GMC')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (9, N'GMC')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (10, N'Dodge')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (11, N'BMW')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (12, N'Mercury')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (13, N'Suzuki')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (14, N'Audi')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (15, N'Chevrolet')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (16, N'Scion')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (17, N'Toyota')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (18, N'Mazda')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (19, N'Ford')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (20, N'Jaguar')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (21, N'Subaru')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (22, N'Lexus')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (23, N'Chevrolet')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (24, N'Lincoln')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (25, N'Plymouth')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (26, N'Honda')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (27, N'BMW')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (28, N'Cadillac')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (29, N'Volvo')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (30, N'Chevrolet')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (32, N'Horse')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (33, N'Sloth')
SET IDENTITY_INSERT [dbo].[Product_Type] OFF
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([id], [first_name], [last_name], [date_created], [username], [password], [is_admin], [payment_id]) VALUES (6, N'Joe', N'Butts', CAST(N'2018-10-20T00:00:00.000' AS DateTime), N'joebutts', N'password', 0, 2)
INSERT [dbo].[User] ([id], [first_name], [last_name], [date_created], [username], [password], [is_admin], [payment_id]) VALUES (7, N'Ryan', N'Nutts', CAST(N'1942-10-20T00:00:00.000' AS DateTime), N'ryannutts', N'password123', 0, 3)
INSERT [dbo].[User] ([id], [first_name], [last_name], [date_created], [username], [password], [is_admin], [payment_id]) VALUES (9, N'Add', N'Men', CAST(N'1924-10-20T00:00:00.000' AS DateTime), N'addmen', N'passwordbackwards', 1, 4)
SET IDENTITY_INSERT [dbo].[User] OFF
ALTER TABLE [dbo].[Order_Product]  WITH CHECK ADD  CONSTRAINT [FK_Order_Product_Orders] FOREIGN KEY([order_id])
REFERENCES [dbo].[Orders] ([id])
GO
ALTER TABLE [dbo].[Order_Product] CHECK CONSTRAINT [FK_Order_Product_Orders]
GO
ALTER TABLE [dbo].[Order_Product]  WITH CHECK ADD  CONSTRAINT [FK_Order_Product_Product] FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([id])
GO
ALTER TABLE [dbo].[Order_Product] CHECK CONSTRAINT [FK_Order_Product_Product]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Orders] FOREIGN KEY([prod_id])
REFERENCES [dbo].[Product] ([id])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Orders]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Product] FOREIGN KEY([user_id])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Product]
GO
ALTER TABLE [dbo].[Payment_Type]  WITH CHECK ADD  CONSTRAINT [FK_Payment_Type_User] FOREIGN KEY([user_id])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Payment_Type] CHECK CONSTRAINT [FK_Payment_Type_User]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Product_Type] FOREIGN KEY([type_id])
REFERENCES [dbo].[Product_Type] ([id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Product_Type]
GO
USE [master]
GO
ALTER DATABASE [DiaperJungle] SET  READ_WRITE 
GO
