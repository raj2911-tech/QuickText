const copyBtn = document.getElementById('copyBtn');
const snippetText = document.getElementById('snippetText').innerText;
const copyMsg = document.getElementById('copyMsg');

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(snippetText).then(() => {
    copyMsg.style.display = 'block';
    setTimeout(() => {
      copyMsg.style.display = 'none';
    }, 1500);
  });
});