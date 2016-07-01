var arr = (Cookies.get('basket') !== undefined) ? Cookies.getJSON('basket') : [], // воспроизвести содержимое корзины
basket,
item = $('.item'),
more,
less,
remove;

$('.item').click(function(){
	addToBasket($(this));
});

function resetCookies(){
	Cookies.set('basket', JSON.stringify(arr));        // перезаписать содержимое корзины
}

function addToBasket(item){
	var iconPath = item.find('.icon img').attr('src'),
	name = item.find('.i-name').text(),
	price = parseFloat(item.find('.i-price strong').text());
	var addItem = new Item(name, iconPath, price);
	add(arr,name)
	return arr;
}

function Item(itName, itIcon, itPrice) {
	var newItem = {name:itName, quantity:1, icon:itIcon, price:itPrice};
	return newItem;
}

function add(array,addName) {                          // добавить единицу эелемента
	var itemExists = false;                            // (или создать)
	for (var i = 0 ; i < array.length ; i++){
	    if(array[i].name === addName){
	    	array[i].quantity += 1;
	    	itemExists = true;
	    	break;
	    } 
	}
	if (!itemExists) {
		var item = new Item(addName);
		arr.push(item);
	}
	resetCookies();
	return array;
}

function biudBasket(){
	for (var i = 0 ; i < arr.length ; i++){
		var html = '<div class="b-item">'+
						'<div class="b-icon"><img src="'+ IMG +'" alt=""></div>'+
						'<div class="b-text">'+
							'<div class="b-name">' + NAME +
								'<strong class="quantity">'+
									'<input type="number" value="' + QUANTITY + '">'+
								'</strong></div>'+
							'<div class="arrows">'+
								'<span class="more"></span>'+
								'<span class="less"></span>'+
							'</div>'+
							'<div class="remove"></div>'+
							'<div class="b-price"><strong>' + PRICE + '</strong> EUR</div>'+
						'</div>'+
					'</div>';
	}
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
			array[i].quantity = quan;
		}
	}
	resetCookies();
	return array;
}