
// Show the edit elements, hide the others
const blogClicked = (e) => {
    e.preventDefault();
    console.log("Clicked");

    $('.div-blog-dashboard').off();

    // Show all elements with class edit
    $('.edit').removeClass('hidden');

    // Hide all elements with class blog
    $('.blog').addClass('hidden');
}


// Send the edit to the server to update the db
const updatePostClicked = async (e) => {
    e.preventDefault();

    // Collect information
    const title = $('#blog-headline').val().trim();
    const content = $('#blog-content').val().trim();
    const id = $('.div-blog').attr('id');

    // Send PUT request
    if (title && content) {
        const response = await fetch('/api/blogs/' + id, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If successful, reload page
        if (response.ok) {
            location.reload();
        } else {
            alert(response.statusMessage);
        }
    } else {
        alert('Please ensure both fields are filled out before updating..')
    }
}


const deletePostClicked = async (e) => {
    e.preventDefault();

    // Collect information
    const title = $('#blog-headline').val().trim();
    const content = $('#blog-content').val().trim();
    const id = $('.div-blog').attr('id');


    
}


// Click handlers
$('.div-blog-dashboard').click(blogClicked);
$('.btn-update-post').click(updatePostClicked);
$('.btn-delete-post').click(updatePostClicked);

