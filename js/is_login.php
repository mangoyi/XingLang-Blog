<?php
	require 'config.php';
	
	$_pass = sha1($_POST['pass']);

	$query = mysql_query("SELECT user FROM blog_user WHERE user='{$_POST['user']}' AND pass='{$_pass}'") or die('SQL错误！');

	if (mysql_fetch_array($query, MYSQL_ASSOC)) {  //说明用户名和密码正确
		sleep(1);
		echo 0; //如果返回0说明在数据库中查找到这个数据
	}else {
		sleep(1);
		echo 1;  //用户名和密码不正确
	}
	
	mysql_close();
?>