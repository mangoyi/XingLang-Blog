<?php
	require 'config.php';
	
	$id = $_GET['id'];
	$id = substr($id,0,strpos($id,'?'));

	// 删除某条数
	$sql = "DELETE FROM blog_artical WHERE id=$id";

	$result = mysql_query($sql,$conn);

	if($result) {
		$arr['status'] = 'true';
		$arr['msg'] = '删除成功！';
		echo json_encode($arr['msg']);
	} else {
		$arr['status'] = 'false';
		$arr['msg'] = '系统繁忙，请稍后重试！';
		echo json_encode($arr['status']);
	}

	mysql_close($conn);

	// // 查看某条详细信息
	// $sql = "select * from blog_artical where id=" .$id;

	// // 编辑提交表单
	// /*
	// array(
	// 	'id'=>"2",
	// 	'title'=>的回访电话,
	// 	'content'=>"jkfsjd"
	// )
	// */
	// // 收集表单信息
	// $data = $_POST();
	// // 添加编辑时间
	// $data['date'] = date('Y-m-d',time());
	// $id = $data['id'];
	// unset($data['id']);
	// $sql = "update blog_artical set ";
	// foreach($data as $k=>$v) {
	// 	$sql .= "$k=$v,";
	// }
	// // 去掉最后一个逗号
	// $sql = substr($sql,0,strlen($sql)-1);
	// $sql .= ' where id='.$id;
	// $rs = mysql_query($sql,$conn);
	// if($rs) {
	// 	$arr['status'] = 'true';
	// 	$arr['msg'] = '编辑成功！';
	// } else {
	// 	$arr['status'] = 'false';
	// 	$arr['msg'] = '系统繁忙，请稍后重试！';
	// 	echo json_encode($arr);
	// }

	
	
?>