



















// Create Post! Logic
const createBlogClicked = async (e) => {
    // Prevent refreshing of page
    e.preventDefault();

    const headline = $('#blog-headline').val().trim();
    const content = $('#blog-content').val().trim();

    // If forms have text, then post new blog
    if (headline && content) {
        // Perform fetch POST
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ headline, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        // If a response from server, then proceed to dashboard
        if (response) {
            window.location.replace("/dashboard")
        } else {
            alert("No response from server, please try again...")
        }


    } else {
        alert("Please ensure the headline and content are filled out to create a new blog!")
    }


}

// Empty the forms to remove white space
const clearForms = () => {
    $('#blog-headline').val("");
    $('#blog-content').val("")
}

clearForms();

// Click handler for Create Post!
$('#btn-create-blog').click(createBlogClicked)