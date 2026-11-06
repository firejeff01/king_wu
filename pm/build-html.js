// 將需求規劃書 .md 轉成可直接開啟的 .html（內嵌 Markdown，於瀏覽器端以 marked + mermaid 渲染）
// 用法：node build-html.js   （修改 md 後重新執行即可同步 html）
//       node build-html.js <檔案.md> [側欄標題] [側欄副標]   （轉換其他 md，輸出同名 .html）
const fs = require('fs');
const path = require('path');

const src = process.argv[2] ? path.resolve(process.argv[2]) : path.join(__dirname, '社區管理系統需求規劃書.md');
const out = src.replace(/.md$/i, '') + '.html';
const brand = process.argv[3] || '社區管理系統';
const sub = process.argv[4] || '需求規劃書';
const docTitle = process.argv[3] ? brand + '：' + sub : '社區管理系統需求';
const md = fs.readFileSync(src, 'utf8');
const embedded = JSON.stringify(md).replace(/<\/script/gi, '<\\/script');

const html = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${docTitle}</title>
<style>
:root{
  --bg:#f6f7f9; --panel:#ffffff; --text:#1f2933; --muted:#5f6b7a; --border:#e1e5ea;
  --accent:#1f6f5c; --accent-soft:#e3f1ec; --code:#f0f2f5;
  --p0:#b42318; --p0-bg:#fde8e7; --p1:#9a5b00; --p1-bg:#fdf1dc; --p2:#3b5b8a; --p2-bg:#e6edf7;
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){
    --bg:#14171b; --panel:#1c2026; --text:#e4e7eb; --muted:#9aa5b1; --border:#2e343c;
    --accent:#5cc4a6; --accent-soft:#1d3530; --code:#252a31;
    --p0:#ff8a80; --p0-bg:#3a1f1e; --p1:#ffc266; --p1-bg:#3a2e17; --p2:#9ab8e6; --p2-bg:#1f2a3a;
  }
}
:root[data-theme="dark"]{
  --bg:#14171b; --panel:#1c2026; --text:#e4e7eb; --muted:#9aa5b1; --border:#2e343c;
  --accent:#5cc4a6; --accent-soft:#1d3530; --code:#252a31;
  --p0:#ff8a80; --p0-bg:#3a1f1e; --p1:#ffc266; --p1-bg:#3a2e17; --p2:#9ab8e6; --p2-bg:#1f2a3a;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--text);
  font-family:"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif;line-height:1.7;font-size:15px}
.layout{display:grid;grid-template-columns:280px minmax(0,1fr);min-height:100vh}
nav{position:sticky;top:0;height:100vh;overflow-y:auto;background:var(--panel);border-right:1px solid var(--border);padding:20px 14px}
nav .brand{font-weight:700;font-size:16px;margin:0 6px 4px}
nav .sub{color:var(--muted);font-size:12px;margin:0 6px 14px}
nav a{display:block;color:var(--muted);text-decoration:none;padding:4px 8px;border-radius:6px;font-size:13.5px}
nav a.h3{padding-left:22px;font-size:12.5px}
nav a:hover,nav a.active{background:var(--accent-soft);color:var(--accent)}
.tools{display:flex;gap:6px;margin:0 6px 14px}
.tools button{flex:1;border:1px solid var(--border);background:var(--bg);color:var(--text);border-radius:6px;padding:5px;font-size:12px;cursor:pointer}
main{padding:32px 40px 80px;max-width:1180px}
h1{font-size:28px;margin:0 0 18px;border-bottom:3px solid var(--accent);padding-bottom:10px}
h2{font-size:22px;margin:44px 0 14px;padding:8px 14px;background:var(--accent-soft);border-left:5px solid var(--accent);border-radius:4px;scroll-margin-top:16px}
h3{font-size:17px;margin:28px 0 10px;color:var(--accent);scroll-margin-top:16px}
p,li{color:var(--text)}
hr{border:0;border-top:1px solid var(--border);margin:28px 0}
blockquote{margin:14px 0;padding:10px 16px;background:var(--panel);border-left:4px solid var(--muted);color:var(--muted);border-radius:4px}
blockquote p{margin:0;color:var(--muted)}
.table-wrap{overflow-x:auto;margin:12px 0 18px;border:1px solid var(--border);border-radius:8px;background:var(--panel)}
table{border-collapse:collapse;width:100%;font-size:14px}
th,td{padding:8px 12px;border-bottom:1px solid var(--border);text-align:left;vertical-align:top}
th{background:var(--code);font-weight:600;white-space:nowrap}
tr:last-child td{border-bottom:0}
td:first-child{white-space:nowrap}
code{background:var(--code);padding:1px 6px;border-radius:4px;font-size:13px;font-family:Consolas,"Cascadia Mono",monospace}
pre{background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:14px 16px;overflow-x:auto;line-height:1.5}
pre code{background:none;padding:0}
.mermaid{background:#fff;border:1px solid var(--border);border-radius:8px;padding:16px;margin:14px 0;overflow-x:auto;text-align:center}
.badge{display:inline-block;padding:1px 8px;border-radius:999px;font-size:12px;font-weight:700;white-space:nowrap}
.badge.p0{color:var(--p0);background:var(--p0-bg)}
.badge.p1{color:var(--p1);background:var(--p1-bg)}
.badge.p2{color:var(--p2);background:var(--p2-bg)}
.filter{display:flex;gap:6px;flex-wrap:wrap;margin:0 6px 14px}
.filter label{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:4px;cursor:pointer}
tr.hidden{display:none}
.menu-btn{display:none}
@media (max-width:860px){
  .layout{grid-template-columns:1fr}
  nav{position:fixed;inset:0 30% 0 0;z-index:10;transform:translateX(-105%);transition:transform .2s;box-shadow:0 0 24px rgba(0,0,0,.25)}
  nav.open{transform:none}
  main{padding:60px 16px 60px}
  .menu-btn{display:block;position:fixed;top:12px;left:12px;z-index:11;border:1px solid var(--border);background:var(--panel);color:var(--text);border-radius:8px;padding:6px 12px}
  h1{font-size:22px}
}
@media print{
  nav,.menu-btn{display:none}
  .layout{display:block}
  main{max-width:none;padding:0}
  h2{break-after:avoid}
  .table-wrap,.mermaid{break-inside:avoid}
}
</style>
</head>
<body>
<button class="menu-btn" onclick="document.querySelector('nav').classList.toggle('open')">☰ 目錄</button>
<div class="layout">
  <nav>
    <div class="brand">${brand}</div>
    <div class="sub">${sub}</div>
    <div class="tools">
      <button onclick="setTheme()">深淺色切換</button>
      <button onclick="window.print()">列印 / PDF</button>
    </div>
    <div class="filter" title="篩選需求表格中的優先級">
      <label><input type="checkbox" data-p="P0" checked>P0</label>
      <label><input type="checkbox" data-p="P1" checked>P1</label>
      <label><input type="checkbox" data-p="P2" checked>P2</label>
    </div>
    <div id="toc"></div>
  </nav>
  <main id="content">載入中…（需連網以載入 Markdown 與流程圖元件）</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js"></script>
<script>
const MD = ${embedded};

function setTheme(){
  const r=document.documentElement;
  const dark = r.dataset.theme ? r.dataset.theme==='dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  r.dataset.theme = dark ? 'light' : 'dark';
  try{localStorage.setItem('pcmp-theme', r.dataset.theme)}catch(e){}
}
try{const t=localStorage.getItem('pcmp-theme'); if(t) document.documentElement.dataset.theme=t;}catch(e){}

const content=document.getElementById('content');
content.innerHTML = marked.parse(MD);

// 表格外包捲動容器
content.querySelectorAll('table').forEach(t=>{const w=document.createElement('div');w.className='table-wrap';t.before(w);w.appendChild(t);});

// 優先級徽章
content.querySelectorAll('td').forEach(td=>{
  const m = td.textContent.trim().match(/^P([012])$/);
  if(m){ td.innerHTML='<span class="badge p'+m[1]+'">P'+m[1]+'</span>'; td.parentElement.dataset.p='P'+m[1]; }
});
content.querySelectorAll('strong').forEach(s=>{
  const m=s.textContent.trim().match(/^P([012])$/); if(m) s.outerHTML='<span class="badge p'+m[1]+'">P'+m[1]+'</span>';
});

// 優先級篩選
document.querySelectorAll('.filter input').forEach(cb=>cb.addEventListener('change',()=>{
  const on=[...document.querySelectorAll('.filter input:checked')].map(c=>c.dataset.p);
  content.querySelectorAll('tr[data-p]').forEach(tr=>tr.classList.toggle('hidden',!on.includes(tr.dataset.p)));
}));

// 目錄
const toc=document.getElementById('toc');
content.querySelectorAll('h2,h3').forEach((h,i)=>{
  h.id='sec-'+i;
  const a=document.createElement('a');a.href='#'+h.id;a.textContent=h.textContent;a.className=h.tagName.toLowerCase();
  a.onclick=()=>document.querySelector('nav').classList.remove('open');
  toc.appendChild(a);
});
const links=[...toc.querySelectorAll('a')];
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id));}
}),{rootMargin:'0px 0px -75% 0px'});
content.querySelectorAll('h2,h3').forEach(h=>io.observe(h));

// Mermaid 流程圖
content.querySelectorAll('pre code.language-mermaid').forEach(c=>{
  const d=document.createElement('div');d.className='mermaid';d.textContent=c.textContent;c.parentElement.replaceWith(d);
});
mermaid.initialize({startOnLoad:false,theme:'default',securityLevel:'strict'});
mermaid.run({querySelector:'.mermaid'});
</script>
</body>
</html>
`;
fs.writeFileSync(out, html, 'utf8');
console.log('Generated:', out);
