$(document).ready(function(){
	var totalItems = parseInt(localStorage.total_items) || 0;
	var boughtItems = 0;
	function saveToLocal(){
		localStorage.my_list = $('.list-items').html();
		localStorage.total_items = totalItems;
	}
	function updateCounterTotal(){
		$('.total-items').text(totalItems);
	}
	function updateCounterBought(){
		boughtItems = $('.checked').length;
		$('.bought-items').text(boughtItems);
	}
	function addItem(){
		var item = $('input').val();
		if (!item) {
			alert('Please enter a list item');
		}
		else{
			var found = false;
			$.each($('.list'), (function(i,element){
				var checkAgainst = $(element).html();
				console.log(checkAgainst)
				if (checkAgainst.indexOf(item)>0){
					alert('This item is already on your list.')
					found = true;
					return false;
				}else{
					return false;
				}
			}))
			if (!found){
					$('.list-items').prepend('<li class="list"><input class="check" type="checkbox"/>'+item+'<button class="delete-button">Delete</button></li>');
					$('.text').val('');
					totalItems = totalItems+1;
					updateCounterTotal();
					saveToLocal();
			}
		}
	}
	function init(){
		$('.list-items').html(localStorage.my_list);
		$.each($('.checked'), function(i,item){
			var $item = $(item);
			if($item.hasClass('checked')){
				$item.children('.check').prop('checked', true);
			}
		})
		updateCounterBought();  
		updateCounterTotal();
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
	$('.hide').click(function(){	
		var checkedItem = $('.list-items').find('.checked');
		debugger;
		checkedItem.hide();
	})
	$('.show').click(function(){	
		var checkedItem = $('.list-items').find('.checked');
		checkedItem.show();
	})
	init();
});
