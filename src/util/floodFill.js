/*
 * FloodFill for fabric.js
 * @author Arjan Haverkamp (av01d)
 * @date October 2018
 * 
 * via http://jsfiddle.net/av01d/dfvp9j2u/
 */
 
export const FloodFill={withinTolerance:function(o,r,n,i){var t=n.length,l=r+t;for(i=i||0;l--&&t--;)if(Math.abs(o[l]-n[t])>i)return!1;return!0},fill:function(o,r,n,i,t,l,_,e){for(var $,f,h,c,u,a,d,p=[[1,0],[0,1],[0,-1],[-1,0]],s=[],x=[n],F={},g=-1,w=-1,y=-1,v=-1;n=x.pop();)if(c=r(f=n.x,h=n.y),FloodFill.withinTolerance(o,c,t,l))for(f>w&&(w=f),h>v&&(v=h),(f<g||-1==g)&&(g=f),(h<y||-1==y)&&(y=h),u=p.length;u--;)u<4&&(o[c+u]=i[u],s[c+u]=i[u]),$=(a=f+p[u][0])+","+(d=h+p[u][1]),!(a<0)&&!(d<0)&&!(a>=_)&&!(d>=e)&&!F[$]&&(x.push({x:a,y:d}),F[$]=!0);return{x:g,y:y,width:w-g,height:v-y,coords:s}}};