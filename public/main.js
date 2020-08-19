function render_html(iframe, hash) {
  iframe.src = 'data:text/html,' + encodeURIComponent(hash);
}

if (location.search !== '' && location.hash !== '') {
  const hash = decodeURIComponent(location.hash.substring(1));
  const iframe = document.createElement('iframe');

  switch (location.search) {
    case '?html':
      render_html(iframe, hash);
      break;
    default:
      window.alert('invalid url. try jsrun.me/?html#<h1>hello world</h1>');
  }

  document.body.appendChild(iframe);
}

window.addEventListener('hashchange', () => {
  window.location.reload();
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
