<?
	//连接数据库的功能
	header('Content-Type:text/html;charset=utf-8');  //


	define('DB_HOST','localhost');
	define('DB_USER','root');
	define('DB_PWD','');
	define('DB_NAME','blog');  //数据库名称

	$conn = @mysql_connect(DB_HOST,DB_USER,DB_PWD) or die('数据库连接失败：'.mysql_error());
	//数据库连接失败的时候显示提示信息

	//选择指定的数据库，设置字符集
	@mysql_select_db(DB_NAME) or die('数据库错误：'.mysql_error());  // 数据库报错误
 
	@mysql_query('SET NAMES UTF8') or die('字符集错误:'.mysql_error());  //设置字符集

	//新增数据库 create database blog(数据库名称);
	//查看所有数据库 show databases;
	//查看数据库的创建语句

?>