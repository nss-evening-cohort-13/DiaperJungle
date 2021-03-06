USE [master]
GO
/****** Object:  Database [DiaperJungle]    Script Date: 5/17/2021 6:24:47 PM ******/
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
/****** Object:  Table [dbo].[Animal_Type]    Script Date: 5/17/2021 6:24:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Animal_Type](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[animal_category] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Animal_Type] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order_Product]    Script Date: 5/17/2021 6:24:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order_Product](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NOT NULL,
	[product_id] [int] NOT NULL,
	[price] [money] NOT NULL,
	[units] [int] NOT NULL,
	[product_desc] [varchar](50) NULL,
 CONSTRAINT [PK_Order_Product] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 5/17/2021 6:24:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[pay_type] [int] NULL,
	[total_cost] [money] NULL,
	[user_id] [int] NOT NULL,
	[is_complete] [bit] NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment_Type]    Script Date: 5/17/2021 6:24:47 PM ******/
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
/****** Object:  Table [dbo].[Product]    Script Date: 5/17/2021 6:24:47 PM ******/
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
	[image_url] [varchar](max) NOT NULL,
	[animal_type_id] [int] NOT NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Type]    Script Date: 5/17/2021 6:24:47 PM ******/
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
/****** Object:  Table [dbo].[User]    Script Date: 5/17/2021 6:24:47 PM ******/
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
	[fb_uid] [varchar](100) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Animal_Type] ON 

INSERT [dbo].[Animal_Type] ([id], [animal_category]) VALUES (1, N'Dog')
INSERT [dbo].[Animal_Type] ([id], [animal_category]) VALUES (2, N'Cat')
INSERT [dbo].[Animal_Type] ([id], [animal_category]) VALUES (3, N'Chicken')
INSERT [dbo].[Animal_Type] ([id], [animal_category]) VALUES (4, N'Gerbil')
INSERT [dbo].[Animal_Type] ([id], [animal_category]) VALUES (5, N'Hamster')
INSERT [dbo].[Animal_Type] ([id], [animal_category]) VALUES (6, N'Guinea Pig')
INSERT [dbo].[Animal_Type] ([id], [animal_category]) VALUES (7, N'Snake')
INSERT [dbo].[Animal_Type] ([id], [animal_category]) VALUES (8, N'Horse')
INSERT [dbo].[Animal_Type] ([id], [animal_category]) VALUES (9, N'Rabbit')
INSERT [dbo].[Animal_Type] ([id], [animal_category]) VALUES (10, N'Ferret')
SET IDENTITY_INSERT [dbo].[Animal_Type] OFF
SET IDENTITY_INSERT [dbo].[Order_Product] ON 

INSERT [dbo].[Order_Product] ([id], [order_id], [product_id], [price], [units], [product_desc]) VALUES (6, 1, 2, 3.9100, 1, NULL)
INSERT [dbo].[Order_Product] ([id], [order_id], [product_id], [price], [units], [product_desc]) VALUES (7, 2, 3, 22.3700, 1, NULL)
INSERT [dbo].[Order_Product] ([id], [order_id], [product_id], [price], [units], [product_desc]) VALUES (8, 3, 4, 8.2800, 20, NULL)
INSERT [dbo].[Order_Product] ([id], [order_id], [product_id], [price], [units], [product_desc]) VALUES (9, 4, 5, 21.8000, 5, NULL)
INSERT [dbo].[Order_Product] ([id], [order_id], [product_id], [price], [units], [product_desc]) VALUES (10, 4, 6, 18.9200, 1, NULL)
INSERT [dbo].[Order_Product] ([id], [order_id], [product_id], [price], [units], [product_desc]) VALUES (15, 5, 3, 22.3700, 1, N'Tennessee Volunteers Diaper')
INSERT [dbo].[Order_Product] ([id], [order_id], [product_id], [price], [units], [product_desc]) VALUES (16, 5, 4, 8.2800, 1, N'Self-Sizing Diaper')
INSERT [dbo].[Order_Product] ([id], [order_id], [product_id], [price], [units], [product_desc]) VALUES (19, 5, 2, 3.9100, 1, N'New York Yankees Diaper')
SET IDENTITY_INSERT [dbo].[Order_Product] OFF
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([id], [pay_type], [total_cost], [user_id], [is_complete]) VALUES (1, 1002, 10000.0000, 3, 1)
INSERT [dbo].[Orders] ([id], [pay_type], [total_cost], [user_id], [is_complete]) VALUES (2, 1003, 22.3700, 3, 0)
INSERT [dbo].[Orders] ([id], [pay_type], [total_cost], [user_id], [is_complete]) VALUES (3, 1004, 165.6000, 4, 1)
INSERT [dbo].[Orders] ([id], [pay_type], [total_cost], [user_id], [is_complete]) VALUES (4, 1005, 127.9200, 4, 0)
INSERT [dbo].[Orders] ([id], [pay_type], [total_cost], [user_id], [is_complete]) VALUES (5, NULL, 0.0000, 5, 0)
SET IDENTITY_INSERT [dbo].[Orders] OFF
SET IDENTITY_INSERT [dbo].[Payment_Type] ON 

INSERT [dbo].[Payment_Type] ([id], [pay_type], [account_number], [user_id]) VALUES (1002, N'Visa', 13249786, 3)
INSERT [dbo].[Payment_Type] ([id], [pay_type], [account_number], [user_id]) VALUES (1003, N'PayPal', 30894576, 3)
INSERT [dbo].[Payment_Type] ([id], [pay_type], [account_number], [user_id]) VALUES (1004, N'Mastercard', 2387456, 4)
INSERT [dbo].[Payment_Type] ([id], [pay_type], [account_number], [user_id]) VALUES (1005, N'Visa', 39485672, 4)
SET IDENTITY_INSERT [dbo].[Payment_Type] OFF
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (1, 36, 17.0800, N'Chicago Bears Diaper', N'Love the Chicago Bears, this is the diaper for you!', 2, N'http://dummyimage.com/218x100.png/cc0000/ffffff', 1)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (2, 36, 3.9100, N'New York Yankees Diaper', N'Love the New York Yankees, this is the diaper for you!', 3, N'http://dummyimage.com/201x100.png/ff4444/ffffff', 2)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (3, 36, 22.3700, N'Tennessee Volunteers Diaper', N'Love the Vols, this is the diaper for you!', 5, N'http://dummyimage.com/189x100.png/ff4444/ffffff', 3)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (4, 37, 8.2800, N'Self-Sizing Diaper', N'Does your pet gain and lose weight constantly and randomly. This is the diaper for you!', 10, N'http://dummyimage.com/143x100.png/cc0000/ffffff', 4)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (5, 37, 21.8000, N'Self-Sizing Diaper', N'Does your pet gain and lose weight constantly and randomly. This is the diaper for you!', 1, N'http://dummyimage.com/153x100.png/5fa2dd/ffffff', 5)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (6, 37, 18.9200, N'Self-Sizing Diaper', N'Does your pet gain and lose weight constantly and randomly. This is the diaper for you!', 8, N'http://dummyimage.com/116x100.png/5fa2dd/ffffff', 6)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (7, 38, 5.6600, N'Hatchback Diaper', N'Perfect for any pet that needs to go to the restroom often, quickly, and mess free!', 9, N'http://dummyimage.com/179x100.png/5fa2dd/ffffff', 7)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (8, 38, 20.5600, N'Hatchback Diaper', N'Perfect for any pet that needs to go to the restroom often, quickly, and mess free!', 10, N'http://dummyimage.com/133x100.png/ff4444/ffffff', 8)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (9, 38, 13.4100, N'Hatchback Diaper', N'Perfect for any pet that needs to go to the restroom often, quickly, and mess free!', 7, N'http://dummyimage.com/241x100.png/cc0000/ffffff', 9)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (10, 39, 6.7400, N'Disposable Diaper', N'Perfect for on-the-go situations, and non-environmentally conscious owners', 6, N'http://dummyimage.com/228x100.png/cc0000/ffffff', 10)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (11, 39, 16.2600, N'Disposable Diaper', N'Perfect for on-the-go situations, and non-environmentally conscious owners', 3, N'http://dummyimage.com/226x100.png/5fa2dd/ffffff', 1)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (12, 39, 3.3800, N'Disposable Diaper', N'Perfect for on-the-go situations, and non-environmentally conscious owners', 8, N'http://dummyimage.com/220x100.png/5fa2dd/ffffff', 2)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (13, 40, 8.6400, N'Re-Usable Diaper', N'For the owner that goes the extra mile to save the Earth', 1, N'http://dummyimage.com/122x100.png/ff4444/ffffff', 3)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (14, 40, 18.5000, N'Re-Usable Diaper', N'For the owner that goes the extra mile to save the Earth', 7, N'http://dummyimage.com/214x100.png/ff4444/ffffff', 4)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (15, 40, 22.0700, N'Re-Usable Diaper', N'For the owner that goes the extra mile to save the Earth', 5, N'http://dummyimage.com/221x100.png/cc0000/ffffff', 5)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (16, 43, 27.2700, N'Smart Diaper*', N'*Only compatible with Elon Musk Neuralink brain chips', 6, N'http://dummyimage.com/219x100.png/5fa2dd/ffffff', 6)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (17, 43, 2.5800, N'Smart Diaper*', N'*Only compatible with Elon Musk Neuralink brain chips', 6, N'http://dummyimage.com/131x100.png/dddddd/000000', 7)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (18, 43, 19.0100, N'Smart Diaper*', N'*Only compatible with Elon Musk Neuralink brain chips', 10, N'http://dummyimage.com/121x100.png/ff4444/ffffff', 8)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (19, 35, 27.9400, N'Red Diaper', N'Love the color Red, This is the diaper for you!', 7, N'http://dummyimage.com/185x100.png/cc0000/ffffff', 9)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (20, 35, 28.5600, N'Orange Diaper', N'Love the color Orange, This is the diaper for you!', 3, N'http://dummyimage.com/135x100.png/cc0000/ffffff', 10)
INSERT [dbo].[Product] ([id], [type_id], [price], [title], [description], [quantity], [image_url], [animal_type_id]) VALUES (21, 43, 1.0000, N'Test Product', N'Test', 5, N'http://dummyimage.com/135x100.png/cc0000/ffffff', 5)
SET IDENTITY_INSERT [dbo].[Product] OFF
SET IDENTITY_INSERT [dbo].[Product_Type] ON 

INSERT [dbo].[Product_Type] ([id], [category]) VALUES (35, N'Colored Diapers')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (36, N'Team Logo Diapers')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (37, N'Self-Sizing Diapers')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (38, N'Hatchback Diapers')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (39, N'Disposable Diapers')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (40, N'Re-Usable Diapers')
INSERT [dbo].[Product_Type] ([id], [category]) VALUES (43, N'Smart Diapers')
SET IDENTITY_INSERT [dbo].[Product_Type] OFF
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([id], [first_name], [last_name], [date_created], [username], [password], [is_admin], [fb_uid]) VALUES (3, N'Joseph', N'Martin', CAST(N'2021-05-01T10:17:23.997' AS DateTime), N'username', N'password', 0, N'Bb0IAM5PkEhUgHm99EnrOkyMpps2')
INSERT [dbo].[User] ([id], [first_name], [last_name], [date_created], [username], [password], [is_admin], [fb_uid]) VALUES (4, N'KSI', N'Morosis', CAST(N'2021-05-01T11:44:45.173' AS DateTime), N'username', N'password', 0, N'THlu83XK9HYPI75rnziz6dkOLDi2')
INSERT [dbo].[User] ([id], [first_name], [last_name], [date_created], [username], [password], [is_admin], [fb_uid]) VALUES (5, N'Ryan', N'McNair', CAST(N'2021-05-11T19:38:46.500' AS DateTime), N'username', N'password', 0, N'T0AvH1OjjHaSUXMeLMKKH8mHQRm2')
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
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Payment_Type] FOREIGN KEY([pay_type])
REFERENCES [dbo].[Payment_Type] ([id])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Payment_Type]
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
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Animal_Type] FOREIGN KEY([animal_type_id])
REFERENCES [dbo].[Animal_Type] ([id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Animal_Type]
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
