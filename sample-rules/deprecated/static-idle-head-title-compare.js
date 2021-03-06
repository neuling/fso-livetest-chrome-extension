function(page, done) {
  var dom = page.getStaticDom();
  var idom = page.getIdleDom();
  var st = dom.querySelector('title');
  var it = idom.querySelector('title');


  if (st && it && st.innerText && it.innerText) {
    if (st.innerText.trim() !== it.innerText.trim())
    {
      done(this.createResult('HEAD', "Static and Idle Titles to not match! "+this.partialCodeLink('Static DOM title:',st,'Idle DOM title:',it), "error"));
    }
    else
    {
      done();
    }
  }
}
