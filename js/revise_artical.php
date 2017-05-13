<?php
	require 'config.php';

	$query = mysql_query("SELECT title,content,date FROM blog_artical ORDER BY date DESC") or die('SQL错误！');  //得到前三条博文

	$result = mysql_query("select id,title,content,date from blog_artical order by date desc",$conn);
	// var_dump($result);
	$json = '';

	while($row = mysql_fetch_array($result, MYSQL_ASSOC)){ //转换成boolean值
		// var_dump($row);
		$json .= json_encode($row).',';      //将这个json转换为字符串,中间用逗号隔开
		// {"title":"jjjjj","content":"jjjjj","date":"2017-04-24 10:16:30"},{"title":"leige","content":"leige","date":"2017-04-24 10:13:52"},{"title":"yangtao blog","content":"yangtaoblog","date":"2017-04-24 10:11:04"},
		
	}

	sleep(1);  //3s之后再显示
	echo '['.substr($json,0,strlen($json)-1).']';           //分号很重要 并且要去掉最后一个逗号
	
	//这里php处理出来的json格式的数据已经完成了我们现在要做的就是在js去展现html

	mysql_close();
?>