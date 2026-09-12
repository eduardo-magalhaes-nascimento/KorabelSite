// Ilustração decorativa inline: silhueta, ramos, laço e monograma.
export default function HeroArtwork() {
  return <div className="artwork-panel" aria-hidden="true">
    <svg viewBox="0 0 480 520" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="petalWash" x1="80" y1="40" x2="420" y2="490" gradientUnits="userSpaceOnUse"><stop stopColor="#f7eee9"/><stop offset="1" stopColor="#e8d5c4"/></linearGradient>
        <g id="flower">{[0,72,144,216,288].map(angle => <ellipse key={angle} cy="-6" rx="3.5" ry="6" fill="#dca4ac" transform={`rotate(${angle})`}/>)}<circle r="2.5" fill="#b8965a"/></g>
      </defs>
      <rect width="480" height="520" rx="12" fill="#f0e0d6"/>
      <rect x="18" y="18" width="444" height="484" rx="110" stroke="#b8965a" strokeOpacity=".35"/>
      <ellipse cx="252" cy="257" rx="147" ry="203" fill="url(#petalWash)"/>
      <path d="M113 423C96 295 122 145 230 94C318 52 382 134 372 231" stroke="#b8965a" strokeWidth=".8" strokeOpacity=".45"/>
      <g stroke="#a0445566" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M268 101C256 83 231 91 227 111C223 130 228 146 241 151C254 155 267 139 268 126C279 123 275 119 270 115L268 101Z"/>
        <path d="M265 100C248 97 247 111 237 115C228 119 223 112 226 104C230 84 261 79 273 98C281 112 279 135 267 146"/>
        <path d="M238 151L234 170C218 179 199 173 190 193C179 221 183 253 173 280C169 292 163 306 159 310C153 316 154 301 159 292L169 260L172 210"/>
        <path d="M259 146L259 168C276 176 295 177 302 193C313 219 310 252 317 273C322 288 331 295 326 300C321 306 311 289 307 280L292 225"/>
        <path d="M209 184C211 205 218 219 233 228C246 218 268 202 283 180"/>
        <path d="M195 202C195 228 213 246 209 265C206 284 186 313 176 335C163 365 146 403 133 429C166 417 180 444 207 442C236 440 247 459 275 448C303 438 321 453 346 434C326 407 312 375 300 343C287 311 267 286 270 264C273 247 288 226 288 206"/>
        <path d="M210 268C228 277 249 278 269 269M210 277C231 285 250 285 270 278M210 282C199 329 190 385 183 429M230 287C218 348 217 398 225 439M249 286C261 334 263 392 279 440M272 291C286 331 300 390 321 434"/>
        <path d="M236 152C244 156 251 155 256 150M236 128C240 131 244 131 247 129" strokeWidth="1"/>
      </g>
      <g stroke="#b8965a" strokeWidth="1" strokeLinecap="round">
        <path d="M67 431C112 375 115 294 83 249M87 399L63 369M102 361L132 335M103 327L80 309M97 298L116 278"/>
        <path d="M395 404C365 352 375 294 414 251M383 372L408 354M381 340L360 316M395 282L425 282"/>
        <path d="M75 191C104 179 127 145 135 114M107 167L94 143M124 139L149 135M353 122C368 150 385 172 417 183"/>
      </g>
      <g fill="#b8965a" fillOpacity=".18" stroke="#b8965a" strokeWidth=".6"><path d="M87 399C57 395 53 377 63 369C75 369 87 379 87 399ZM102 361C105 340 124 331 132 335C132 349 119 361 102 361ZM103 327C80 331 70 319 80 309C91 310 101 319 103 327ZM383 372C382 355 395 346 408 354C409 366 397 373 383 372ZM381 340C360 340 351 327 360 316C373 319 380 329 381 340Z"/></g>
      <g opacity=".75">{[[83,249],[116,278],[414,251],[425,282],[135,114],[94,143],[149,135],[417,183]].map(([x,y])=><use key={x} href="#flower" x={x} y={y}/>)}</g>
      <g stroke="#a04455" strokeOpacity=".42" fill="#dca4ac" fillOpacity=".18" strokeWidth="1.1"><path d="M380 68C350 35 322 46 343 65C352 73 371 73 380 68C401 34 426 41 408 59C399 68 389 70 380 68Z"/><path d="M380 68C371 91 361 103 346 117L357 118L360 129C373 110 380 90 380 68ZM383 69C383 93 396 100 406 112L411 100L422 99C400 90 390 80 383 69Z"/></g>
      <circle cx="93" cy="447" r="31" fill="#f5ede8" stroke="#b8965a" strokeOpacity=".6"/>
      <text x="93" y="465" textAnchor="middle" fill="#b8965a" fontFamily="Cormorant Garamond, serif" fontSize="52" fontStyle="italic">K</text>
      <g fill="#b8965a" opacity=".55"><circle cx="166" cy="83" r="2"/><circle cx="339" cy="281" r="2"/><circle cx="127" cy="218" r="1.5"/><circle cx="369" cy="444" r="2"/></g>
    </svg>
    {Array.from({length:8}, (_, i) => <span key={i} className="petal" style={{left:`${12+i*10}%`,top:`${30+(i*17)%58}%`,animationDelay:`-${i*1.3}s`,animationDuration:`${6+(i%5)}s`}} />)}
  </div>
}
