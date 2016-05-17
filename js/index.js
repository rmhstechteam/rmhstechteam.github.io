<!-- loads saved credentials -->
function loadCredentials() {
	
	var email = localStorage.email;
	var password = localStorage.password;
	var isChecked = localStorage.isChecked;
  
	if(isChecked == 'yes') {
		
		$('#remember').prop('checked', true)
	
		document.getElementById('login-form-email').value = email;
		document.getElementById('login-form-password').value = password;
  
	} else {
		
		$('#remember').prop('checked', false)
	
		document.getElementById('login-form-email').value = '';
		document.getElementById('login-form-password').value = '';
  
	}
	
}

<!-- format name -->
function formatName(string) {
	
	return string.charAt(0).toUpperCase() + string.slice(1);
	
}

<!-- executed on page load -->
$(document).ready(function() {
	
	<!-- scrolls to top of page -->
	$(this).scrollTop(0);
	
	<!--initalizes parse -->
	Parse.initialize('buR26CrKO6LiBsNmnsjWcn1pegKmlT0rjE275uTT', 'mmLhuPQYFFrIaJn0GGwjoLJrQGZZuACvSLpPrKhb');
	
	<!-- logs current user out -->
	Parse.User.logOut();

  	<!-- loads credentials -->
	loadCredentials();
	
	<!-- loads wrapper -->
	$('.wrapper').fadeIn(750);
	
	<!-- sets timeout -->
	setTimeout(function() {

 	}, 750);
	
});

<!-- toggles forgot form -->
$('.message-forgot-something a').click(function(event) {
	
	event.preventDefault();
	
	document.getElementById('forgot-form-email').value = '';

	$('#forgot-form').animate ({
	
		height: 'toggle',
		opacity: 'toggle',
	
	}, 'slow');
	
	$('#login-form').hide ({
	
	}, 'slow');
	
	$('#register-form').hide ({
	
	}, 'slow');

});

<!-- toggles log in form -->
$('.message-already-registered a').click(function(event) {

	event.preventDefault();
	
	document.getElementById('login-form-email').value = '';
 	document.getElementById('login-form-password').value = '';
	
	$('#login-form').animate ({
	
		height: 'toggle',
		opacity: 'toggle',
	
	}, 'slow');
	
	$('#forgot-form').hide ({
	
	}, 'slow');
	
	$('#register-form').hide ({
	
	}, 'slow');

});

<!-- toggles register form -->
$('.message-not-registered a').click(function(event) {

	event.preventDefault();
	
	document.getElementById('register-form-firstName').value = '';
	document.getElementById('register-form-lastName').value = '';
	document.getElementById('register-form-email').value = '';
	document.getElementById('register-form-password').value = '';
	document.getElementById('register-form-confirmPassword').value = '';
	document.getElementById('forgot-form-email').value = '';
	
	$('#register-form').animate ({
	
		height: 'toggle',
		opacity: 'toggle',
	
	}, 'slow');
	
	$('#forgot-form').hide ({
	
	}, 'slow');
	
	$('#login-form').hide ({
	
	}, 'slow');

});

<!-- report issue link -->
$('.message-report-issue a').click(function(event) {
	
	  event.preventDefault();
	
	  window.open('https://github.com/rmhstechteam/rmhstechteam.github.io/issues');

});

<!-- register processing -->
$('#register-form-create').click(function(event) {
	
	event.preventDefault();
	
	var firstName = formatName(document.getElementById('register-form-firstName').value);
	var lastName = formatName(document.getElementById('register-form-lastName').value);
	var email = document.getElementById('register-form-email').value;
	var password = document.getElementById('register-form-password').value;
	var confirmPassword = document.getElementById('register-form-confirmPassword').value;
	
	email = email.toLowerCase();
	
	if(firstName != '' && lastName != '' && email != '' && password != '' && confirmPassword != '') {
	
		if(password != confirmPassword) {
	
			$('#alert-warning-password-mismatch').hide();
			$('#alert-warning-password-mismatch').show().delay(5000).slideUp();
		
			document.getElementById('register-form-password').value = '';
			document.getElementById('register-form-confirmPassword').value = '';
	
		} else {

			var user = new Parse.User();
		
			user.set('firstName', firstName);
			user.set('lastName', lastName);
			user.set('password', password);
			user.set('email', email);
			user.set('username', email);
			user.set('availability', 'Unavailable');
			user.set('location', 'Out of Building');
			user.set('lastUpdated', moment().format('MMMM Do, YYYY, h:mm A'));
			user.set('note', '');
		
			user.signUp(null, {
		
				success: function(user) {
		
					$('#alert-warning-sign-up-success').hide()
					$('#alert-warning-sign-up-success').show().delay(5000).slideUp();
					
					document.getElementById('register-form-firstName').value = '';
					document.getElementById('register-form-lastName').value = '';
					document.getElementById('register-form-email').value = '';
					document.getElementById('register-form-password').value = '';
					document.getElementById('register-form-confirmPassword').value = '';
		
					$('#login-form').animate ({
					
						height: 'toggle',
						opacity: 'toggle',
					
					}, 'slow');
					
					$('#forgot-form').hide ({
					
					}, 'slow');
					
					$('#register-form').hide ({
					
					}, 'slow');
					
				},
		
				error: function(user, error) {
					
					$('#alert-warning-register-error').hide()
					$('#alert-warning-register-error').show().delay(5000).slideUp();
			
				}
		
			});
	
		}
	
	} else {
	
		$('#alert-warning-all-fields-required').hide()
		$('#alert-warning-all-fields-required').show().delay(5000).slideUp();
	
	}
	
});

<!-- reset password processing -->
$('#forgot-form-reset-password').click(function(event) {
	
	event.preventDefault();
	
	var email = document.getElementById('forgot-form-email').value;
	
	if(email == '') {
	
		$('#alert-warning-all-fields-required').hide()
		$('#alert-warning-all-fields-required').show().delay(5000).slideUp();
	
	} else {
	
		Parse.User.requestPasswordReset(email, {
		
			success: function() {
			
				$('#alert-warning-reset-successful').hide()
				$('#alert-warning-reset-successful').show().delay(5000).slideUp();
				
				document.getElementById('forgot-form-email').value = '';
			
			},
			
			error: function(error) {
			
				$('#alert-warning-invalid-email').hide()
				$('#alert-warning-invalid-email').show().delay(5000).slideUp();
				
				document.getElementById('forgot-form-email').value = '';
			
			}
		
		});
	
	}
	
});

<!-- log in processing -->
$('#login-form-login').click(function(event) {
	
	event.preventDefault();
	
	var email = document.getElementById('login-form-email').value;
	var password = document.getElementById('login-form-password').value;
	
	email = email.toLowerCase();
	
	Parse.User.logIn(email, password, {
	
		success: function(user) {
	
			localStorage.email = email;
			localStorage.password = password;
	
			if($('#remember').is(':checked') == true) {
	
				localStorage.isChecked = 'yes';
				
			} else {
				
				localStorage.isChecked = 'no';
				
			}
	
			$('.wrapper').fadeOut(750);
	
			setTimeout(function() {
	
				window.location.replace('dashboard.html');
	
				document.getElementById('login-form-email').value = '';
				document.getElementById('login-form-password').value = '';
	
			}, 750);
	
		},
	
		error: function(user, error) {
	
			$('#alert-warning-invalid-credentials').hide()
			$('#alert-warning-invalid-credentials').show().delay(5000).slideUp();
			
			document.getElementById('login-form-password').value = '';
	
		}
	
	});
	
});
