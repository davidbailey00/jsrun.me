if (location.hash !== '') {
  const html = decodeURIComponent(location.hash.substring(1));
  const iframe = document.createElement('iframe');
  iframe.src = 'data:text/html,' + encodeURI(html);
  document.body.appendChild(iframe);
}

window.addEventListener('hashchange', () => {
  window.location.reload();
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
