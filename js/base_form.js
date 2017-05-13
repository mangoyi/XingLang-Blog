$().extend('serialize', function () {
		for (var i = 0; i < this.elements.length; i ++) {

			var form = this.elements[i];  //得到第一个表单

			//创建一个数组
			// var parts = new Array();
			//但是我们需要的是对象
			var parts = {};

			// alert(form)  [object HTMLFormElement]
			// alert(form.elements) ;  //打印form里面的字段 [object HTMLFormControlsCollection]
			// alert(form.elements.length)   //11个字段
			for(var i =0; i<form.elements.length;i++) {

				var filed = form.elements[i];  //循环出来字段
				// alert(filed) 获取每一个字段的元素  共有11个
				// alert(filed.type)  //获取每个表单的类型 text select-one password

				switch(filed.type){

					case undefined :
					case 'submit' :
					case 'reset' :
					case 'file' :
					case 'button' :
					break;   //不让上面几个类型的表单元素提交
					case 'radio' :
					case 'checkbox' :
						if(!filed.selected){ //如果没有被选择，则不提交。只是提交选择了的
							break;
						}
					case 'select-one' :   //遇到单个选择和多个选择。如果有value值就是value值 如果没有就是text值就是option标签里面的内容。如果没有value值，ie8以及ie8一下都不可以获取到。显示为空
					case 'select-multiple' : 
						for(var j=0;j<filed.options.length;j++){
							var option = filed.options[j];
							if(option.selected) {           //如果没有value值显示text值，如果有value就使用value
								// parts.push(filed.name + '=' + option.value);  //就解决了ie8无法获取value的问题
								// parts.push(filed.name + '=' + option.text);  //就解决了ie8无法获取value的问题
								var optValue = '';
								// alert(option.hasAttribute);  //这里可以用来判断ie7 ie7以及ie7一下都是可以判断出option中有没有value值
								if(option.hasAttribute){
									optValue = (option.hasAttribute('value') ? option.value : option.text);  //如果有这个value值就使用value值否则是用text
								}else{ 
									optValue = (option.attributes('value').specified ? option.value : option.text); //针对ie7以下的版本，这个属性也是判断ie7以下的。这样ie7以下也就判断了
								}
								parts[filed.name] = optValue;


							}
						}
						break;

					default :   //我们把字段添加到数组中
						parts[filed.name] = filed.value;
				}

			}

			return parts;

		}
		return this;
});