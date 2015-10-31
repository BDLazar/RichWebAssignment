//distance variable and y position variable
var scrollY = 0;
var dist = 20;

//function for smooth scrolling to a section on click of menu buttons
function smoothScroller(elem) 
{
	console.log("we are inside the function");
	//the position of the scrollbar on the page
	var curYPos = window.pageYOffset;
	
	//the position you want the function to scroll to (-80 to account for the size of the navbar)
	var dest = document.getElementById(elem).offsetTop - 80;
	
	//variable to find the bottom of the page
	var pageHeight = document.offsetHeight;
	
	//position on the Y axis
	var yPos = curYPos + window.innerHeight;
	
	/*call the smoothscroller function every 1 miliseconds using the setTimeout method 
	this way it appears as if it is scrolling smoothly and creates the animation*/
	var animate = setTimeout('smoothScroller(\''+elem+'\')',1);
	
	/*if the position on the y axis is past the bottom of the page stop animating.
	if the current position on the page is before the destination, scroll down until you reach it*/
	if(yPos > pageHeight)
	{
		clearTimeout(animate);
		console.log(yPos);
	} 
	else if(curYPos < dest - dist)
	{
		scrollY = curYPos + dist;
		window.scroll(0, scrollY);
	} 
	//else if it is after the destination scroll up until you reach it
	else if(curYPos > dest)
	{
		scrollY = curYPos - dist;
		window.scroll(0, scrollY);
	}
	else
	{
		clearTimeout(animate);
	}

}

//function to change the navbar to the fixed navbar when the user scrolls past the header image 
window.onscroll = function staticNavBar(){
	console.log("we are inside the function");
	
	//current position on the y axis of the screen 
	var curYPos = window.pageYOffset;
	
	//if we are before the positon of the banner element leave navbar as 'firstheader'
	if(curYPos < document.getElementById("banner").clientHeight){
		document.getElementById("nav").className = "firstheader";
	//if we go past the banner then change navbar class to the fixed nav bar
	}else{
		document.getElementById("nav").className = "fixed";
	}
}

//validates the contact form
function ValidateContactForm()
{
    var name = document.ContactForm.Name;
    var email = document.ContactForm.Email;
    var phone = document.ContactForm.Telephone;
    var nocall = document.ContactForm.DoNotCall;
    var what = document.ContactForm.Subject;
    var comment = document.ContactForm.Comment;

    if (name.value == "")
    {
        window.alert("Please enter your name.");
        name.focus();
        return false;
    }
    
    if (email.value == "")
    {
        window.alert("Please enter a valid e-mail address.");
        email.focus();
        return false;
    }
    if (email.value.indexOf("@", 0) < 0)
    {
        window.alert("Please enter a valid e-mail address.");
        email.focus();
        return false;
    }
    if (email.value.indexOf(".", 0) < 0)
    {
        window.alert("Please enter a valid e-mail address.");
        email.focus();
        return false;
    }

    if ((nocall.checked == false) && (phone.value == ""))
    {
        window.alert("Please enter your telephone number.");
        phone.focus();
        return false;
    }

    if (comment.value == "")
    {
        window.alert("Please provide a detailed description or comment.");
        comment.focus();
        return false;
    }
    return true;
}
