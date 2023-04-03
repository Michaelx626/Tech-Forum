const createBlog = async (event) => {
  event.preventDefault();
  const userTitle = document.querySelector(".post_title").value.trim();
  const userContent = document.querySelector(".post_content").value.trim();

  const response = await fetch("/api/blog", {
    method: "POST",
    body: JSON.stringify({ userTitle, userContent }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    window.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document.querySelector(".create-form").addEventListener("submit", createBlog);
