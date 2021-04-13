// Reply button clicked shows the element
const replyClicked = (e) => {
    e.preventDefault();
    $('#div-reply').removeClass('hidden');
    $('#div-reply').addClass('visible');
    $('textarea').focus();

}

const postClicked = async (e) => {
    e.preventDefault();

    const content = $('#reply-content').val().trim();
    const blog_id = $('.div-blog').attr('id');


    if (content) {

        // Post reply
        const response = await fetch('/api/blogs/reply', {
            method: 'POST',
            body: JSON.stringify({ content, blog_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log(response.ok);
            $('#div-reply').removeClass('visible')
            $('#div-reply').addClass('hidden')
            location.reload();
        } else {
            alert(response.statusText)
        }

    } else {
        alert("Please fill out the reply box in order to post!");
    }

}


// Reply Click Handler
$('#btn-reply').click(replyClicked)

$('#btn-post').click(postClicked)
