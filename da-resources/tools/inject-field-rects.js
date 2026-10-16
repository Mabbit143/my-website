document.fonts.ready.then(()=>{
  const out=[];
  const pages=[...document.querySelectorAll('.page')];
  pages.forEach((pg,pi)=>{
    const pr=pg.getBoundingClientRect();
    const add=(el,kind,label)=>{const r=el.getBoundingClientRect();out.push({page:pi,kind,label,x:r.left-pr.left,y:r.top-pr.top,w:r.width,h:r.height});};
    pg.querySelectorAll('.lines').forEach((el,i)=>{
      const head=el.previousElementSibling&&el.previousElementSibling.tagName==='H3'?el.previousElementSibling.textContent.trim():'Notes';
      add(el,'text',head);
    });
    pg.querySelectorAll('.fill').forEach(el=>add(el,'text','My first move today'));
    pg.querySelectorAll('.sq').forEach((el,i)=>add(el,'check','Checkbox '+(i+1)+': '+(el.nextElementSibling?el.nextElementSibling.textContent.trim().slice(0,60):'')));
    pg.querySelectorAll('tbody td[style*="height"]').forEach(td=>{
      const tr=td.parentElement;const table=td.closest('table');
      [...tr.children].forEach((c,ci)=>{const head=table.querySelectorAll('thead th')[ci];add(c,'text',(head?head.textContent.trim():'Cell')+' row '+([...tr.parentElement.children].indexOf(tr)+1));});
    });
  });
  document.body.setAttribute('data-fields',JSON.stringify(out));
});
