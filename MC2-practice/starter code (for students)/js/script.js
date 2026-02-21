// GIVEN: Create a User constructor
const User = function(name) {
				this.name = name;
				this.lname = this.name.toLowerCase();
				this.uname = this.name.toUpperCase();
				this.nav = "#nav-" + this.lname;
				this.img = "./images/user-" + name + ".png";
			}

// TODO: Create object constructors as you see fit

const Post = function(title, content, date){
	this.title = title;
	this.content = content;
	this.date = date;
}

const Message = function(content){
	this.content = content;
}

// GIVEN: These will store all the posts/messages locally
let posts = [];
let messages = [];  // OPTIONAL: Use this if you will implement Messenger
let postCtr = 0;

// GIVEN: Do not change the values below
let currentUser = new User("Rachel");
const errorTitle = "  Please write a title  ";
const errorContent = "  Please write a content  ";

// GIVEN: variables to check against Filter Select (the drop-down box)
let selectNone = "None";
let selectRachel = "Rachel";
let selectJack = "Jack";
let selectAshley = "Ashley";

// This event listener is equivalent to JQuery's $(document).ready
document.addEventListener("DOMContentLoaded",function() {
	// GIVEN: Do not remove
	switchUser(currentUser);
	toggleFilter();  // This functionality is already GIVEN
	
	// TODO: Set the Create Post's date to the current date
	const today = new Date();
	$("#post-date").val(formatDate(today)); //
	// Use the given "formatDate" function present in this file to convert "today" to the correct format
	// .________________________________________________________________________.
	// ||																	   ||
	// || Fill up the element behaviours below, you may change it if necessary ||
	// ||______________________________________________________________________||
	// '																	    '

	// TODO: Complete the functionality when clicking Submit Post
	document.querySelector("#submit-post")?.addEventListener("click", function(e){
		e.preventDefault();  // Prevents page refresh
		// HINT: Fill up the contents of validateFields() first
		title = $("#post-title").val();
		content = $("#post-body").val();
		if (validateFields(title, content)) {
			// HINT: If the number of Posts is ZERO, clear post-container first
			if(postCtr === 0){ $("#post-container").empty(); } 
			// Create a new post and add it to posts
			let newPost = new Post(title, content, $("#post-date").val());
			newPost.user = currentUser;
			newPost.order = ++postCtr;
			posts.push(newPost);
			// Refresh the displayed posts
			refreshDisplay(posts);  // Fill up the contents of refreshDisplay() first
			// Reset the contents of Create Post
			resetCreatePost();
		}
	});

	document.querySelector("#send-msg")?.addEventListener("click", function(e){
		e.preventDefault();  // Prevents page refresh
		content = $("#type-msg").val();
		if (validateFieldsMsg(content)) {	
			let newMsg = new Message(content);
			newMsg.user = currentUser;
			newMsg.date = new Date();
			messages.push(newMsg);
			displayMsg(newMsg);
			clearMsg();
		}
	});

	// Called when Sort by Date button is clicked
	document.querySelector("div#sort-by-date")?.addEventListener("click", function(e) {
		sortByPostDate();  // Fill up the contents of sortByPostDate()
	});

	// Called when Filter button is clicked
	document.querySelector("div#filter")?.addEventListener("click", function(e) {
		toggleFilter();  // This functionality is already GIVEN
	}); 

	// Called when Filter Drop-down value is changed
	document.querySelector("#select-users")?.addEventListener("change", function (e) {
		let selectedValue =  this.value;
		applyFilter(selectedValue);  // Fill up the contents of applyFilter() first
	});

	// Called when Sort by Post Order button is clicked
	document.querySelector("div#sort-by-order")?.addEventListener("click", function(e) {
		sortByPostOrder();  // Fill up the contents of sortByPostOrder()
	});

	// Called when To Top button is clicked
	document.querySelector("div#to-top")?.addEventListener("click", function(e) {
		scrollToTop();  // Fill up the contents of scrollToTop() first
	}); 


	// .__________________________________________________________.
	// ||														 ||
	// || Fill up the functions below, you may also add your own ||
	// ||________________________________________________________||
	// '														  '

	// TODO: Complete the validateFields() function below
	function validateFields(title, content) {
		// HINT: Return 'true' if title and content is NOT empty
		// else, use the showError() function to show the proper
		// error text. Then, return false
		// If title is invalid, show errorTitle
		if(title === "" || title === null) {
		showError(errorTitle); // If invalid, return false
		return false;
		}
		if (content === "" || content === null){ 
		showError(errorContent); // If invalid, return false
		return false;
		}

		// If valid, return true
		return true;
	}

	function validateFieldsMsg(content){
		if(content === "" || content === null){
			showError("Enter a Valid Message");
			return false;
		}
		return true;
	}

	// TODO: Complete the sortByPostDate() function below
	function sortByPostDate() {
		let sortedPosts = [...posts].sort((a, b) => {
			if (a.date > b.date) return 1;
			if (a.date < b.date) return -1;
			return 0;
		});
		refreshDisplay(sortedPosts);  // Fill up the contents of refreshDisplay() first
	}

	// TODO: Complete the sortByPostOrder() function below
	function sortByPostOrder() {
		let post, number;
		let sortedPosts = [];

		sortedPosts = [...posts].sort((a,b)=> {
			if(a.order > b.order) return 1;
			if(a.order < b.order) return -1;
			return 0;
		});		// Refresh the displayed posts according to the result of the sorting
		refreshDisplay(sortedPosts);  // Fill up the contents of refreshDisplay() first
	}

	// TODO: Complete the applyFilter() function below
	function applyFilter(selectedValue) {
		// If, selectedValue is equal to selectNone, show all posts
		if(selectedValue === selectNone){
			refreshDisplay(posts);
		}
		// Else, (meaning, if a name filter is selected)
		else{
		let filteredPosts = [];
		// For each post in posts, if the post name is equal to selectedValue,
		// add it to filteredPosts (filteredPosts.push(post);)
		for(var i=0;i<posts.length;i++){
			if(posts[i].user.name === selectedValue){
				filteredPosts.push(posts[i]);
			}
		}
			
		// Refresh the displayed posts according to the result of filtering
		refreshDisplay(filteredPosts);  // Fill up the contents of refreshDisplay() first
		}
	}

	// TODO: Complete the scrollToTop() function below
	function scrollToTop() {
		window.scrollTo(0,0);
	}

	// Refreshes the post-container according to the post contents of displayedPosts
	function refreshDisplay(displayedPosts) {
		// If displayedPosts is empty, show "▓▒░(°◡°)░▒▓<br>Wow such empty..."
		// in the post-container (with a "filler-text" class)
		// Else, add each post inside displayedPosts to post-container
		$("#post-container").empty();
		if (displayedPosts.length === 0) {
			$("#post-container").html('<div class="filler-text">▓▒░(°◡°)░▒▓<br>Wow such empty...</div>');
		} else {
			displayedPosts.forEach(post => displayPost(post));
		}
	}
	function displayPosts(newPosts) {
		// Clear post-container and add each post inside newPosts inside it instead
		$("#post-container").empty();

		for (var i = 0; i < newPosts.length; i++) {
        displayPost(newPosts[i]);
    	}
	}

	function clearMsg(){
		$("#type-msg").val("");
	}
	function displayPost(newPost) {

		// Create elements/tags
		// HINT: You can use document.createElement("tag");

		// Add classes to your created elements so you don't have to style repeatedly
		// HINT: You can use $(element1).addClass("class-name");

		// Set the proper hierarchy of the created elements
		// HINT: $(element1).append(element2); will place element2 within element1

		// Set the proper content/values to the correct elements/tags
		// HINT: You can use $(element2).text("Text to Add"); OR $(imgElement).attr("src", "./images/user.png");
	
		// Place the outermost element (single-post-main) inside post-container
		// $("div#post-container").append(single-post-main);

		let a = $("<div>").addClass("single-post-main");
		let b = $("<div>").addClass("single-post");
		let c = $("<div>").addClass("sp-left");
		let imge = $("<img>").addClass("sp-picture").attr("src", newPost.user.img);
		let d = $("<div>").addClass("sp-right");
		let e = $("<div>").addClass("sp-right-content").addClass("sp-body").text(newPost.content);
		let f = $("<div>").addClass("sp-title").text(newPost.title);
		let g = $("<div>").addClass("sp-right-bottom");
		let h = $("<div>").addClass("sp-name").text(newPost.user.name);
		let i = $("<div>").addClass("sp-date").text(newPost.date);

		c.append(imge);
		g.append(h).append(i);
		d.append(f).append(e).append(g);
		b.append(c).append(d);
		a.append(b);

		$("#post-container").append(a);
	}

	function displayMsg(newMsg){
		let a = $("<div>").addClass("single-msg-main");
		let b = $("<div>").addClass("msg-content").text(newMsg.content);
		let c = $("<div>").addClass("msg-footer");
		let d = $("<div>").addClass("msg-poster").text(newMsg.user.name);
		let e = $("<div>").addClass("msg-date").text(formatDateMsg(newMsg.date));


		a.append(b);
		a.append(c);
		c.append(d).append(e);
		$(".msngr-body").append(a)
	}

	// Reset the values of Create Post
	function resetCreatePost() {
		// Empty the contents of Title and Content
		// Set the Date to the current Date today
		var now = new Date();
		$("#post-title").val("");
		$("#post-body").val("");
		$("#post-date").val(formatDate(now));
	}

	function formatDateMsg(today) {  // GIVEN: For date formatting
		let formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0) + ' | Time: ' + today.getHours().toString().padStart(2, 0) + ':' + today.getMinutes().toString().padStart(2, 0);
		return formattedDate;
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

	document.querySelector("input#post-title")?.addEventListener("click", function(e) {	// GIVEN: For error handling
		hideError();
	});
	document.querySelector("textarea#post-body")?.addEventListener("click", function(e) {
		hideError();
	});
	
	function hideError() {
		document.getElementById("post-error").innerHTML = "";
	}

	function showError(errorText) {
		document.querySelector("#post-error").innerHTML = "";
		document.querySelector("#post-error").innerHTML += "      [ERROR]    " + "<span>" + errorText + "</span>" + "    !     ";
	}

	document.querySelector("#nav-rachel")?.addEventListener("click", function(e) {  // GIVEN: For user switching
		let user = new User("Rachel");
		switchUser(user);
	});	
	document.querySelector("#nav-jack")?.addEventListener("click",function(e) {
		let user = new User("Jack");
		switchUser(user);
	});
	document.querySelector("#nav-ashley")?.addEventListener("click",function(e) {
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




