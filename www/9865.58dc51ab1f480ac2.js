"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9865],{5984:(W,v,E)=>{E.r(v),E.d(v,{startTapClick:()=>k});var u=E(544);const k=o=>{let e,p,i,s=10*-h,r=0;const _=o.getBoolean("animated",!0)&&o.getBoolean("rippleEffect",!0),l=new WeakMap,L=t=>{s=(0,u.u)(t),R(t)},A=()=>{i&&clearTimeout(i),i=void 0,e&&(S(!1),e=void 0)},D=t=>{e||w(M(t),t)},R=t=>{w(void 0,t)},w=(t,n)=>{if(t&&t===e)return;i&&clearTimeout(i),i=void 0;const{x:d,y:a}=(0,u.v)(n);if(e){if(l.has(e))throw new Error("internal error");e.classList.contains(f)||C(e,d,a),S(!0)}if(t){const g=l.get(t);g&&(clearTimeout(g),l.delete(t)),t.classList.remove(f);const I=()=>{C(t,d,a),i=void 0};m(t)?I():i=setTimeout(I,U)}e=t},C=(t,n,d)=>{if(r=Date.now(),t.classList.add(f),!_)return;const a=P(t);null!==a&&(b(),p=a.addRipple(n,d))},b=()=>{void 0!==p&&(p.then(t=>t()),p=void 0)},S=t=>{b();const n=e;if(!n)return;const d=T-Date.now()+r;if(t&&d>0&&!m(n)){const a=setTimeout(()=>{n.classList.remove(f),l.delete(n)},T);l.set(n,a)}else n.classList.remove(f)},c=document;c.addEventListener("ionGestureCaptured",A),c.addEventListener("touchstart",t=>{s=(0,u.u)(t),D(t)},!0),c.addEventListener("touchcancel",L,!0),c.addEventListener("touchend",L,!0),c.addEventListener("pointercancel",A,!0),c.addEventListener("mousedown",t=>{if(2===t.button)return;const n=(0,u.u)(t)-h;s<n&&D(t)},!0),c.addEventListener("mouseup",t=>{const n=(0,u.u)(t)-h;s<n&&R(t)},!0)},M=o=>{if(void 0===o.composedPath)return o.target.closest(".ion-activatable");{const s=o.composedPath();for(let r=0;r<s.length-2;r++){const e=s[r];if(!(e instanceof ShadowRoot)&&e.classList.contains("ion-activatable"))return e}}},m=o=>o.classList.contains("ion-activatable-instant"),P=o=>{if(o.shadowRoot){const s=o.shadowRoot.querySelector("ion-ripple-effect");if(s)return s}return o.querySelector("ion-ripple-effect")},f="ion-activated",U=100,T=150,h=2500}}]);