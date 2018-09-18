
$(function(){

	/********云朵循环*********/ 

	$('.cloud').velocity(
		{
			'left':'-1000px'
		},
		{
			duration:10000,
			loop:true
		}
	);



	/********图片加载*********/ 

	var pics = ["../public/img/answer_allopen_bg.png","../public/img/answer_bg.jpg","../public/img/answer_bg.png","../public/img/answer_cat.png","../public/img/answer_correct.png","../public/img/answer_failed_bg.png","../public/img/answer_rui.png","../public/img/answer_success_bg.png","../public/img/answer_wen.png","../public/img/answer_wrong.png","../public/img/answer_zhi.png","../public/img/answer_zhong.png","../public/img/choose_bg.png","../public/img/choose_boy.png","../public/img/choose_girl.png","../public/img/cover_bg.png","../public/img/cover_clou1.png","../public/img/cover_clou2.png","../public/img/cover_clou3.png","../public/img/cover_clou4.png","../public/img/cover_text.png","../public/img/leaf1.png","../public/img/leaf2.png","../public/img/leaf3.png","../public/img/loading.png","../public/img/loading_bg.png","../public/img/loading_cloud.png","../public/img/mainscene_bg.png","../public/img/mainscene_rui.png","../public/img/mainscene_rui_bi.png","../public/img/mainscene_table.png","../public/img/mainscene_tips1.png","../public/img/mainscene_tips2.png","../public/img/mainscene_tips3.png","../public/img/mainscene_tips4.png","../public/img/mainscene_upgrade.png","../public/img/mainscene_wen.png","../public/img/mainscene_wen_zhi.png","../public/img/mainscene_xing.png","../public/img/mainscene_xing_cat.png","../public/img/mainscene_zhi.png","../public/img/mainscene_zhi_hua.png","../public/img/mainscene_zhong.png","../public/img/mainscene_zhong_bian.png","../public/img/me_bottom.png","../public/img/me_close.png","../public/img/memorial_1.png","../public/img/memorial_2.png","../public/img/memorial_3.png","../public/img/memorial_4.png","../public/img/memorial_bg.png","../public/img/memorial_up_btn.png","../public/img/ms_chakanzouzhang.png","../public/img/ms_guifei.png","../public/img/ms_huangdi.png","../public/img/ms_nvwang.png","../public/img/ms_taijian.png","../public/img/ms_xianling.png","../public/img/ms_xiaojie.png","../public/img/ms_xiaozhu.png","../public/img/ms_yatou.png","../public/img/ms_yayi.png","../public/img/ms_zaixiang.png","../public/img/pop_renwu_bg.png","../public/img/share.jpg","../public/img/share.png","../public/img/share_btn.png","../public/img/upgrade_btn.png"];
	var pics_length = pics.length;

	var index = 0;

	for(var i=0;i<pics_length;i++){
		var img = new Image();  //创建一个Image对象，实现图片的预下载     
		img.src = pics[i];
		img.onload = function(){
			index++;
			var percent = Math.floor(index/pics_length*100);
			$('.loading-text-wrap .percent').text(percent+'%');
			if(percent == 100){
				setTimeout(function(){
					$('.loading').hide();
					$('.cover').show();
					setTimeout(function(){
						$('.cover').hide();
						$('.choose').show();
					},9000)
				},1000)
			}
		}
	}


	/********选择男女*********/ 

	$('.choose,.main').on('click','.ac_choose',function(){
	    var $t = $(this);
	    var $li = $(this).closest('li');
	    var index = $li.index();
	    console.log(index);
	    $li.next().show();
	    $li.closest('ul').css({'transform':'translateY('+-$(window).height()*index+'px)'});

	 });


	/********答题数据渲染并判断对错*********/ 

	var data = {
		question:"1、如果《大家》的文章每被阅读一次，就给你一元钱，你现在是个什么级别的富人？",
		options:{
			A:'A、亿万富翁',
            B:'B、百万富翁',
            C:'C、穷光蛋'
		},
		correct:"B"
	}

	$('.answer-box .title').text(data.question); //把数据中的问题渲染到页面中
	
	var map = {0:'A',1:'B',2:'C'}  //映射，相互对应
	$('.answer-box .opt span').each(function(index,item){  //index是key值，item是它的value,这里的item就是span
		console.log(item);
		var $item = $(item);
		$item.text(data.options[map[index]]);
		$item.closest('.opt').data('opt',map[index]);
	})

	$('.answer-box').data('correct',data.correct);	

	$('.answer-box .opt').on('click',function(){
		if( $(this).data('opt') == $('.answer-box').data('correct') ){
			$('.animation-correct',$(this)).velocity('fadeIn',{complete:function(){
				$('.tips_success').velocity('fadeIn',{complete:function(){
					setTimeout(function(){
						$('ul').css({'transform':'translateY('+-$(window).height()+'px)'})
						$('.tips_success,.animation-correct').hide();
					},1000)
				}})
			}});
		}else{
			$('.animation-wrong',$(this)).velocity('fadeIn',{complete:function(){
				$('.tips_failed').velocity('fadeIn',{complete:function(){
					setTimeout(function(){
						$('ul').css({'transform':'translateY('+-$(window).height()+'px)'})
						$('.tips_failed,.animation-wrong').hide();
					},1000)
				}})
			}});
		}
	})





})