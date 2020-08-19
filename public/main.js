function createDocument(js) {
  const html = String.raw;
  const doc = html`<html>
    <body>
      <script>
        eval(unescape('${escape(js)}'));
      </script>
    </body>
  </html>`;

  return '<!DOCTYPE html>' + doc;
}

if (location.hash !== '') {
  const js = decodeURIComponent(location.hash.substring(1));
  const doc = createDocument(js);

  const iframe = document.createElement('iframe');
  iframe.src = 'data:text/html,' + encodeURI(doc);
  document.body.appendChild(iframe);
}

window.addEventListener('hashchange', () => {
  window.location.reload();
});
