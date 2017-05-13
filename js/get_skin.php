<?php
	require 'config.php';

	if($_POST['type'] == 'all'){

		$query = mysql_query("SELECT small_bg,big_bg,bg_color,bg_text FROM blog_skin1 LIMIT 0,6") or die('SQL错误！');  //得到前三条博文

		
		$json = '';

		while(!!$row = mysql_fetch_array($query, MYSQL_ASSOC)){ 

			$json .= json_encode($row).',';   
			
		}

		sleep(1);
		echo '['.substr($json,0,strlen($json)-1).']';

	}else if($_POST['type'] == 'main'){

		$query = mysql_query("SELECT big_bg,bg_color FROM blog_skin1 WHERE bg_flag = 1") or die('SQL错误！');  //得到前三条博文
		$row = mysql_fetch_array($query, MYSQL_ASSOC)  ; //将flag等于1的取出来

		echo json_encode($row);

	}else if($_POST['type'] == 'set'){

		mysql_query("UPDATE blog_skin1 SET bg_flag = 0 WHERE bg_flag = 1") or die('SQL错误！');  //flag = 1 得修改为0
	 	mysql_query("UPDATE blog_skin1 SET bg_flag = 1 WHERE big_bg = '{$_POST['big_bg']}' ") or die('SQL错误！');  //将点击的flag改为1 在数据库中

		echo mysql_affected_rows();//是否影响到数据库一行了呢


	}

	mysql_close();
?>