$(function(){

	//Pesquisa e formatação de valor da página de venda

	var currentValue = 0;
	var isDrag = false;
	var preco_atual = 0;
	var preco_maximo = 80000;

	$('.pointer-barra').mousedown(function(){
		isDrag = true;
	})

	$(document).mouseup(function(){
		isDrag = false;
		enableTextSelection();
	})

	$('.barra-preco').mousemove(function(e){
		if(isDrag){
			disableTextSelection();
			var elementBase = $(this);
			var mouseX = e.pageX - elementBase.offset().left;

			if(mouseX < 0){mouseX = 0;}
			if(mouseX > elementBase.width()){mouseX = elementBase.width();}

			$('.pointer-barra').css('left',(mouseX-11)+'px');
			currentValue = (mouseX / elementBase.width()) * 100;
			$('.barra-preco-fill').css('width',currentValue+'%');
			
			preco_atual = (currentValue/100) * preco_maximo
			preco_atual = formatarPreco(preco_atual);
			$('.preco_pesquisa').html('R$'+preco_atual);
		}
	})

	function formatarPreco(){
		preco_atual = preco_atual.toFixed(2);
		preco_array = preco_atual.split('.');

		var preco_novo = formatarTotal(preco_array);

		return preco_novo;
	}

	function formatarTotal(preco_array){
		if(preco_array[0] < 1000){
			return preco_array[0]+','+preco_array[1];
		}else if(preco_array[0] < 10000){
			return preco_array[0][0]+'.'+preco_array[0].substr(1,preco_array[0].length)+','+preco_array[1];
		}else if(preco_array[0] < 100000){
			return preco_array[0][0]+preco_array[0][1]+'.'+preco_array[0].substr(2,preco_array[0].length)+','+preco_array[1];
		}
	}

	function disableTextSelection(){
		$("body").css("-webkit-user-select","none");
		$("body").css("-moz-user-select","none");
		$("body").css("-ms-user-select","none");
		$("body").css("-o-user-select","none");
		$("body").css("user-select","none");
	}

	function enableTextSelection(){
		$("body").css("-webkit-user-select","auto");
		$("body").css("-moz-user-select","auto");
		$("body").css("-ms-user-select","auto");
		$("body").css("-o-user-select","auto");
		$("body").css("user-select","auto");

	}

	//Slider e Galeria da pagina de venda individual dos carros

	var imgShow = 3;
	var maxIndex = Math.ceil($('.mini-img-wraper').length/3) - 1;
	var curIndex = 0;

	initSlider();
	navigateSlider();
	clickSlider();
	
	function initSlider(){
		var amount = $('.mini-img-wraper').length * 33.3;
		var elScroll = $('.nav-galeria-wraper');
		var elSingle = $('.mini-img-wraper');

		elScroll.css('width',amount+'%');
		elSingle.css('width',33.3*(100/amount)+'%');
	}

	function navigateSlider(){
		$('.arrow-right-nav').click(function(){
			if(curIndex < maxIndex){
				curIndex++;
				var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
				$('.nav-galeria').animate({'scrollLeft':elOff});
			}else{
				//console.log("chegamos ao final");
			}
		});

		$('.arrow-left-nav').click(function(){
			if(curIndex > 0){
				curIndex--;
				var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
				$('.nav-galeria').animate({'scrollLeft':elOff});
			}else{
				//console.log("chegamos ao final");
			}
		});
	}

	function clickSlider(){
		$('.mini-img-wraper').click(function(){
			$('.mini-img-wraper').css('background-color','transparent');
			$(this).css('background-color','rgb(230,230,230)');
			var img = $(this).children().css('background-image');
			$('.foto-destaque').css('background-image',img);
		})

		$('.mini-img-wraper').eq(0).click();
	}

	// Menu mobile

	$('.mobile').click(function(){
		$(this).find('ul').slideToggle();
	})

	//Clique do menu contato

	var directory = '/Curso Web Master/Projetos/Projeto-5/';

	$('[goto=contato]').click(function(){
		location.href=directory+'index.html?contato';
		return false;
	})

	checkURL();

	function checkURL(){
		var url = location.href.split('/');
		var curPage = url[url.length-1].split('?');

		if(curPage[1] != undefined && curPage[1] == 'contato'){
			$('header nav a').css('color','black');
			$('footer nav a').css('color','white');
			$('[goto=contato]').css('color','#eb2d2d');
			$('html,body').animate({'scrollTop':$('#contato').offset().top});
		}
	}

	//Depoimentos slides e navegação

	var amountDepoimento = $('.depoimento-single > p').length;
	var curIndexDepoimento = 0;

	initDepoimentos();
	sliderDepoimentos();

	function sliderDepoimentos(){
		$('[next]').click(function(){
			curIndexDepoimento++;
				if(curIndexDepoimento >= amountDepoimento){
					curIndexDepoimento = 0;
				}
				$('.depoimento-single > p').hide();
				$('.nome-depoimento > p').hide();
				$('.depoimento-single > p').eq(curIndexDepoimento).show();
				$('.nome-depoimento > p').eq(curIndexDepoimento).show();
		})

		$('[prev]').click(function(){
			curIndexDepoimento--;
				if(curIndexDepoimento < 0){
					curIndexDepoimento = amountDepoimento-1;
				}
				$('.depoimento-single > p').hide();
				$('.nome-depoimento > p').hide();
				$('.depoimento-single > p').eq(curIndexDepoimento).show();
				$('.nome-depoimento > p').eq(curIndexDepoimento).show();
		})
	}

	function initDepoimentos(){
		$('.depoimento-single > p').hide();
		$('.nome-depoimento > p').hide();
		$('.depoimento-single > p').eq(0).show();
		$('.nome-depoimento > p').eq(curIndexDepoimento).show();
	}

})