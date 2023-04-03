const commentButton = async (event) => {
    event.preventDefault();
  
    const body = document.querySelector('.comment_input').value.trim();
    const project_id = window.location.pathname.split('/').pop();
  
    if (body) {
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ body, project_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      location.reload();
    }
  };
  
  document.querySelector('.comment-form').addEventListener('submit', commentButton);