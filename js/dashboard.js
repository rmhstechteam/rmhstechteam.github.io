<!-- loads dashboard -->
function loadDash() {
	
	var email = localStorage.email;
	var password = localStorage.password;
	var isChecked = localStorage.isChecked;
	
	Parse.User.logIn(email, password, {
	
		success: function(user) {
	
			if(isChecked == 'no') {
	
				localStorage.username = '';
				localStorage.password = '';
	
			}
	
			<!-- log in success -->
			var user = Parse.User.current();
			
			user.fetch( {
				
				success: function(user) {
					
					var firstName = user.get('firstName');
					var lastName = user.get('lastName');
					var availability = user.get('availability');
					var location = user.get('location');
					var lastUpdated = user.get('lastUpdated');
					
					if(availability == 'Available') {
					
						$('#availability-times').hide();
						$('#availability-check').show();
						$('#availability-button').val('Available');
					
					} else {
					
						$('#availability-check').hide();
						$('#availability-times').show();
						$('#availability-button').val('Unavailable');
					
					}
					
					if(location == 'In Building') {
					
						$('#location-times').hide();
						$('#location-check').show();
						$('#location-button').val('In Building');
					
					} else {
					
						$('#location-check').hide();  
						$('#location-times').show();
						$('#location-button').val('Out of Building');
					
					}
					
					$('.message-signed-in-as').text('Logged in as ' + firstName + ' ' + lastName);
					$('.message-last-updated').text('Last Updated on ' + lastUpdated);
					
				},
				
				failure: function(user, error) {
					
					setTimeout(function() { 
		
	      				window.location.replace('index.html');
	
        			}, 750);
					
				},
				
			});
	
			<!-- displays form -->
			$('#wrapper-loader').fadeOut(750);
	  
	    	setTimeout(function() { 
		
	      		$('#wrapper-form').fadeIn(750);
	  
	    		setTimeout(function() { 
	
        		}, 750);
	
        	}, 750);
	
		},
	
		error: function(user, error) {
	
			if(isChecked == 'no') {
	
				localStorage.username = '';
				localStorage.password = '';
	
			}
			
			<!-- log in failure -->
			$('#wrapper-loader').fadeOut(750);
	  
	    	setTimeout(function() { 
		
	      		window.location.replace('index.html');
	
        	}, 750);
	
		}
	
	});
	
}

<!-- executed on page load -->
$(document).ready(function() {
	
	<!-- scrolls to top of page -->
	$(this).scrollTop(0);
	
	<!--initalizes parse -->
	Parse.initialize('buR26CrKO6LiBsNmnsjWcn1pegKmlT0rjE275uTT', 'mmLhuPQYFFrIaJn0GGwjoLJrQGZZuACvSLpPrKhb');
	
	<!-- loads loader -->
	$('#wrapper-loader').fadeIn(750);
	
	setTimeout(function() { 
		
		<!-- loads dashboard -->
		loadDash();
	
    }, 750);
	
});

<!-- max characters catch -->
$('#comment').on('keyup',function() {

	var charCount = $(this).val().replace(/\s/g, '').length;
	
	if(charCount > 30) {
	
		var text = $('#comment').val();
	
		text = text.substring(0, text.length - 1);
	
		$('#comment').val(text);
	
		$('#alert-warning-max-characters').hide()
		$('#alert-warning-max-characters').show().delay(5000).slideUp();
	
	}

});

<!-- report issue link -->
$('.message-report-issue a').click(function(event) {
	
	event.preventDefault();
	
	window.open('https://github.com/rmhstechteam/rmhstechteam.github.io/issues');

});

<!-- availability button processing -->
$('#availability-button').click(function(event) {

	event.preventDefault();
	
	if($('#availability-button').val() == 'Available') {
	
		$('#availability-button').val('Unavailable');
		
		$('#availability-check').fadeOut(750);
	
		setTimeout(function() {
	
			$('#availability-times').fadeIn(750);
	
		}, 750);
	
	} else {
	
	$('#availability-button').val('Available');
	
	if($('#location-button').val() == 'Out of Building') {
	
		$('#availability-button').val('Unavailable');
		
			$('#availability-check').fadeOut(750);
	
			setTimeout(function() {
			
				$('#alert-warning-available-failure').hide();
				$('#alert-warning-available-failure').show().delay(5000).slideUp();  
				
				$('#availability-times').fadeIn(750);
			
			}, 750);
	
		} else {
	
			$('#availability-times').fadeOut(750);
	
			setTimeout(function() {
		
				$('#availability-check').fadeIn(750);
		
			}, 750);
	
		}
	
	}

});

<!-- location processing -->
$('#location-button').click(function(event) {

	event.preventDefault();
	
	if($('#location-button').val() == 'In Building') {
	
		$('#location-button').val('Out of Building');

		$('#location-check').fadeOut(750);
	
		setTimeout(function() {
		
			$('#location-times').fadeIn(750);
		
		}, 750);
	
		if($('#availability-button').val() == 'Available') {
	
			$('#availability-button').val('Unavailable');
	
			$('#availability-check').fadeOut(750);
	
			setTimeout(function() {
			
				$('#alert-warning-available-failure').hide();
				$('#alert-warning-available-failure').show().delay(5000).slideUp();
				
				$('#availability-times').fadeIn(750);
			
			}, 750);
	
		} else {
	
			$('#location-check').fadeOut(750);
	
			setTimeout(function() {
			
				$('#location-times').fadeIn(750);
			
			}, 750);
	
		}
	
	} else {
	
		$('#location-button').val('In Building');
		
		$('#location-times').fadeOut(750);
	
		setTimeout(function() {
		
			$('#location-check').fadeIn(750);
		
		}, 750);
	
	}

});

<!-- logs out user -->
$('#dashboard-form-log-out').click(function(event) {

	event.preventDefault();

	Parse.User.logOut();

	$('#wrapper-form').fadeOut(750);

	setTimeout(function() {

		$('#wrapper-loader').fadeIn(750);

		setTimeout(function() {

			$('#wrapper-loader').fadeOut(750);

			setTimeout(function() {

				window.location.replace('index.html');

			}, 750);

		}, 750);

	}, 750);

});

<!-- update processing -->
$('#update-button').click(function(event) {

	event.preventDefault();
	
	var user = Parse.User.current();
	var firstName = user.get('firstName');
	var lastName = user.get('lastName');
	var lastUpdated = user.get('lastUpdated');
	
	if($('#availability-button').val() == 'Available') {
	
		user.set('availability', 'Available');
	
	} else {
	
		user.set('availability', 'Unavailable');
	
	}
	
	if($('#location-button').val() == 'In Building') {
	
		user.set('location', 'In Building');
	
	} else {
	
		user.set('location', 'Out of Building');
	
	}
	
	user.set('note', $('#comment').val());
	user.set('lastUpdated', moment().format('MMMM Do, YYYY, h:mm A'));
	
	user.save(null, {
	
		success: function(user) {
	
			$('#wrapper-form').fadeOut(750);
			
			setTimeout(function() {
			
				$('.message-signed-in-as').text('Signed in as ' + firstName + ' ' + lastName);
				$('.message-last-updated').text('Last Updated on ' + moment().format('MMMM Do, YYYY, h:mm A'));
		
				$('#wrapper-loader').fadeIn(750);
		
				setTimeout(function() {
		
					$('#wrapper-loader').fadeOut(750);
		
					setTimeout(function() {
		
						$('#wrapper-form').fadeIn(750);
		
						setTimeout(function() {
		
							$('#alert-warning-update-success').hide()
							$('#alert-warning-update-success').show().delay(5000).slideUp();
		
						}, 750);
		
					}, 750);
		
				}, 750);
		
			}, 750);
		
		},
	
		error: function(error) {
		
			$('#alert-warning-update-failure').hide()
			$('#alert-warning-update-failure').show().delay(5000).slideUp();
		
		}
	
	});

});








