import { isNumber } from 'lodash';
import myRobotsParser from 'robots-parser';

export const createResult = (label, message, type = 'info', what = null) => {
  let result = { label: label, message: message, type: type, what: what };
  return result;
};

//https://www.npmjs.com/package/robots-parser
export const robotsParser = myRobotsParser;

export const htmlEntitiesEncode = (str) => {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};



export const utf8TextLink = (str, anchor) =>
{
  //str = String(str).replace(/"/g, '\\"');
  str = str.trim();
  str = encodeURIComponent(str);
  return '<a href="data:text/plain;charset=utf-8,'+str+'" target="_blank" title="'+htmlEntitiesEncode(str)+'">'+anchor+'</a>';
}

export const dataUrlTextLink = (str, anchor) => {
  str = String(str).replace(/"/g, '\"');
  return '<a href="data:text;base64, '+btoa(str)+'" target="_blank" title="'+htmlEntitiesEncode(str)+'">'+anchor+'</a>';
}

//can't open file in _blank due to some security restrictions
export const blobUrlTextLink = (str, anchor) => {
  str = String(str).replace(/"/g, '\"');
  var blob = new Blob([str], {type: "text/plain;charset=utf-8"});
  blob.close();
  return '<a href="'+URL.createObjectURL(blob)+'" target="_blank" title="'+htmlEntitiesEncode(str)+'">'+anchor+'</a>';
}

export const isIterable = function (stuff) {
 if(stuff)
 {
  return typeof stuff[Symbol.iterator] === 'function';
 }
 return false;
}

export const isString = function (stuff) {
  return typeof stuff === 'string';
}


export const nodeToString = (stuff) =>
{
  Element.prototype.isNodeList = function() {return false;}
  Element.prototype.isElement = function() {return true;}
  NodeList.prototype.isNodeList = HTMLCollection.prototype.isNodeList = function(){return true;}
  var temp_string = '';
  if (stuff === undefined || stuff === null) { return '' }
  if (!stuff) {return stuff }
  if (stuff.outerHTML) { return stuff.outerHTML; }
  if (isIterable(stuff)) {
    if (isString(stuff)) {return stuff;}
    if (Array.isArray(stuff)) {
      return stuff.join("\n");
    }
    stuff = Array.prototype.slice.call(stuff);

      stuff.forEach(function(v){
    	   if(v.outerHTML){ temp_string = temp_string + v.outerHTML+"\n";}
         else {temp_string = temp_string + v + "\n";}
       });

    return temp_string;
  };
  if(stuff !== null && typeof stuff === 'object')
  {

    var stuff_keys = Object.keys(stuff);
    stuff_keys.forEach(function(k)
    {
      temp_string = temp_string + k +': '+stuff[k]+ "\n";
    });
    return temp_string;
  }
  return "Don't know how to transform this data into a data URL!";
};

//show only beginning tag tag = elem.innerHTML ? elem.outerHTML.slice(0,elem.outerHTML.indexOf(elem.innerHTML)) : elem.outerHTML;



export const allNodesToString = (...stuffs) =>
{
  stuffs = Array.prototype.slice.call(stuffs);
	if(!stuffs){return false;}
	var s = '';
  stuffs.forEach(function(stuff){
  	s = s + "\n" + nodeToString(stuff);
  });
  return s;
}

export const partialCodeLink = (...nodes) => {
	var str = allNodesToString(...nodes);
  return '     '+utf8TextLink(str, '<span class="show-partial-source Button Button--haptic Button--inline">&lt;/&gt;</span>');
}


/*

export const codeBox = (str) = {
  var id = this.makeid();
  var boxcode = '<textarea readonly id="'+id+'">'+str+'</textarea>';
  viewcodelink = '<a href="data:,'+str+'" target="_blank">View Code</a>';
}
*/
