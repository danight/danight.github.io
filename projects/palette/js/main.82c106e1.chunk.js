(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,,function(e,t,n){e.exports=n(28)},,,,,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(9),c=n(1),l=n(2),i=n(4),s=n(3),u=n(5),h=n(10),m=n(6);n(16);function d(e){var t=e.getBoundingClientRect();return{left:t.left+window.pageXOffset,bottom:t.bottom+window.pageYOffset}}var v=function(e){function t(){var e,n;Object(c.a)(this,t);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(n=Object(i.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(a)))).handleMouseDown=function(e){var t,o;e.preventDefault(),t=e.target.classList.contains("slider")?(o=e.target.querySelector(".slider__thumb")).clientHeight/2:d(o=e.target.closest(".slider__thumb")).bottom-e.pageY,n.thumb=o,n.thumb.shiftY=t,n.thumb.slider=e.currentTarget,n.thumb.classList.add("slider__thumb_push"),n.moveTo(e),n.removeMouseMove=n.handleMouseMove.bind(Object(m.a)(Object(m.a)(n))),document.addEventListener("mousemove",n.removeMouseMove),n.removeMouseUp=n.handleMouseUp.bind(Object(m.a)(Object(m.a)(n))),document.addEventListener("mouseup",n.removeMouseUp)},n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.thumb.ondragstart=function(){return!1},this.thumb.style.bottom=(this.slider.clientHeight-this.thumb.clientHeight)/100*this.props.value+"px"}},{key:"componentDidUpdate",value:function(){this.thumb.style.bottom=(this.slider.clientHeight-this.thumb.clientHeight)/100*this.props.value+"px"}},{key:"componentWillUnmount",value:function(){this.thumb.ondragstart=null}},{key:"moveTo",value:function(e){var t=d(this.thumb.slider).bottom-e.pageY-this.thumb.shiftY,n=this.thumb.slider.clientHeight-this.thumb.clientHeight;t<0&&(t=0),t>n&&(t=n);var o=100*t/(this.thumb.slider.clientHeight-this.thumb.clientHeight);this.thumb.style.bottom=t+"px",this.props.onChange(o)}},{key:"handleMouseMove",value:function(e){this.moveTo(e)}},{key:"handleMouseUp",value:function(){this.thumb.classList.remove("slider__thumb_push"),document.removeEventListener("mousemove",this.removeMouseMove),document.removeEventListener("mouseup",this.removeMouseUp)}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{ref:function(t){return e.slider=t},onMouseDown:this.handleMouseDown,className:"slider color-picker__slider"},a.a.createElement("div",{ref:function(t){return e.thumb=t},className:"slider__thumb"}))}}]),t}(o.Component);n(18);function b(e){var t=e.colors,n=e.onChange,o=Object.keys(t).map(function(e){return a.a.createElement(v,{key:e,value:t[e],onChange:function(t){return n(e,t)}})});return a.a.createElement("div",{className:"color-picker palette__color-picker"},o)}var p=n(7);n(20);function f(e){var t=e.colors,n=e.colorUnit,o=e.onChangeColor,r=e.onCopy,c=Object(p.a)(t,3),l=c[0],i=c[1],s=c[2],u="";switch(n){case"hex":u="#"+t.map(function(e){var t=e.toString(16);return t.padEnd(2,t).toUpperCase()}).join("");break;case"hsl":u=function(e){var t=Object(p.a)(e,3),n=t[0],o=t[1],a=t[2];n/=255,o/=255,a/=255;var r,c,l=Math.max(n,o,a),i=Math.min(n,o,a),s=(l+i)/2;if(l==i)r=c=0;else{var u=l-i;switch(c=s>.5?u/(2-l-i):u/(l+i),l){case n:r=(o-a)/u+(o<a?6:0);break;case o:r=(a-n)/u+2;break;case a:r=(n-o)/u+4}r/=6}return"hsl(".concat(Math.round(360*r),", ").concat(Math.round(100*c),"%, ").concat(Math.round(100*s),"%)")}(t);break;default:u="rgb(".concat(l,", ").concat(i,", ").concat(s,")")}return a.a.createElement("div",{className:"filter-color-value palette__filter-color-value"},a.a.createElement("div",{className:"filters filter-color-value__filters filter-color-value__item"},a.a.createElement("button",{onClick:function(){return o("rgb")},disabled:"rgb"===n,className:"filters__rgb filters__btn"},"rgb"),a.a.createElement("button",{onClick:function(){return o("hex")},disabled:"hex"===n,className:"filters__hex filters__btn"},"hex"),a.a.createElement("button",{onClick:function(){return o("hsl")},disabled:"hsl"===n,className:"filters__hsl filters__btn"},"hsl")),a.a.createElement("div",{className:"colors-unit filter-color-value__colors-unit filter-color-value__item"},a.a.createElement("div",{onMouseDown:r,className:"colors-unit__values"},u),a.a.createElement("div",{className:"colors-unit__previews"},a.a.createElement("div",{style:{backgroundColor:"rgb(".concat(l,", 0, 0)")},className:"colors-unit__preview"}),a.a.createElement("div",{style:{backgroundColor:"rgb(0, ".concat(i,", 0)")},className:"colors-unit__preview"}),a.a.createElement("div",{style:{backgroundColor:"rgb(0, 0, ".concat(s,")")},className:"colors-unit__preview"}))))}n(22);function g(e){var t=Object(p.a)(e.colors,3),n=t[0],o=t[1],r=t[2],c="rgb(\n        ".concat(n,", ").concat(o,", ").concat(r,"\n    )");return a.a.createElement("div",{style:{backgroundColor:c},className:"display-color palette__display-color"})}n(24);var _=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(i.a)(this,Object(s.a)(t).call(this,e))).handleRandomColor=function(){var e=Object.assign({},n.state.colors);for(var t in e)e[t]=Math.floor(100*Math.random());n.setState({colors:e})},n.handleChangeColorUnit=function(e){n.setState({colorUnit:e})},n.handleChangeColor=function(e,t){n.setState({colors:Object.assign({},n.state.colors,Object(h.a)({},e,t))})},n.state={colors:e.colors,colorUnit:"rgb"},n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"calculateColor",value:function(e){return Math.round(2.55*e)}},{key:"render",value:function(){var e=this,t=this.state,n=t.colors,o=t.colorUnit,r=(t.copy,n.red),c=n.green,l=n.blue,i=[this.calculateColor(r),this.calculateColor(c),this.calculateColor(l)];return a.a.createElement("div",{className:"palette root__palette"},a.a.createElement("div",{className:"palette__item"},a.a.createElement(b,{colors:n,onChange:function(t,n){return e.handleChangeColor(t,n)}}),a.a.createElement("button",{onClick:this.handleRandomColor,className:"random-color palette__random-color"},"random")),a.a.createElement("div",{className:"palette__item"},a.a.createElement(f,{onChangeColor:this.handleChangeColorUnit,onCopy:this.props.onCopy,colorUnit:o,colors:i}),a.a.createElement(g,{colors:i})))}}]),t}(o.Component),C=(n(26),function(e){function t(){var e,n;Object(c.a)(this,t);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(n=Object(i.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(a)))).handleClose=function(){clearTimeout(n.timerId),n.props.onHide()},n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.timerId=setTimeout(function(){e.props.onHide()},1e3)}},{key:"render",value:function(){var e=this.props.children;return a.a.createElement("div",{className:"palette__message message"},a.a.createElement("div",{onClick:this.handleClose,className:"message__close"}),e)}}]),t}(o.Component)),y={red:95,green:40,blue:66},E=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(i.a)(this,Object(s.a)(t).call(this))).handleCopy=function(t){t.preventDefault();var n=document.createRange();n.selectNode(t.target),window.getSelection().addRange(n),document.execCommand("copy"),window.getSelection().removeAllRanges(),e.setState({copy:!0})},e.handleHide=function(){e.setState({copy:!1})},e.state={copy:!1},e}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(_,{onHide:this.handleHide,copy:this.state.copy,onCopy:this.handleCopy,colors:y}),this.state.copy?a.a.createElement(C,{onHide:this.handleHide},"Text have copied"):null)}}]),t}(o.Component);Object(r.render)(a.a.createElement(E,null),document.getElementById("root"))}],[[11,2,1]]]);
//# sourceMappingURL=main.82c106e1.chunk.js.map