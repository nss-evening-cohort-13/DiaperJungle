USE [master]
GO
/****** Object:  Database [DiaperJungle]    Script Date: 4/13/2021 8:04:44 PM ******/
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
/****** Object:  Table [dbo].[Order_Product]    Script Date: 4/13/2021 8:04:44 PM ******/
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
/****** Object:  Table [dbo].[Orders]    Script Date: 4/13/2021 8:04:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[prod_id] [int] NOT NULL,
	[product_quantity] [int] NOT NULL,
	[pay_type] [int] NOT NULL,
	[total_cost] [money] NOT NULL,
	[user_id] [int] NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment_Type]    Script Date: 4/13/2021 8:04:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment_Type](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[pay_type] [varchar](50) NOT NULL,
	[account_number] [int] NOT NULL,
 CONSTRAINT [PK_Payment_Type] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 4/13/2021 8:04:44 PM ******/
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
/****** Object:  Table [dbo].[Product_Type]    Script Date: 4/13/2021 8:04:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Type](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[category] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Product_Type] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 4/13/2021 8:04:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [varchar](50) NOT NULL,
	[last_name] [varchar](50) NOT NULL,
	[date_created] [datetime] NOT NULL,
	[username] [int] NOT NULL,
	[password] [varchar](50) NOT NULL,
	[is_admin] [bit] NOT NULL,
	[payment_id] [int] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
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
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Product_Type] FOREIGN KEY([type_id])
REFERENCES [dbo].[Product_Type] ([id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Product_Type]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Payment_Type] FOREIGN KEY([payment_id])
REFERENCES [dbo].[Payment_Type] ([id])
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Payment_Type]
GO
USE [master]
GO
ALTER DATABASE [DiaperJungle] SET  READ_WRITE 
GO
