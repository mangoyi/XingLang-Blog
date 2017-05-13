<?
	
	require 'config.php';  //链接加载到数据库

	$query = "INSERT INTO blog_artical(title,content,date)
								VALUES('{$_POST['title']}','{$_POST['content']}',NOW())";
	//新增数据
	mysql_query($query,$conn) or die('新增失败！'.mysql_error());

	
	sleep(1);
	echo mysql_affected_rows();  //.这里返回1说明有一个用户注册了成功了一条数据添加在数据库了


	mysql_close();  //关闭数据库

							

?>