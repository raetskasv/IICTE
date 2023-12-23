(function(){"use strict";class z{constructor(s,t,o){this.cumsum=[];for(let e=0;e<o;e++){this.cumsum.push([]);for(let n=0;n<t;n++)this.cumsum[e].push(0)}this.cumsum[0][0]=s[0];for(let e=1;e<t;e++)this.cumsum[0][e]=this.cumsum[0][e-1]+s[e];for(let e=1;e<o;e++)this.cumsum[e][0]=this.cumsum[e-1][0]+s[e*t];for(let e=1;e<o;e++)for(let n=1;n<t;n++)this.cumsum[e][n]=s[e*t+n]+this.cumsum[e-1][n]+this.cumsum[e][n-1]-this.cumsum[e-1][n-1]}query(s,t,o,e){let n=this.cumsum[e][o];return t>0&&(n-=this.cumsum[t-1][o]),s>0&&(n-=this.cumsum[e][s-1]),s>0&&t>0&&(n+=this.cumsum[t-1][s-1]),n}}const C=10,b=2,M=6,F=5,I=.95,L=.9,O=.2,Z=8,N=24*2/3,U=r=>{const{data:s,width:t,height:o,scale:e}=r,n=[t*o];for(let i=0;i<n.length;i++)n[i]=!1;const a=new Float32Array(s.length);for(let i=0;i<t;i++)a[i]=-1,a[t*(o-1)+i]=-1;for(let i=0;i<o;i++)a[i*t]=-1,a[i*t+t-1]=-1;for(let i=1;i<t-1;i++)for(let p=1;p<o-1;p++){let f=i+t*p,h=0,c=0;for(let u=-1;u<=1;u++)h+=s[f+t*u+1]-s[f+t*u-1],c+=s[f+t+u]-s[f-t+u];h/=3*256,c/=3*256,a[f]=Math.sqrt((h*h+c*c)/2)}const g=new Uint32Array(1e3);for(let i=0;i<1e3;i++)g[i]=0;const d=[-1,1,-t,t];for(let i=1;i<t-1;i++)for(let p=1;p<o-1;p++){let f=i+t*p,h=!0;for(let c=0;c<d.length;c++)if(a[f]<=a[f+d[c]]){h=!1;break}if(h){let c=Math.floor(a[f]*1e3);c>999&&(c=999),c<0&&(c=0),g[c]+=1,n[f]=!0}}const w=.02*t*o;let j=999,E=0;for(;j>=0&&(E+=g[j],!(E>w));)j--;for(let i=0;i<n.length;i++)n[i]&&a[i]*1e3<j&&(n[i]=!1);const l=[];for(let i=0;i<s.length;i++)l[i]=s[i]*s[i];const S=new z(s,t,o),D=new z(l,t,o),_=new Float32Array(s.length);for(let i=0;i<t;i++)for(let p=0;p<o;p++){const f=p*t+i;if(!n[f]){_[f]=1;continue}const h=P({image:r,cx:i,cy:p,sdThresh:F,imageDataCumsum:S,imageDataSqrCumsum:D});if(h===null){_[f]=1;continue}let c=-1;for(let u=-C;u<=C;u++){for(let m=-C;m<=C;m++){if(m*m+u*u<=b*b)continue;const x=R({image:r,cx:i+m,cy:p+u,vlen:h,tx:i,ty:p,imageDataCumsum:S,imageDataSqrCumsum:D});if(x!==null&&x>c&&(c=x,c>I))break}if(c>I)break}_[f]=c}return V({image:r,featureMap:_,templateSize:M,searchSize:b,occSize:N,maxSimThresh:L,minSimThresh:O,sdThresh:Z,imageDataCumsum:S,imageDataSqrCumsum:D})},V=r=>{let{image:s,featureMap:t,templateSize:o,searchSize:e,occSize:n,maxSimThresh:a,minSimThresh:g,sdThresh:d,imageDataCumsum:w,imageDataSqrCumsum:j}=r;const{data:E,width:l,height:S,scale:D}=s;n=Math.floor(Math.min(s.width,s.height)/10);const _=(o*2+1)*3,q=Math.floor(l/_),i=Math.floor(S/_);let p=Math.floor(l/n)*Math.floor(S/n)+q*i;const f=[],h=new Float32Array(E.length);for(let u=0;u<h.length;u++)h[u]=t[u];let c=0;for(;c<p;){let u=a,m=-1,x=-1;for(let y=0;y<S;y++)for(let T=0;T<l;T++)h[y*l+T]<u&&(u=h[y*l+T],m=T,x=y);if(m===-1)break;const v=P({image:s,cx:m,cy:x,sdThresh:0,imageDataCumsum:w,imageDataSqrCumsum:j});if(v===null){h[x*l+m]=1;continue}if(v/(o*2+1)<d){h[x*l+m]=1;continue}let k=1,A=-1;for(let y=-e;y<=e;y++){for(let T=-e;T<=e;T++){if(T*T+y*y>e*e||T===0&&y===0)continue;const H=R({image:s,vlen:v,cx:m+T,cy:x+y,tx:m,ty:x,imageDataCumsum:w,imageDataSqrCumsum:j});if(H!==null&&(H<k&&(k=H,k<g&&k<u)||H>A&&(A=H,A>.99)))break}if(k<g&&k<u||A>.99)break}if(k<g&&k<u||A>.99){h[x*l+m]=1;continue}f.push({x:m,y:x}),c+=1;for(let y=-n;y<=n;y++)for(let T=-n;T<=n;T++)x+y<0||x+y>=S||m+T<0||m+T>=l||(h[(x+y)*l+(m+T)]=1)}return f},P=({image:r,cx:s,cy:t,sdThresh:o,imageDataCumsum:e,imageDataSqrCumsum:n})=>{if(s-M<0||s+M>=r.width||t-M<0||t+M>=r.height)return null;const a=2*M+1,g=a*a;let d=e.query(s-M,t-M,s+M,t+M);d/=g;let w=n.query(s-M,t-M,s+M,t+M);return w-=2*d*e.query(s-M,t-M,s+M,t+M),w+=g*d*d,w/g<o*o?null:(w=Math.sqrt(w),w)},R=r=>{const{image:s,cx:t,cy:o,vlen:e,tx:n,ty:a,imageDataCumsum:g,imageDataSqrCumsum:d}=r,{data:w,width:j,height:E}=s,l=M;if(t-l<0||t+l>=j||o-l<0||o+l>=E)return null;const S=2*l+1;let D=g.query(t-l,o-l,t+l,o+l),_=d.query(t-l,o-l,t+l,o+l),q=0,i=(o-l)*j+(t-l),p=(a-l)*j+(n-l),f=j-S;for(let m=0;m<S;m++){for(let x=0;x<S;x++)q+=w[i]*w[p],i+=1,p+=1;i+=f,p+=f}let h=g.query(n-l,a-l,n+l,a+l);h/=S*S,q-=h*D;let c=_-D*D/(S*S);return c==0?null:(c=Math.sqrt(c),1*q/(e*c))},W=({image:r,ratio:s})=>{const t=Math.round(r.width*s),o=Math.round(r.height*s),e=new Uint8Array(t*o);for(let n=0;n<t;n++){let a=Math.round(1*n/s),g=Math.round(1*(n+1)/s)-1;g>=r.width&&(g=r.width-1);for(let d=0;d<o;d++){let w=Math.round(1*d/s),j=Math.round(1*(d+1)/s)-1;j>=r.height&&(j=r.height-1);let E=0,l=0;for(let S=a;S<=g;S++)for(let D=w;D<=j;D++)E+=1*r.data[D*r.width+S],l+=1;e[d*t+n]=Math.floor(E/l)}}return{data:e,width:t,height:o}},X=r=>{const s=Math.min(r.width,r.height),t=[],o=[];t.push(256/s),t.push(128/s);for(let e=0;e<t.length;e++)o.push(Object.assign(W({image:r,ratio:t[e]}),{scale:t[e]}));return o};onmessage=r=>{const{data:s}=r;if(s.type==="compile"){const{targetImages:t}=s,o=50/t.length;let e=0;const n=[];for(let a=0;a<t.length;a++){const g=t[a],d=X(g),w=o/d.length,j=Y(d,E=>{e+=w,postMessage({type:"progress",percent:e})});n.push(j)}postMessage({type:"compileDone",list:n})}};const Y=(r,s)=>{const t=[];for(let o=0;o<r.length;o++){const e=r[o],n=U(e),a={data:e.data,scale:e.scale,width:e.width,height:e.height,points:n};t.push(a),s(o)}return t}})();