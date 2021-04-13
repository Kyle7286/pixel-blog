



















// Create Post! Logic
const createBlogClicked = async (e) => {
    // Prevent refreshing of page
    e.preventDefault();

    const headline = $.trim($('#blog-headline').val());
    const content = $.trim($('#blog-content').val());

    // If forms have text, then post new blog
    if (headline && content) {
        // Perform fetch POST
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ headline, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        // If a response from server, then proceed to dashboard
        if (response.ok) {
            window.location.replace("/dashboard")
        } else {
            alert(response.statusText)
        }
    } else {
        alert("Please ensure both the headline and content box are filled out and try again...")
    }
}

// Empty the forms to remove white space
const clearForms = () => {
    $('#blog-headline').text("");
    $('#blog-content').text("")
}

clearForms();
$('#form-headline').focus();

// Click handler for Create Post!
$('#btn-create-blog').click(createBlogClicked)