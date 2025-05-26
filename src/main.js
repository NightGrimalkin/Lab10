window.onload = async () => {
  const data = await getData();
  for (let i = 0; i < data.length; i++) {
    displayArticle(data[i])
  }
}


const getData = async () => {
  try {
    const data = await fetch("https://egvwmvwxfmpdzylibikc.supabase.co/rest/v1/article?select=*", {
      headers: {
        apiKey: import.meta.env.VITE_apiKey,
      },
    })
    if (!data.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return data.json();
  } catch (err) {
    console.error(err.message);
  }

}

const displayArticle = (articleObj) => {
  const app = document.getElementById('app')
  const articleDiv = document.createElement('div')

  const articleParagraph = document.createElement('p')
  articleParagraph.setAttribute('style', 'white-space: pre;');

  articleParagraph.textContent = `Tytuł: ${articleObj.title} \r\n `
  articleParagraph.textContent += `Podtytuł: ${articleObj.subtitle} \r\n`
  articleParagraph.textContent += `Author: ${articleObj.author} \r\n`
  articleParagraph.textContent += `Data utworzenia: ${articleObj.created_at} \r\n`
  articleParagraph.textContent += `Zawartość: ${articleObj.content} \r\n `;
  articleDiv.appendChild(articleParagraph);

  app.appendChild(articleDiv)
}