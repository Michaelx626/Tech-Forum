const deleteBlog = async (event) => {
    event.preventDefault();

    const project_id = window.location.pathname.split('/').pop();

    const response = await fetch('/api/blog', {
        method: "DELETE",
        body: JSON.stringify({ project_id }),
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok){
        window.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.delete-btn').addEventListener('click', deleteBlog);