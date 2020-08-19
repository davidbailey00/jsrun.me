function render_html(iframe, hash) {
  iframe.src = 'data:text/html,' + encodeURIComponent(hash);
}

function render_dweet(iframe, hash) {
  function run_in_frame() {
    var S = Math.sin;
    var C = Math.cos;
    var T = Math.tan;
    function R(r, g, b, a = 1) {
      return `rgba(${r | 0},${g | 0},${b | 0},${a})`;
    }
    var c = document.querySelector('#c');
    var x = c.getContext('2d');

    function u(t) {
      eval(hash);
    }

    let start;
    function step(timestamp) {
      if (start === undefined) start = timestamp;
      const elapsed = timestamp - start;

      u(elapsed / 1000);
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  const html = String.raw;
  const doc = html`<html>
    <head>
      <style>
        body {
          margin: 0;
          max-width: 640px;
        }
        .outer {
          overflow: hidden;
          padding-top: 56.25%; /* 16:9 */
          position: relative;
        }
        .inner {
          position: absolute;
          top: 0;
          width: 100%;
        }
        canvas {
          width: 100%;
          height: auto;
        }
      </style>
    </head>
    <body>
      <div class="outer">
        <div class="inner">
          <canvas id="c" width="1920" height="1080"></canvas>
        </div>
      </div>
      <script>
        const hash = unescape('${escape(hash)}');
        ${run_in_frame.toString()};
        run_in_frame();
      </script>
    </body>
  </html>`;

  iframe.src = 'data:text/html,' + encodeURIComponent('<!DOCTYPE html>' + doc);
}

if (location.search !== '' && location.hash !== '') {
  const hash = decodeURIComponent(location.hash.substring(1));
  const iframe = document.createElement('iframe');

  switch (location.search) {
    case '?html':
      render_html(iframe, hash);
      break;
    case '?dweet':
      render_dweet(iframe, hash);
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
