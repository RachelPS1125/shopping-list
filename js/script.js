$(document).ready(function(){
	$('.list-items').html(localStorage.my_list);
	var totalItems = parseInt(localStorage.total_items) || 0;
	var boughtItems = 0;
	updateCounterTotal();
	function saveToLocal(){
		localStorage.my_list = $('.list-items').html();
		localStorage.total_items = totalItems;
	}
	function updateCounterTotal(){
		$('.total-items').text(totalItems);
	}
	function updateCounterBought(){
		boughtItems = $(':checkbox:checked').length;
		$('.bought-items').text(boughtItems);
	}
	function addItem(){
		var item = $('input').val();
		if (!item) {
			alert('Please enter a list item');
		}
		else{
		$('.list-items').prepend('<li class="list"><input class="check" type="checkbox"/>'+item+'<button class="delete-button">Delete</button></li>');
		$('.text').val('');
		totalItems = totalItems+1;
		updateCounterTotal();
		saveToLocal();
		}
	}
	function hideLine(){
		console.log('test');
		if ($(':checkbox:checked')){  //cannot get this to work
			$(this).addClass('.hidden'); //abondoning for now
		}
	}

	$('.add').click(addItem);
	$('input').keydown(function(event){
		if (event.keyCode === 13){
			addItem();
		}
	})

	$('.list-items').on('click', '.check', function () {
		$(this).parent().toggleClass('checked');
		updateCounterBought();
		saveToLocal();
	})
	$('.list-items').on('click', '.delete-button', function () {
		$(this).parent().remove();
		totalItems = totalItems-1;
		updateCounterTotal(); 
		updateCounterBought();
		saveToLocal();
	})
	$('.hide').click(hideLine);
});
