<?php
	require 'config.php';
	
	$query = mysql_query("SELECT user FROM blog_user WHERE user='{$_POST['user']}'") or die('SQL错误！');
	//判断一个数据是否存在数据中
	if (mysql_fetch_array($query, MYSQL_ASSOC)) {
		// sleep(3);
		echo 1; //如果返回1说明在数据库中查找到这个数据
	}
	
	mysql_close();
?>