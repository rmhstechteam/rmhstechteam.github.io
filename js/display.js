<!-- executed on page load -->
$(document).ready(function() {
	
	// Initializes Parse
	Parse.initialize('buR26CrKO6LiBsNmnsjWcn1pegKmlT0rjE275uTT', 'mmLhuPQYFFrIaJn0GGwjoLJrQGZZuACvSLpPrKhb');
	
	// Defines Parse Object Array
	var object = {};
	
	// Defines Data Query
	var query = new Parse.Query('_User');
	
	function update() {	
	
		query.ascending('lastName');
		
		query.find ({
		
			success: function(results) {
		
			// Creates Table in Document
			var table = document.createElement('table');
			table.className = 'table';
		
			var row = table.insertRow(0);
			
			// Sets Staff Label
			var text = 'Staff';
			
			var cell = row.insertCell(0);
			
			cell.textContent = text;
			
			// Sets Availability Label
			text = 'Availability';
			
			cell = row.insertCell(1);
			
			cell.textContent = text;
			
			// Sets Note Label
			text = 'Note';
			
			cell = row.insertCell(2);
			
			cell.textContent = text;
		
			// Loops through Query
			for(var i = 0; i < results.length; i = i + 1) {
		
				// Stores Results
				object = results[i];
				
				// Sets Text to Last Name, First Name
				text = object.get('lastName') + ', ' + object.get('firstName');
				
				row = table.insertRow(i + 1);
				
				cell = row.insertCell(0);
				
				cell.textContent = text;
				
				// Sets Text to Availability
				text = object.get('availability');
				
				// Gets Location
				var location = object.get('location');
		
				if(text == 'Available') {
				 
					var image = document.createElement('img');
				   
					image.src = 'img/Green Circle.png';
					image.width = '30';
					image.height = '30';
				   
					cell = row.insertCell(1);
				   
					cell.appendChild(image);
				 
				} else if(text == 'Unavailable' && location == 'Out of Building') {
				 
					var image = document.createElement('img');
				   
					image.src = 'img/Red Circle.png';
					image.width = '30';
					image.height = '30';
				   
					cell = row.insertCell(1);
				   
					cell.appendChild(image);
				 
				} else {
				
					var image = document.createElement('img');
				   
					image.src = 'img/Yellow Circle.png';
					image.width = '30';
					image.height = '30';
				   
					cell = row.insertCell(1);
				   
					cell.appendChild(image);
				
				}
		
				// Sets Text to Note
				text = object.get('note');
				
				cell = row.insertCell(2);
				
				cell.textContent = text;
		   
			}
		
			document.getElementById('table').appendChild(table);
		
			setTimeout(function() {
		
					document.getElementById('table').removeChild(table);
		
				}, 60000);
		
			},
		
			failure: function(error) {
		
				alert('Something Went Wrong');
		
			}
		
		});
		
	}
	
	update();

	<!-- updates every 60 seconds -->
	window.setInterval(function() {
	
		update();
	
	}, 60000);
	
	<!-- to bottom processing -->
	function toBottom() {
	
		$('html, body').animate({ scrollTop: $(document).height()-$(window).height() }, 8000);
	
	}
	
	<!-- to top processing -->
	function toTop() {
	
		$('html, body').animate({
		
			scrollTop: $('.container-fluid').offset().top
		
		}, 8000);
	
	}
	
	<!-- scrolls top to bottom every 16 seconds -->
	window.setInterval(function() {
	
		toBottom();
	
		setTimeout(function() {
		
			toTop();
		
		}, 8000);
	
	}, 16000);
	
});