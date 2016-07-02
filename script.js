var arr = (Cookies.get('basket') !== undefined) ? Cookies.getJSON('basket') : []; // воспроизвести содержимое корзины
var basket,
item = $('.item'),
more,
less,
remove;

$(document).ready(buildBasket);

$('.item').click(function(){
	addToBasket($(this));
	buildBasket();
});

function resetCookies(){												// перезаписать содержимое корзины
	Cookies.set('basket', JSON.stringify(arr));
}

function Item(itName,itIcon,itPrice) {
	var newItem = {name:itName, quantity:1, icon:itIcon, price:itPrice};
	return newItem;
}

function addToBasket(item){												// Добавить обьект элемента в массив корзины
	var iconPath = item.find('.icon img').attr('src'), 			// изображение
	i_name = item.find('.i-name').text(),						// имя
	price = parseFloat(item.find('.i-price strong').text());	// цена
	var addItem = new Item(i_name,iconPath,price);
	add(arr,i_name,iconPath,price);
}

function buildBasket(){
	var html = '';
	for (var i = 0 ; i < arr.length; i++){
		 html += '<div class="b-item">'+
						'<div class="b-icon"><img src="'+ arr[i].icon +'" alt=""></div>'+
						'<div class="b-text">'+
							'<div class="b-name">' + arr[i].name +
								'<strong class="quantity">'+
									'<input type="number" value="' + arr[i].quantity + '">'+
								'</strong></div>'+
							'<div class="remove"></div>'+
							'<div class="b-price"><strong>' + arr[i].price + '</strong> EUR</div>'+
							'<div class="arrows">'+
								'<span class="more"></span>'+
								'<span class="less"></span>'+
							'</div>'+
						'</div>'+
					'</div>';
	}
	$('#basket').empty().append(html);
}

function add(array,addName,addIcon,addPrice) {                          // добавить единицу эелемента
	var itemExists = false;                            					// (или создать)
	for (var i = 0 ; i < array.length ; i++){
	    if(array[i].name === addName){
	    	array[i].quantity += 1;
	    	itemExists = true;
	    	break;
	    } 
	}
	if (!itemExists) {
		var item = new Item(addName,addIcon,addPrice);
		arr.push(item);
	}
	resetCookies();
	return array;
}

function del(array, delName){                          // удалить элемент
	for (var i = 0 ; i < array.length ; i++){
	    if(array[i].name === delName){
	    var deleted = array.splice(i,1);
	    }
	}
	//console.log(delName + " was deleted.");
	resetCookies();
	return array;
}

function more (array, moreName) {                      // добавить единицу количества элемента
	for (var i = 0 ; i < array.length ; i++){
		if(array[i].name === moreName){
			array[i].quantity +=1;
		}
	}
	resetCookies();
	return array;
}

function less (array, lessName) {                     // убрать единицу количества элемента
	for (var i = 0 ; i < array.length ; i++){         // (или удалить элемент)
		if(array[i].name === lessName){
			array[i].quantity -=1;
			if(array[i].quantity < 1) {
				del(array,lessName);
			}
		}
	}
	resetCookies();
	return array;
}

function setQuan (array, qName, quan) {              // установить значение каличества для элемента
	for (var i = 0 ; i < array.length ; i++){
		if(array[i].name === qName) {
			quan = (quan) ? quan : array[i].quantity;
			array[i].quantity = quan;
		}
	}
	resetCookies();
	return array;
}