<?
	
	require 'config.php';  //链接加载到数据库

	$_birthday = $_POST['year'].'-'.$_POST['month'].'-'.$_POST['day'];  //选择框那里是三个所以选择合并到一起

	$query = "INSERT INTO blog_user(user,pass,ques,ans,email,birthday,ps)
								VALUES('{$_POST['user']}',sha1('{$_POST['pass']}'),'{$_POST['ques']}','{$_POST['ans']}','{$_POST['email']}','{$_birthday}','{$_POST['ps']}')";
								//sha1 为了给密码加密，加密处理
	//新增数据
	mysql_query($query,$conn) or die('新增失败！'.mysql_error());

	
	sleep(1);
	echo mysql_affected_rows();  //.这里返回1说明有一个用户注册了成功了一条数据添加在数据库了


	mysql_close();  //关闭数据库

							


?>