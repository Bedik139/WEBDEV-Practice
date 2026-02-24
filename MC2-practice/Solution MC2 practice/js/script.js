

// GIVEN: Create a User constructor
const User = function(name) {
				this.name = name;
				this.lname = this.name.toLowerCase();
				this.uname = this.name.toUpperCase();
				this.nav = "#nav-" + this.lname;
				this.img = "./images/user-" + name + ".png";
			}

// TODO: Create object constructors as you see fit
const Post = function(num, title, content, date, user) {
				this.num = num;
				this.title = num.toString() + ". " + title;
				this.content = content;
				this.date = date;
				this.strDate = date.toString().replace("T", " | Time: ");
				this.user = user;
			}

const Message = function(content, name, date) {
				this.content = content;
				this.name = name;
				this.date = date;
			}

// GIVEN: These will store all the posts/messages locally
let posts = [];
let messages = [];  // OPTIONAL: Use this if you will implement Messenger
let postCtr = 0;

// GIVEN: Do not change the values below
let currentUser = new User("Rachel");
let errorSep = "      ";
let errorTitle = "  Please write a title  ";
let errorContent = "  Please write a content  ";

// GIVEN: variables to check against Filter Select (the drop-down box)
let selectNone = "None";
let selectRachel = "Rachel";
let selectJack = "Jack";
let selectAshley = "Ashley";

document.addEventListener("DOMContentLoaded", function() {
	// GIVEN: Do not remove
	switchUser(currentUser);
	scrollToTop();
	toggleFilter();  // This functionality is already GIVEN

	// TODO: Set the Create Post's date to the current date
	let today = new Date();
	// Use the given "formatDate" function present in this file to convert "today" to the correct format
	let formattedDate = formatDate(today);
	document.querySelector("input#post-date").value = formattedDate;
	

	// .________________________________________________________________________.
	// ||																	   ||
	// || Fill up the element behaviours below, you may change it if necessary ||
	// ||______________________________________________________________________||
	// '																	    '

	// TODO: Complete the functionality when clicking Submit Post
	document.querySelector("#submit-post").addEventListener("click", function(e) {
		e.preventDefault();  // Prevents page refresh

		let name = currentUser.name;
		let user = new User(name);  // Create a user based on the current name

		let title = document.querySelector("input#post-title").value;
		let content = document.querySelector("textarea#post-body").value;
		let date = document.querySelector("input#post-date").value;

		
		if (validateFields(title, content)) {
			// HINT: If the number of Posts is ZERO, clear post-container first
			if (postCtr === 0) {
				document.querySelector("div#post-container").textContent = "";
			}
			resetFilter();
			postCtr = postCtr + 1;
			let post = new Post(postCtr, title, content, date, user);
			posts.push(post);

			refreshDisplay(posts);
			resetCreatePost();  // Reset the contents of Create Post
		}
	});

	// Called when Sort by Date button is clicked
	document.querySelector("div#sort-by-date").addEventListener("click", function(e) {
		sortByPostDate();
	});

	// Called when Filter button is clicked
	document.querySelector("div#filter")?.addEventListener("click", function(e) {
		toggleFilter();
	}); 

	// Called when Filter Drop-down value is changed
	document.querySelector("#select-users")?.addEventListener("change", function (e) {
		let selectedValue = this.value;
		applyFilter(selectedValue);
	});

	// Called when Sort by Date button is clicked
	document.querySelector("div#sort-by-order").addEventListener("click", function(e) {
		sortByPostOrder();
	});

	// Called when To Top button is clicked
	document.querySelector("div#to-top").addEventListener("click", function(e) {
		scrollToTop();
	});

	// NOTE: Change the function below if you want to implement Messenger
	// Called when Send Message button is clicked
	document.querySelector("#send-msg").addEventListener("click", function(e) {
		e.preventDefault();

	});


	// .__________________________________________________________.
	// ||														 ||
	// || Fill up the functions below, you may also add your own ||
	// ||________________________________________________________||
	// '														  '
	
	// TODO: Complete the validateFields() function below
	function validateFields(title, content) {
		if (title === "") {
			showError(errorTitle);
			return false;
		}
		if (content === "") {
			showError(errorContent);
			return false;
		}
		return true;
	}

	// TODO: Complete the sortByPostDate() function below
	function sortByPostOrder() {
		let post, number;
		let sortedPosts = [];
		for (i = 0; i < posts.length; i++) {
			post = posts[i];
			number = post.num;
			sortedPosts = posts.sort((a, b) => (a.num > b.num) ? 1 : - 1);
			//sortedPosts.splice(number, 0, post);
		}
		refreshDisplay(sortedPosts);
	}

	// TODO: Complete the sortByPostOrder() function below
	function sortByPostDate() {
		let post, num, date;
		let sortedPosts = [];
		let dates = [];
		sortedPosts = posts.sort((a, b) => (a.date > b.date) ? 1 : -1)
		refreshDisplay(sortedPosts);
	}

	// TODO: Complete the applyFilter() function below
	function applyFilter(selectedValue) {
		if (selectedValue === selectNone) {
			refreshDisplay(posts);
		}
		else {
			let post, name;
			let filteredPosts = [];
			for (j = 0; j < posts.length; j++) {
				post = posts[j];
				name = post.user.name;
				if (name === selectedValue) {
					filteredPosts.push(post);
				}
			}
			refreshDisplay(filteredPosts);
		}
	}

	// NOTE: I added this as a helper function
	function resetFilter() {
		let selectedValue = $("#select-users").val();
		applyFilter(selectedValue);
	}
	// TODO: Complete the scrollToTop() function below
	function scrollToTop() {
		window.scrollTo(0, 0);
	}

	// Refreshes the post-container according to the post contents of displayedPosts
	function refreshDisplay(displayedPosts) {
		if (displayedPosts.length === 0) {
			displayEmptyPosts();
		}
		else {
			displayPosts(displayedPosts);
		}
	}

	function displayPosts(newPosts) {
		clearPosts();
		for (i = 0; i < newPosts.length; i++) {
			displayPost(newPosts[i]);
		}
	}
	
	// NOTE: I added this as a helper function
	function displayEmptyPosts() {
		document.querySelector("div#post-container").textContent = "<p class='filler-text'>▓▒░(°◡°)░▒▓<br>Wow such empty...</p>";
	}

	// NOTE: I added this as a helper function
	function clearPosts() {
		document.querySelector("div#post-container").innerText = "";
	}

	function displayPost(newPost) {
		let user = newPost.user;
		const post = "<div class='single-post-main'>" +
						"<div class='single-post'>" +
							"<div class='sp-left'>" +
								"<img class='sp-picture' src='" + user.img + "'>" +
							"</div>" +
							"<div class='sp-right'>" +
								"<div class='sp-right-content'>" +
									"<div class='sp-title'>" + newPost.title + "</div>" +
									"<div class='sp-body'>" + newPost.content + "</div>" +
									"<div class='sp-right-bottom'>" +
										"<div class='sp-name'>" + user.name + "</div>" +
										"<div class='sp-date'>" + newPost.strDate + "</div>" +
									"</div>" +
								"</div>" +
							"</div>" +
						"</div>" +
					"</div>";

		document.querySelector("div#post-container").innerHTML += post;
		/*
		let post = $("<div>" +
						"<div>" +
							"<div>"
								"<img src='" + user.img + "'>" +
							"</div>" +
							"<div>" +
								"<div>" +
									"<div>" + newPost.title + "</div>"
									"<div>" + newPost.content + "</div>"
									"<div>"
										"<div>" + user.name + "</div>"
										"<div>" + newPost.strDate + "</div>"
									"</div>" +
								"</div>" +
							"</div>" +
						"</div>" +
					"</div>");

		// variable classes below doesn't have the first DIV class name and the IMG class name
		let classes = ["single-post", "sp-left", "sp-right",
						"sp-right-content", "sp-title", "sp-body",
						"sp-right-bottom", "sp-name", "sp-date"];

		$(post).find("div").each(function (i) {
			// .find() doesn't include the first DIV, so the condition below handles that
			if (i === 0) {
				$(this).parent().addClass("single-post-main");
			}
			$(this).addClass(classes[i]);
		});

		$(post).find("img").addClass("sp-picture");

		$("div#post-container").append(post);
		*/
	}

	function resetCreatePost() {
		document.querySelector("#post-title").value = "";
		document.querySelector("#post-body").value = "";
		let today = formatDate(new Date);
		document.querySelector("#post-date").value = today;
	}
	

	// ._____________________________________.
	// ||									||
	// || Do not change the functions below ||
	// ||___________________________________||
	// '									 '
	function formatDate(today) {  // GIVEN: For date formatting
		let formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0) + 'T' + today.getHours().toString().padStart(2, 0) + ':' + today.getMinutes().toString().padStart(2, 0);
		return formattedDate;
	}
	document.querySelector("input#post-title").addEventListener("click", function(e) {  // GIVEN: For error handling
		hideError();
	});
	document.querySelector("textarea#post-body").addEventListener("click", function(e) {
		hideError();
	});
	function hideError() {
		document.querySelector("#post-error").innerHTML = "";
	}
	function showError(errorText) {
		document.querySelector("#post-error").innerHTML = errorSep + "[ERROR]    " + "<span>" + errorText + "</span>" + "    !     ";
	}
	document.querySelector("#nav-rachel").addEventListener("click", function(e) {  // GIVEN: For user switching
		let user = new User("Rachel");
		switchUser(user);
	});
	document.querySelector("#nav-jack").addEventListener("click", function(e) {
		let user = new User("Jack");
		switchUser(user);
	});
	document.querySelector("#nav-ashley").addEventListener("click", function(e) {
		let user = new User("Ashley");
		switchUser(user);
	});	
	function switchUser(newUser) {
		showAllUsers();
		document.querySelector("#nav-current-name").textContent = newUser.name;
		document.querySelector("#nav-selected").src = newUser.img;
		showAllUsers();
		document.querySelector(newUser.nav).hidden = true;
		currentUser = newUser;
	}
	function showAllUsers() {
		document.querySelector("#nav-rachel").hidden = false;
		document.querySelector("#nav-jack").hidden = false;
		document.querySelector("#nav-ashley").hidden = false;
	}
	function toggleFilter() {
		const selectUsers = document.getElementById("select-users");
		selectUsers.hidden = !selectUsers.hidden;
		if (!selectUsers.hidden){
			let selectedFilter = selectUsers.value;
			applyFilter(selectedFilter);
		}
		else {
			refreshDisplay(posts);
		}
	}
});




