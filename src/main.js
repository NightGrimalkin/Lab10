const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVndndtdnd4Zm1wZHp5bGliaWtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzgyMTcsImV4cCI6MjA2MzUxNDIxN30.5EbBoKwnN0Uzqf_6bWB6v3cRlTmq4t9vEuT9BnuKvv4";


document.getElementById("addButton").addEventListener("click", async(e)=>{
  e.preventDefault()
  await insertData();
})

window.onload = async () => {
  

  const data = await getData();
  for (let i = 0; i < data.length; i++) {
    displayArticle(data[i]);
  }
};

const getData = async () => {
  try {
    const data = await fetch(
      "https://egvwmvwxfmpdzylibikc.supabase.co/rest/v1/article?select=*",
      {
        headers: {
          apiKey: apiKey,
        },
      }
    );
    if (!data.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return data.json();
  } catch (err) {
    console.error(err.message);
  }
};

const insertData = async () => {
  const formRef = document.getElementById("tableData");

  const formData = {
    title: formRef["title"].value,
    subtitle: formRef["subtitle"].value,
    author: formRef["author"].value,
    content: formRef["content"].value,
  };
  console.log(formData)
  try {
    const data = await fetch(
      "https://egvwmvwxfmpdzylibikc.supabase.co/rest/v1/article",
      {
        method: "POST",
        headers: {
          apiKey: apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData ),
      }
    );
    if (!data.ok) {
      throw new Error(`Response status: ${data.status}`);
    }
    return data.json();
  } catch (err) {
    console.error(err.message);
  }
};

const displayArticle = (articleObj) => {
  const app = document.getElementById("app");
  const articleDiv = document.createElement("div");
  const articleParagraph = document.createElement("p");

  articleParagraph.setAttribute("style", "white-space: pre;");

  articleParagraph.textContent = `Tytuł: ${articleObj.title} \r\n `;
  articleParagraph.textContent += `Podtytuł: ${articleObj.subtitle} \r\n`;
  articleParagraph.textContent += `Author: ${articleObj.author} \r\n`;
  articleParagraph.textContent += `Data utworzenia: ${articleObj.created_at} \r\n`;
  articleParagraph.textContent += `Zawartość: ${articleObj.content} \r\n `;
  articleDiv.appendChild(articleParagraph);

  app.appendChild(articleDiv);
};
