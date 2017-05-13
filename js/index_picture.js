$(function () {
	//个人中心
	$('#header .member').hover(function () {
		$(this).css('background', 'url(./images/arrow2.png) no-repeat 55px center');
		$('#header .member_ul').show().animate({
			t : 30,
			step : 10,
			mul : {
				o : 100,
				h : 120
			}
		});
	}, function () {
		$(this).css('background', 'url(./images/arrow.png) no-repeat 55px center');
		$('#header .member_ul').animate({
			t : 30,
			step : 10,
			mul : {
				o : 0,
				h : 0
			},
			fn : function () {
				$('#header .member_ul').hide();
			}
		});
	});
	
	
	//遮罩画布
	var screen = $('#screen');
	
	//登录框
	var login = $('#login');
	login.center(350, 250).resize(function () {
		if (login.css('display') == 'block') {
			screen.lock();
		}
	});
	$('#header .login').click(function () {
		login.center(350, 250).css('display', 'block');
		screen.lock().animate({
			attr : 'o',
			target : 30,
			t : 30,
			step : 10
		});
	});
	$('#login .close').click(function () {
		login.css('display', 'none');
		//先执行渐变动画，动画完毕后再执行关闭unlock
		screen.animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10,
			fn : function () {
				screen.unlock();
			}
		});
	});
	
	//注册框
	var reg = $('#reg');
	reg.center(600, 550).resize(function () {
		if (reg.css('display') == 'block') {
			screen.lock();
		}
	});
	$('#header .reg').click(function () {
		reg.center(600, 550).css('display', 'block');
		screen.lock().animate({
			attr : 'o',
			target : 30,
			t : 30,
			step : 10
		});
	});
	$('#reg .close').click(function () {
		reg.css('display', 'none');
		screen.animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10,
			fn : function () {
				screen.unlock();
			}
		});
	});
	
	//拖拽
	login.drag($('#login h2').last());
	reg.drag($('#reg h2').last());
	
	//滑动导航
	$('#nav .about li').hover(function () {
		var target = $(this).first().offsetLeft;
		$('#nav .nav_bg').animate({
			attr : 'x',
			target : target + 20,
			t : 30,
			step : 10,
			fn : function () {
				$('#nav .white').animate({
					attr : 'x',
					target : -target
				});
			}
		});
	}, function () {
		$('#nav .nav_bg').animate({
			attr : 'x',
			target : 20,
			t : 30,
			step : 10,
			fn : function () {
				$('#nav .white').animate({
					attr : 'x',
					target : 0
				});
			}
		});
	});

	//点击
	$('#nav .about li').click(function() {

		$('#nav .nav_bg').css('left',$(this).first().offsetLeft + 20 + 'px' );

	} )
	

	//初始化表单操作
	$('form').eq(0).first().reset();  //在页面刷新的时候我们的表单初始化所有数据。低版本的火狐 会出现f5刷新的时候 表单里面有一些数据还在，但是这种情况已经在现在的浏览器不存在了，这里为了完美做这一个操作

	
	$('form').eq(0).form('user').bind('focus', function () {
		$('#reg .info_user').css('display', 'block');
		$('#reg .error_user').css('display', 'none');
		$('#reg .succ_user').css('display', 'none');
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_user').css('display', 'none');
			$('#reg .error_user').css('display', 'none');
			$('#reg .succ_user').css('display', 'none');
		} else if (!check_user()) {
			$('#reg .error_user').css('display', 'block');
			$('#reg .info_user').css('display', 'none');
			$('#reg .succ_user').css('display', 'none');
		} else {
			$('#reg .succ_user').css('display', 'block');
			$('#reg .error_user').css('display', 'none');
			$('#reg .info_user').css('display', 'none');
		}
	});
	

	//验证user ,这样分离便于我们下面进行验证
	function check_user() {
		var flag = true;
		if( !/[\w]{2,20}/.test(trim($('form').eq(0).form('user').value()))){ //如果格式不正确
			$('#reg .error_user').html('输入不合法请重新输入')

			return false;
		}else{
			//当用户名已经是合法的时候我们就开始显示告诉用户我们在检测用户名有没有被占用
			$('#reg .loading').css('display','block');
			//将用户名提示也隐藏
			$('#reg .info_user').css('display','none');
			//当用户名正确的时候我们在ajax验证

			ajax({
				method :'post',
				url : './js/is_user.php',
				data : $('form').eq(0).serialize(),
				success : function(text){
					if(text == 1){ //说明重复了在数据库已经有这个用户名了
						$('#reg .error_user').html('用户名已被占用');
						flag = false;
					}else{
						flag = true;
					}
					$('#reg .loading').css('display','none'); //隐藏
				},
				async : false   //让其同步，这样我们全部判断完数据在显示.不过js是同步的所以会导致 只有等检测完才可以进行下面js判断，当然这样也是为了更好的测试出这个值
			});

		}
		return flag;	
	}

	//55 这里我们要将输入的数据放到数据库中进行验证



	
	//密码验证
	$('form').eq(0).form('pass').bind('focus', function () {
		$('#reg .info_pass').css('display', 'block');
		$('#reg .error_pass').css('display', 'none');
		$('#reg .succ_pass').css('display', 'none');
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_pass').css('display', 'none');
		} else {
			if (check_pass()) {
				$('#reg .info_pass').css('display', 'none');
				$('#reg .error_pass').css('display', 'none');
				$('#reg .succ_pass').css('display', 'block');
			} else {
				$('#reg .info_pass').css('display', 'none');
				$('#reg .error_pass').css('display', 'block');
				$('#reg .succ_pass').css('display', 'none');
			}
		}
	});
	
	//密码强度验证
	$('form').eq(0).form('pass').bind('keyup', function () {
		check_pass();
	});
	
	//密码验证函数
	function check_pass() {
		var value = trim($('form').eq(0).form('pass').value());
		var value_length = value.length;
		var code_length = 0;
		// var flag = false;
		
		//第一个必须条件的验证6-20位之间
		if (value_length >= 6 && value_length <= 20) {
			$('#reg .info_pass .q1').html('●').css('color', 'green');
		} else {
			$('#reg .info_pass .q1').html('○').css('color', '#666');
		}
		
		//第二个必须条件的验证，字母或数字或非空字符，任意一个即可
		if (value_length > 0 && !/\s/.test(value)) {
			$('#reg .info_pass .q2').html('●').css('color', 'green');
		} else {
			$('#reg .info_pass .q2').html('○').css('color', '#666');
		}
		
		//第三个必须条件的验证，大写字母，小写字母，数字，非空字符 任意两种混拼即可
		
		if (/[\d]/.test(value)) {
			code_length++;
		}
		
		if (/[a-z]/.test(value)) {
			code_length++;
		}
		
		if (/[A-Z]/.test(value)) {
			code_length++;
		}
		
		if (/[^\w]/.test(value)) {
			code_length++;
		}
		
		if (code_length >= 2) {
			$('#reg .info_pass .q3').html('●').css('color', 'green');
		} else {
			$('#reg .info_pass .q3').html('○').css('color', '#666');
		}
		
		//安全级别
		if (value_length >= 10 && code_length >= 3) {
			$('#reg .info_pass .s1').css('color', 'green');
			$('#reg .info_pass .s2').css('color', 'green');
			$('#reg .info_pass .s3').css('color', 'green');
			$('#reg .info_pass .s4').html('高').css('color', 'green');
		} else if (value_length >= 8 && code_length >= 2) {
			$('#reg .info_pass .s1').css('color', '#f60');
			$('#reg .info_pass .s2').css('color', '#f60');
			$('#reg .info_pass .s3').css('color', '#ccc');
			$('#reg .info_pass .s4').html('中').css('color', '#f60');
		} else if (value_length >= 1) {
			$('#reg .info_pass .s1').css('color', 'maroon');
			$('#reg .info_pass .s2').css('color', '#ccc');
			$('#reg .info_pass .s3').css('color', '#ccc');
			$('#reg .info_pass .s4').html('低').css('color', 'maroon');
		} else {
			$('#reg .info_pass .s1').css('color', '#ccc');
			$('#reg .info_pass .s2').css('color', '#ccc');
			$('#reg .info_pass .s3').css('color', '#ccc');
			$('#reg .info_pass .s4').html(' ');
		}	
		
		if (value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2){
			return true;
		}else{
			return false;
		}
	}
	
	
	//密码确认
	$('form').eq(0).form('notpass').bind('focus', function () {
		$('#reg .info_notpass').css('display', 'block');
		$('#reg .error_notpass').css('display', 'none');
		$('#reg .succ_notpass').css('display', 'none');
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_notpass').css('display', 'none');
		} else if (check_notpass()){
			$('#reg .info_notpass').css('display', 'none');
			$('#reg .error_notpass').css('display', 'none');
			$('#reg .succ_notpass').css('display', 'block');
		} else {
			$('#reg .info_notpass').css('display', 'none');
			$('#reg .error_notpass').css('display', 'block');
			$('#reg .succ_notpass').css('display', 'none');
		}
	});

	function check_notpass(){
		if(trim($('form').eq(0).form('notpass').value()) == trim($('form').eq(0).form('pass').value())) {
			return true;
		}
	}

	//提问
	$('form').eq(0).form('ques').bind('change',function() {
		if(check_ques()){
			$('#reg .error_ques').css('display','none');  //当你选择问题 info就会消失了
		}
	})


	function check_ques() { 
		if($('form').eq(0).form('ques').value() != 0){   //这里说明已经选择了问题
			return true;
		}
	}

	
	//回答
	$('form').eq(0).form('ans').bind('focus', function () {
		$('#reg .info_ans').css('display', 'block');
		$('#reg .error_ans').css('display', 'none');
		$('#reg .succ_ans').css('display', 'none');
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_ans').css('display', 'none');
		} else if (check_ans()) {
			$('#reg .info_ans').css('display', 'none');
			$('#reg .error_ans').css('display', 'none');
			$('#reg .succ_ans').css('display', 'block');
		} else {
			$('#reg .info_ans').css('display', 'none');
			$('#reg .error_ans').css('display', 'block');
			$('#reg .succ_ans').css('display', 'none');
		}
	});

	function check_ans(){
		if(trim($('form').eq(0).form('ans').value()).length >= 2 && trim($('form').eq(0).form('ans').value()).length <= 32){
			return true;
		}
	}


	//电子邮件
	$('form').eq(0).form('email').bind('focus', function () {
		if($(this).value().indexOf('@') == -1){
		//补全界面
			$('#reg .all_email').css('display','block');
		}

		$('#reg .info_email').css('display', 'block');
		$('#reg .error_email').css('display', 'none');
		$('#reg .succ_email').css('display', 'none');
	}).bind('blur', function () {
			
		if($(this).value().indexOf('@') == -1){
			//补全界面
			$('#reg .all_email').css('display','none');	
		}
		if (trim($(this).value()) == '') {
			$('#reg .info_email').css('display', 'none');
		} else if (check_email()) {
			$('#reg .info_email').css('display', 'none');
			$('#reg .error_email').css('display', 'none');
			$('#reg .succ_email').css('display', 'block');
		} else {
			$('#reg .info_email').css('display', 'none');
			$('#reg .error_email').css('display', 'block');
			$('#reg .succ_email').css('display', 'none');
		}
	});

	//电子邮件检测
	function check_email(){
		if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').eq(0).form('email').value()))) {
			return true;
		}
	}


	//电子邮件补全系统键入
	$('form').eq(0).form('email').bind('keyup',function(event){

		if($(this).value().indexOf('@') == -1){  
			$('#reg .all_email').css('display','block');
			$('#reg .all_email li span').html($(this).value());
		}else{
			$('#reg .all_email').css('display','none');
		}

		if(event.keyCode == 40){
			
			if(this.index == undefined || this.index >= $('#reg .all_email li').length() -1){	//Ã‹ÂµÃƒÃ·ÂµÃšÃ’Â»Â´ÃŽÂ°Â´ÃÃ‚Â¼Ã¼ÂµÂ½ÂµÃšÃ’Â»Â¸Ã¶li,ÂµÂ±ÃŽÃ’ÃƒÃ‡Â³Â¬Â¹Ã½Ã•Ã¢Â¸Ã¶ÃŠÂ±ÂºÃ²Ã’Â²Â»Ã¡Â±Ã¤Â³Ã‰0
				this.index = 0;		
			}else{
				this.index++;	
			}
			// alert(this.index);  0 1 2 3 4 0 1 2 3 4
			$('#reg .all_email li').css('background','none');
			$('#reg .all_email li').css('color','#666');
			$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color','#369');
		}

		
		if(event.keyCode == 38){
			if(this.index == undefined || this.index <= 0){	
				this.index = $('#reg .all_email li').length() - 1;		
			}else{
				this.index--;	
			}
			// alert(this.index);  0 1 2 3 4 0 1 2 3 4
			$('#reg .all_email li').css('background','none');
			$('#reg .all_email li').css('color','#666');
			$('#reg .all_email li').eq(this.index).css('background','#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color','#369');
		}

		if(event.keyCode == 13){
			$(this).value($('#reg .all_email li').eq(this.index).text()); //Â¾ÃÂ¿Ã‰Ã’Ã”Â»Ã˜Â³ÂµÃŠÃ¤ÃˆÃ«ÂµÂ½inputÃ€Ã¯ÃƒÃ¦ÃŽÃ’ÃƒÃ‡ÃÃ«Ã’ÂªÂµÃ„Ã“ÃŠÃÃ¤ÃÃ‹
			$('#reg .all_email').css('display','none');


			this.index = undefined;
		}

	});  
	
	//电子邮件补全系统点击获取
	$('#reg .all_email li').bind('mousedown',function() {

		$('form').eq(0).form('email').value($(this).text());
		$('#reg .all_email').css('display','none');
		
	});
	

	//电子邮件补全系统鼠标移入移出效果
	$('#reg .all_email li').hover(function() {
		$(this).css('background','#e5edf2');
		$(this).css('color','#369');
	},function() {
		$(this).css('background','none');
		$(this).css('color','#666');
	});

		//年月日
	var year = $('form').eq(0).form('year');
	var month = $('form').eq(0).form('month');
	var day = $('form').eq(0).form('day');

	var day30 = [4,6,9,11]; 
	var day31 = [1,3,5,7,8,10,12];


	for(var i =1950;i<=2017;i++){
		// year.first().add(new Option(i,i),null);   
		year.first().add(new Option(i,i),undefined);  
	}

	for(var i = 1; i<13;i++) {
		month.first().add(new Option(i,i),undefined);
	}

	year.bind('change',function() {

		if($(this).value() != 0 && month.value() != 0){  

			//清理之前的注入
			day.first().options.length = 1;  //为了清理上一次注入的天数
			
			//不确定日
			var cur_day = 0;

			//往天数的选相中  添加天数
			if( inArray(day31,parseInt(month.value())) ){

				//如果是31天  ,必须选择有31天的月份然后再选择年份才可以看到日
				
				cur_day = 31;


			}else if( inArray(day30,parseInt(month.value())) ){
				cur_day = 30;
			}else{ //最后就是2月份的28天 .年份/4 没有小数点就是闰年
				//如果年份后面有两个00 要判断/400 没有小数点才是闰年  比如1900就不是闰年 不能整除400
				
				if((parseInt($(this).value()) % 4 == 0 && parseInt($(this).value()) % 100 != 0 ) ||  parseInt($(this).value()) % 400 == 0 ) {//可以判断是闰年,两种情况

					cur_day = 29;
				} else{
				cur_day = 28;
				}

			}
			for(var i=1;i<=cur_day;i++) {

				day.first().add(new Option(i,i),undefined);	
			}


		}else{  //如果我们选择了 年 而没有选择具体的年份

			day.first().options.length = 1;  //清理天数   处理好gezhongbug

		}

	})

	//日的选择
	day.bind('change',function() {
		if(check_birthday()){
			$('#reg .error_birthday').css('display','none');	
		}
	})

	//月的选择
	month.bind('change',function() {

		if(year.value() != 0 && month.value() != 0){  //Èç¹ûÄê·Ý²»µÈì¶0ÔÂ·ÝÒ²²»µÈÓÚ0ÎÒÃÇ²Å¼ÌÐøÏÂÃæÊ¹ÓÃ  ËµÃ÷Ñ¡ÔñÁËÄê·ÝºÍÔÂ·Ý

			//清理之前的注入
			day.first().options.length = 1;  //为了清理上一次注入的天数

			
			//不确定日
			var cur_day = 0;

			//往天数的选相中  添加天数
			if( inArray(day31,parseInt(month.value())) ){

				// alert(month.value());   这种的是string
				//如果是31天  ,必须选择有31天的月份然后再选择年份才可以看到日
				
				cur_day = 31;


			}else if( inArray(day30,parseInt(month.value())) ){
				cur_day = 30;
			}else{ 
				if((parseInt(year.value()) % 4 == 0 && parseInt(year.value()) % 100 != 0 ) ||  parseInt(year.value()) % 400 == 0 ) {//可以判断是闰年,两种情况

					cur_day = 29;
				} else{
				cur_day = 28;
				}

			}
			for(var i=1;i<=cur_day;i++) {

				day.first().add(new Option(i,i),undefined);	
			}


		}else{  

			day.first().options.length = 1;  //清理天数   处理好gezhongbug   当然这两个可以做好封装

		}

	})

	function check_birthday(){
		if(year.value() != 0 && month.value() != 0 && day.value() != 0){
			return true;  //说明年月日都选择了
		}
	}

	//textarea  控制输入多少个字然后还可以输入多少个字。备注
	$('form').eq(0).form('ps').bind('keyup',check_ps);
		


	//清尾的思路是我们获取输入的前200个字符然后再赋值给这个value
	$('#reg .ps .clear').click(function() {
		var want = 	$('form').eq(0).form('ps').value().substring(0,200);
		$('form').eq(0).form('ps').value(want);

		//清尾之后我们还要改变前面的内容
		check_ps();
	})

	function check_ps() {
		// var num = 5 - $(this).value().length;
		var num = 200 - $('form').eq(0).form('ps').value().length;

		// alert(num);
		if(num >= 0){
			$('#reg .ps').eq(0).css('display','block');

			$('#reg .ps .num').eq(0).html(num);

			$('#reg .ps').eq(1).css('display','none');

			return true;
		}else{ //字数超过我们规定的字数了
			$('#reg .ps').eq(0).css('display','none');
			
			$('#reg .ps .num').eq(1).html(Math.abs(num)).css('color','red');
			
			$('#reg .ps').eq(1).css('display','block');

			return false;
		}
	}

	$('form').eq(0).form('ps').bind('paste',function() {

		setTimeout(check_ps,10);   //这样我们就解决了这个bug
	})


	//41要解决的问题就是表单提交中遇到的问题,虽然不是submit类型但是我们可以通过js去模拟提交功能

	//提交
	$('form').eq(0).form('sub').click(function() { 
		//user=&pass=&notpass=&ques=0&ans=&email=&year=0&month=0&day=0&ps= 这是我们表单要提交的部分

		var flag = true;

		//用户名
		if(!check_user()){   //如果用户名是错误的,不能提交
			flag = false;
			$('#reg .error_user').css('display', 'block');  //并且将错误信息表现出来
		}

		//密码
		if(! check_pass()){
			flag = false;     //如果密码是不合法的，不能提交
			$('#reg .error_pass').css('display','block');
		}

		//确认密码
		if(! check_notpass()){
			flag = false;
			$('#reg .error_notpass').css('display','block');
		}
		//中间是一系列的判断直到判断完全部true  才会执行提交。

		//提问
		if(!check_ques()){
			flag = false;
			$('#reg .error_ques').css('display','block');
		}

		//回答
		if(!check_ans()){
			flag = false;
			$('#reg .error_ans').css('display','block');
		}

		//邮件
		if(!check_email()){
			flag = false;
			$('#reg .error_email').css('display','block');			
		}

		//生日
		if(!check_birthday()){
			flag = false;
			$('#reg .error_birthday').css('display','block');			
		}

		//备注
		if(!check_ps()) {
			flag = false;
		}


		//53  用ajax代替 上面的submit方法
		if(flag){	
			var _this = this;

			//什么时候让提示框出现正在加载那肯定是当所有条件都判断成功准备发送的时候
			$('#loading').css('display','block').center(200,40);
			$('#loading').html('正在提交注册');


			//当第一个数据已经开始提交的时候我们就应该告知用户不能在点击了
			this.disabled = true;  //不能点击
			$(this).css('backgroundPosition','right');

			ajax({
				method : 'post',
				url : './js/add.php',
				data : $('form').eq(0).serialize(),   //通过序列化的数据，提交到php然后到转回到自己的页面
				success:function(data){
					if(data == 1){  //说明添加了一段数据到数据库
						$('#loading').css('display','none');
						// alert('成功');
						$('#success').css('display','block').center(200,40);

						$('#success p').html('注册成功请登录！');

						setTimeout(function() {
							$('#success').css('display','none'); //注册成功提醒要消失

							//注册页面消失
							reg.css('display','none');

							//这里出现一个问题第一次提交的时候注册的时候虽然消失了但是当你继续点开注册的时候数据还在注册页上
							$('#reg .succ').css('display','none');
							$('form').eq(0).first().reset();  //表单重置清除表单

							//出现另外一个问题重复提交，必须禁止。当浏览器还没告知用户注册成功的时候用户会不停点击注册这个时候我们必须禁止重复提交

							_this.disabled = false;
							$(_this).css('backgroundPosition','left');

							//锁屏的消失
							screen.animate({
								attr : 'o',
								target : 0,
								t : 30,
								step : 10,
								fn : function(){
									screen.unlock();
								}
							});

						},1500);
					}
				},
				async : true
			})  
		 }
	}); 
	
	//56 当登陆也出现一个表单的时候就会和注册那一页面的表单相冲突。所以我们必须找到注册的form 。 将 $('form').eq(0)全部替换成$('form').eq(0).eq(0)                 
	$('form').eq(1).form('sub').click(function() {

		//第一种当用户名或者密码不合法的情况下直接本地验证
		if( /[\w]{2,20}/.test(trim($('form').eq(1).form('user').value())) && $('form').eq(1).form('pass').value().length >= 6){
			var _this = this;

			$('#loading').css('display','block').center(200,40);
			$('#loading p').html('正在尝试登陆中...');

			_this.disabled = true;
			$(_this).css('backgroundPosition','right');
			//当数据合法在通过ajax进行验证
			ajax({ 
				method : 'post',
				url : './js/is_login.php',
				data : $('form').eq(1).serialize(),   
				success:function(text){

					$('#loading').css('display','none');

					if(text==1){ //用户名或者密码不正确
						$("#login .info").html('登陆失败: 用户名或者密码错误！');
					}else{ //用户名和密码成功
						$("#login .info").html('');
						$('#success').css('display','block').center(200,40);
						$('#success p').html('登陆成功');

						//登陆成功后
						setCookie('user',trim($('form').eq(1).form('user').value()));

						setTimeout(function() {
							$('#success').css('display','none'); //注册成功提醒要消失

							//页面消失
							login.css('display','none');

							$('form').eq(1).first().reset();  //表单重置清除表单
							screen.animate({
								attr : 'o',
								target : 0,
								t : 30,
								step : 10,
								fn : function(){
									screen.unlock();
								}
							});
						},1500);
					}

					_this.disabled = false;
					$(_this).css('backgroundPosition','left');

					$('#header .reg').css('display','none');
					$('#heder .login').css('display','none');

					$('#header .info').css('display','block').html(getCookie('user'));

					
				},
				async : true
			})  	

		}else{
			$('#login .info').html('登陆失败：用户名或密码不合法！');
		}
	})

	//57 发表博文 弹窗
	var blog = $('#blog');
	blog.center(580, 320).resize(function () {
		if (blog.css('display') == 'block') {
			screen.lock();
		}
	});
	$('#header .member a').eq(0).click(function () {
		blog.center(580, 320).css('display', 'block');
		screen.lock().animate({
			attr : 'o',
			target : 30,
			t : 30,
			step : 10
		});
	});
	$('#blog .close').click(function () {
		blog.css('display', 'none');
		screen.animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10,
			fn : function () {
				screen.unlock();
			}
		});
	});

	//博文框拖拽
	blog.drag($('#blog h2').last());

	//这里是整个页面的第三个form表单
	$('form').eq(2).form('sub').click(function() {

		if(trim($('form').eq(2).form('title').value()).length <= 0 || trim($('form').eq(2).form('content').value()).length <= 0 ){
				
			$('#blog .info').html('发表失败：标题或内容不能为空！')	

		}else{
			var _this = this;

			$('#loading').css('display','block').center(200,40);
			$('#loading p').html('正在发表博文');

			_this.disabled = true; 
			$(_this).css('backgroundPosition','right');

			ajax({
				method : 'post',
				url : './js/add_artical.php',
				data : $('form').eq(2).serialize(),   
				success:function(text){
					if(text == 1){  //说明年月日都选择了明添加了一段数据到数据库
						$('#blog .info').html('');
						$('#success').css('display','block').center(200,40);

						$('#success p').html('发表成功！');

						setTimeout(function() {
							$('#success').css('display','none'); 

							blog.css('display','none');

							$('form').eq(2).first().reset();  
							
							screen.animate({
								attr : 'o',
								target : 0,
								t : 30,
								step : 10,
								fn : function(){
									screen.unlock();
								}
							});

							$('#loading').css('display','none');
						},1500);
					}
					_this.disabled = false;
					$(_this).css('backgroundPosition','left');
				},
				async : true
			})	
		}

	})

	//更换皮肤
	$('#skin').center(650,360).resize(function() {
		if($('#skin').css('display') == 'block'){
			screen.lock();
		}
	});
	$('#header .member a').eq(1).click(function() {
		$('#skin').center(650,360).css('display','block');
		screen.lock().animate({
			attr : 'o' ,
			target : 30,
			t : 30,
			step : 10
		});
		//56
		//加载动画显示效果
		$('#skin .skin_bg').html('<span class="loading"></span>');

		ajax({
			method : 'post',
			url : './js/get_skin.php',
			data : {
				type : 'all'        //在后台判断当type等于all的时候使用下面这个ajax
			},
			success : function(text) {
				//获取text后台传送的数据 json格式
				var json = JSON.parse(text); //转换成js对象
				var html = '';
				for(var i = 0;i<json.length;i++) {
					html += '<dl><dt><img src="./blog/images/'+ json[i].small_bg +'" big_bg= "'+json[i].big_bg+'"bg_color ="'+json[i].bg_color+'"   alt="" ></dt><dd>'+json[i].bg_text+'</dd></dl>'
					
				}
				// $('#skin .skin_bg').html(html); 为显示的过程添加一个动画过程
				$('#skin .skin_bg').html(html).animate({
					attr : 'o',
					target : 100,
					t : 30,
					step : 10
				});

				//当每张图片显示的时候
				$('#skin dl dt img').click(function() {
					// alert($(this).attr('big_bg'));
					$('body').css('background',$(this).attr('bg_color')+' '+'url(./blog/images/' +$(this).attr('big_bg') +') repeat-x'   )
				
					//60
					ajax({
						method : 'post',
						url : './js/get_skin.php',
						data : {
							'type' : 'set',
							'big_bg' : $(this).attr('big_bg')
						},
						success : function(text) {
							// alert(text); 弹出1说明  数据库的flag也被修改了
							$('#success').css('display','block').center(200,40);
							$('#success p').html('皮肤更换成功');
							setTimeout(function()　{
								$('#success').css('display','none');
							},1000)
						},
						async : true
					});

				})
			},
			async : true
		});

	//在这里我们要处理一个就是选择一个默认皮肤放在数据库中
	});
	
	$('#skin .close').click(function() {
		$('#skin').css('display','none');
		screen.animate({
			attr : 'o' ,
			target : 0 ,
			t : 30 ,
			step : 10,
			fn : function() {
				screen.unlock();
			}
		});
	});

	//拖拽
	$('#skin').drag($('#skin h2').last());

	// 永久保存这个皮肤的样式
	ajax({
		method : 'post',
		url : './js/get_skin.php',
		data : {
			type : 'main'   //当type等于main的时使用下面这个
		},
		success : function(text) {
			// alert(text); 得到默认的flag=1的bg_color属性
			var json = JSON.parse(text);

			$('body').css('background',json.bg_color+' '+'url(./images/' + json.big_bg +') repeat-x' );

		},
		async : true
	});
});












