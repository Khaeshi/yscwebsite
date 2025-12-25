import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as n}from"./index.DU3vxRAH.js";function p({variant:t="combo",intensity:o="medium",isActivated:i=!0}){const[l,r]=n.useState([]),c=()=>{switch(o){case"subtle":return 15;case"medium":return 30;case"festive":return 50;default:return 30}};if(n.useEffect(()=>{if(!i||t!=="snowfall"&&t!=="combo")return;const a=[],f=c();for(let s=0;s<f;s++)a.push({id:s,left:Math.random()*100,animationDuration:10+Math.random()*20,animationDelay:Math.random()*10,size:.5+Math.random()*1.5,opacity:.3+Math.random()*.7});r(a)},[t,o,i]),!i)return null;const d=t==="snowfall"||t==="combo",m=t==="ornaments"||t==="combo";return e.jsxs("div",{className:"fixed inset-0 pointer-events-none z-50 overflow-hidden",children:[d&&e.jsx("div",{className:"absolute inset-0 animate-fade-out-snowfall",style:{opacity:1},children:l.map(a=>e.jsx("div",{className:"absolute text-white",style:{left:`${a.left}%`,top:"-10%",fontSize:`${a.size}rem`,opacity:a.opacity,animation:`snowfall ${a.animationDuration}s linear ${a.animationDelay}s infinite`},children:"❄"},a.id))}),m&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"absolute top-4 right-4 animate-swing animate-fade-in-decoration",style:{animationDelay:"0s",opacity:0},children:e.jsxs("svg",{width:"60",height:"80",viewBox:"0 0 60 80",className:"drop-shadow-lg",children:[e.jsx("line",{x1:"30",y1:"0",x2:"30",y2:"20",stroke:"#DAA520",strokeWidth:"2"}),e.jsx("rect",{x:"25",y:"18",width:"10",height:"6",rx:"1",fill:"#DAA520"}),e.jsx("circle",{cx:"30",cy:"40",r:"18",fill:"#dc2626",className:"animate-glow-red"}),e.jsx("circle",{cx:"30",cy:"40",r:"18",fill:"url(#ornamentGradient)",opacity:"0.6"}),e.jsx("ellipse",{cx:"24",cy:"34",rx:"6",ry:"8",fill:"white",opacity:"0.4"}),e.jsx("defs",{children:e.jsxs("radialGradient",{id:"ornamentGradient",children:[e.jsx("stop",{offset:"0%",stopColor:"#fff",stopOpacity:"0.3"}),e.jsx("stop",{offset:"100%",stopColor:"#dc2626",stopOpacity:"0.1"})]})})]})}),e.jsx("div",{className:"absolute bottom-8 left-4 animate-bounce-slow animate-fade-in-decoration",style:{animationDelay:"2s",opacity:0},children:e.jsxs("svg",{width:"70",height:"70",viewBox:"0 0 70 70",className:"drop-shadow-lg",children:[e.jsx("rect",{x:"10",y:"25",width:"50",height:"40",rx:"2",fill:"#dc2626"}),e.jsx("rect",{x:"10",y:"25",width:"50",height:"40",rx:"2",fill:"url(#giftGradient)",opacity:"0.3"}),e.jsx("rect",{x:"32",y:"25",width:"6",height:"40",fill:"#DAA520"}),e.jsx("rect",{x:"10",y:"42",width:"50",height:"6",fill:"#DAA520"}),e.jsx("ellipse",{cx:"25",cy:"20",rx:"8",ry:"6",fill:"#DAA520",className:"animate-pulse-slow"}),e.jsx("ellipse",{cx:"45",cy:"20",rx:"8",ry:"6",fill:"#DAA520",className:"animate-pulse-slow"}),e.jsx("circle",{cx:"35",cy:"20",r:"5",fill:"#DAA520"}),e.jsx("defs",{children:e.jsxs("linearGradient",{id:"giftGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"#fff",stopOpacity:"0.3"}),e.jsx("stop",{offset:"100%",stopColor:"#000",stopOpacity:"0.2"})]})})]})}),e.jsx("div",{className:"absolute top-1/4 left-1/4 animate-twinkle animate-fade-in-decoration",style:{animationDelay:"1s",opacity:0},children:e.jsx("span",{className:"text-yellow-400 text-2xl drop-shadow-glow",children:"⭐"})}),e.jsx("div",{className:"absolute top-1/3 right-1/4 animate-twinkle animate-fade-in-decoration",style:{animationDelay:"3s",opacity:0},children:e.jsx("span",{className:"text-yellow-400 text-xl drop-shadow-glow",children:"✨"})}),e.jsx("div",{className:"absolute bottom-1/3 left-1/3 animate-twinkle animate-fade-in-decoration",style:{animationDelay:"4s",opacity:0},children:e.jsx("span",{className:"text-yellow-400 text-2xl drop-shadow-glow",children:"⭐"})}),e.jsx("div",{className:"absolute top-1/2 right-1/3 animate-twinkle animate-fade-in-decoration",style:{animationDelay:"5s",opacity:0},children:e.jsx("span",{className:"text-yellow-400 text-xl drop-shadow-glow",children:"✨"})})]}),e.jsx("style",{children:`
        @keyframes snowfall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) translateX(100px) rotate(360deg);
          }
        }

        @keyframes sway {
          0%, 100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        @keyframes swing {
          0%, 100% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }

        @keyframes swing-slow {
          0%, 100% {
            transform: rotate(-8deg);
          }
          50% {
            transform: rotate(8deg);
          }
        }

        @keyframes swing-bell {
          0%, 100% {
            transform: translateX(-2px);
          }
          50% {
            transform: translateX(2px);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes glow-red {
          0%, 100% {
            filter: drop-shadow(0 0 2px #dc2626);
          }
          50% {
            filter: drop-shadow(0 0 6px #dc2626);
          }
        }

        @keyframes glow-gold {
          0%, 100% {
            filter: drop-shadow(0 0 2px #DAA520);
          }
          50% {
            filter: drop-shadow(0 0 6px #DAA520);
          }
        }

        @keyframes fade-in-decoration {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes fade-out-snowfall {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .animate-sway {
          animation: sway 3s ease-in-out infinite;
        }

        .animate-swing {
          animation: swing 2s ease-in-out infinite;
        }

        .animate-swing-slow {
          animation: swing-slow 3s ease-in-out infinite;
        }

        .animate-swing-bell {
          animation: swing-bell 0.5s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-glow-red {
          animation: glow-red 2s ease-in-out infinite;
        }

        .animate-glow-gold {
          animation: glow-gold 2s ease-in-out infinite;
        }

        .animate-fade-in-decoration {
          animation: fade-in-decoration 10s ease-in-out forwards;
        }

        .animate-fade-out-snowfall {
          animation: fade-out-snowfall 15s ease-in-out forwards;
        }

        .drop-shadow-glow {
          filter: drop-shadow(0 0 4px currentColor);
        }
      `})]})}export{p as ChristmasDecoration};
