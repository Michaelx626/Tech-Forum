const updateBlog = async (event) => {
    event.preventDefault();
    const updateTitle = document.querySelector('.edit_title').value.trim();
    const updateContent = document.querySelector('.edit_content').value.trim();
    const project_id = window.location.pathname.split('/').pop();

    const response = await fetch('/api/blog', {
        method: "PUT",
        body: JSON.stringify({ updateTitle, updateContent, project_id }),
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok){
        window.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.update-btn').addEventListener('click', updateBlog);