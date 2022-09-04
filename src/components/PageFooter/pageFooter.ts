/* eslint-disable class-methods-use-this */
/* eslint-disable max-lines-per-function */
import { IPageFooter } from '../../types/interfaces';

class PageFooter implements IPageFooter {
  render() {
    const footer = document.querySelector('.page-footer');
    if (footer) {
      footer.innerHTML = `
      <section class="footer">
      <div class="footer-content container">
        <div class="rs-content">
          <a target="_blank" href="https://rs.school/js/" class="rs-course-link">
            <svg viewBox="0 0 552.8 205.3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <style>.st0{fill:#fff}.st1{clip-path:url(#h)}.st2{clip-path:url(#f)}.st3{clip-path:url(#d)}.st4{clip-path:url(#a)}.st5{fill:#fff;stroke:#000;stroke-width:4;stroke-miterlimit:10}.st6{clip-path:url(#a)}.st6,.st7{fill:none;stroke:#000;stroke-width:4;stroke-miterlimit:10}.st8,.st9{clip-path:url(#j)}.st9{fill:none;stroke:#000;stroke-width:4;stroke-miterlimit:10}</style>
            <title>rs_school_js</title>
            <path d="M285.4 68l26.3-1.7c.6 4.3 1.7 7.5 3.5 9.8 2.9 3.6 6.9 5.4 12.2 5.4 3.9 0 7-.9 9.1-2.8 2-1.5 3.2-3.9 3.2-6.4 0-2.4-1.1-4.7-3-6.2-2-1.8-6.7-3.6-14.1-5.2-12.1-2.7-20.8-6.3-25.9-10.9-5.1-4.3-8-10.6-7.8-17.3 0-4.6 1.4-9.2 4-13 3-4.3 7.1-7.7 12-9.6 5.3-2.3 12.7-3.5 22-3.5 11.4 0 20.1 2.1 26.1 6.4 6 4.2 9.6 11 10.7 20.3l-26 1.5c-.7-4-2.1-6.9-4.4-8.8s-5.3-2.8-9.2-2.8c-3.2 0-5.6.7-7.2 2-1.5 1.2-2.5 3-2.4 5 0 1.5.8 2.9 2 3.8 1.3 1.2 4.4 2.3 9.3 3.3 12.1 2.6 20.7 5.2 26 7.9 5.3 2.7 9.1 6 11.4 9.9 2.4 4 3.6 8.6 3.5 13.3 0 5.6-1.6 11.2-4.8 15.9-3.3 4.9-7.9 8.7-13.3 11-5.7 2.5-12.9 3.8-21.5 3.8-15.2 0-25.7-2.9-31.6-8.8S286.1 77 285.4 68zM6.3 97.6V8.2h46.1c8.5 0 15.1.7 19.6 2.2 4.4 1.4 8.3 4.3 10.9 8.2 2.9 4.3 4.3 9.3 4.2 14.5.3 8.8-4.2 17.2-11.9 21.6-3 1.7-6.3 2.9-9.7 3.5 2.5.7 5 1.9 7.2 3.3 1.7 1.4 3.1 3 4.4 4.7 1.5 1.7 2.8 3.6 3.9 5.6l13.4 25.9H63L48.2 70.2c-1.9-3.5-3.5-5.8-5-6.9-2-1.4-4.4-2.1-6.8-2.1H34v36.3H6.3zM34 44.4h11.7c2.5-.2 4.9-.6 7.3-1.2 1.8-.3 3.4-1.3 4.5-2.8 2.7-3.6 2.3-8.7-1-11.8-1.8-1.5-5.3-2.3-10.3-2.3H34v18.1zM0 174.2l26.3-1.7c.6 4.3 1.7 7.5 3.5 9.8 2.8 3.6 6.9 5.5 12.2 5.5 3.9 0 7-.9 9.1-2.8 2-1.6 3.2-3.9 3.2-6.4 0-2.4-1.1-4.7-3-6.2-2-1.8-6.7-3.6-14.2-5.2-12.1-2.7-20.8-6.3-25.9-10.9-5.1-4.3-8-10.6-7.8-17.3 0-4.6 1.4-9.2 4-13 3-4.3 7.1-7.7 12-9.6 5.3-2.3 12.7-3.5 22-3.5 11.4 0 20.1 2.1 26.1 6.4s9.5 11 10.6 20.3l-26 1.5c-.7-4-2.1-6.9-4.4-8.8-2.2-1.9-5.3-2.8-9.2-2.7-3.2 0-5.6.7-7.2 2.1-1.6 1.2-2.5 3-2.4 5 0 1.5.8 2.9 2 3.8 1.3 1.2 4.4 2.3 9.3 3.3 12.1 2.6 20.7 5.2 26 7.9 5.3 2.7 9.1 6 11.4 9.9 2.4 4 3.6 8.6 3.6 13.2 0 5.6-1.7 11.1-4.8 15.8-3.3 4.9-7.9 8.7-13.3 11-5.7 2.5-12.9 3.8-21.5 3.8-15.2 0-25.7-2.9-31.6-8.8-5.9-6-9.2-13.4-10-22.4z"/>
            <path d="m133 167.2 24.2 7.3c-1.3 6.1-4 11.9-7.7 17-3.4 4.5-7.9 8-13 10.3-5.2 2.3-11.8 3.5-19.8 3.5-9.7 0-17.7-1.4-23.8-4.2-6.2-2.8-11.5-7.8-16-14.9s-6.7-16.2-6.7-27.3c0-14.8 3.9-26.2 11.8-34.1s19-11.9 33.4-11.9c11.3 0 20.1 2.3 26.6 6.8 6.4 4.6 11.2 11.6 14.4 21l-24.4 5.4c-0.6-2.1-1.5-4.2-2.7-6-1.5-2.1-3.4-3.7-5.7-4.9s-4.9-1.7-7.5-1.7c-6.3 0-11.1 2.5-14.4 7.6-2.5 3.7-3.8 9.6-3.8 17.6 0 9.9 1.5 16.7 4.5 20.4s7.2 5.5 12.7 5.5c5.3 0 9.3-1.5 12-4.4 2.7-3.1 4.7-7.4 5.9-13zm56.5-52.8h27.6v31.3h30.2v-31.3h27.8v89.4h-27.8v-36.2h-30.2v36.2h-27.6v-89.4z"/>
            <path d="m271.3 159.1c0-14.6 4.1-26 12.2-34.1s19.5-12.2 34-12.2c14.9 0 26.3 4 34.4 12s12.1 19.2 12.1 33.6c0 10.5-1.8 19-5.3 25.7-3.4 6.6-8.7 12-15.2 15.6-6.7 3.7-15 5.6-24.9 5.6-10.1 0-18.4-1.6-25-4.8-6.8-3.4-12.4-8.7-16.1-15.2-4.1-7-6.2-15.7-6.2-26.2zm27.6 0.1c0 9 1.7 15.5 5 19.5 3.3 3.9 7.9 5.9 13.7 5.9 5.9 0 10.5-1.9 13.8-5.8s4.9-10.8 4.9-20.8c0-8.4-1.7-14.6-5.1-18.4-3.4-3.9-8-5.8-13.8-5.8-5.1-0.2-10 2-13.4 5.9s-5.1 10.4-5.1 19.5zm93.4-0.1c0-14.6 4.1-26 12.2-34.1s19.5-12.2 34-12.2c14.9 0 26.4 4 34.4 12s12.1 19.2 12.1 33.6c0 10.5-1.8 19-5.3 25.7-3.4 6.6-8.7 12-15.2 15.6-6.7 3.7-15 5.6-24.9 5.6-10.1 0-18.4-1.6-25-4.8-6.8-3.4-12.4-8.7-16.1-15.2-4.1-7-6.2-15.7-6.2-26.2zm27.6 0.1c0 9 1.7 15.5 5 19.5 3.3 3.9 7.9 5.9 13.7 5.9 5.9 0 10.5-1.9 13.8-5.8s4.9-10.8 4.9-20.8c0-8.4-1.7-14.6-5.1-18.4-3.4-3.9-8-5.8-13.8-5.8-5.1-0.2-10.1 2-13.4 5.9-3.4 3.9-5.1 10.4-5.1 19.5z"/>
            <path d="M482.1 114.4h27.6v67.4h43.1v22H482v-89.4z"/>
            <ellipse class="st0" transform="rotate(-37.001 420.46 67.88)" cx="420.5" cy="67.9" rx="63" ry="51.8"/>
            <defs>
            <ellipse id="i" transform="rotate(-37.001 420.46 67.88)" cx="420.5" cy="67.9" rx="63" ry="51.8"/>
            </defs>
            <clipPath id="h">
            <use overflow="visible" xlink:href="#i"/>
            </clipPath>
            <g class="st1">
            <path class="st0" transform="rotate(-37.001 420.82 68.353)" d="M330.9-14.2h179.8v165.1H330.9z"/>
            <defs>
            <path id="g" transform="rotate(-37.001 420.82 68.353)" d="M330.9-14.2h179.8v165.1H330.9z"/>
            </defs>
            <clipPath id="f">
            <use overflow="visible" xlink:href="#g"/>
            </clipPath>
            <g class="st2">
            <ellipse class="st0" transform="rotate(-37.001 420.46 67.88)" cx="420.5" cy="67.9" rx="63" ry="51.8"/>
            <defs>
            <ellipse id="e" transform="rotate(-37.001 420.46 67.88)" cx="420.5" cy="67.9" rx="63" ry="51.8"/>
            </defs>
            <clipPath id="d">
            <use overflow="visible" xlink:href="#e"/>
            </clipPath>
            <g class="st3">
            <path class="st0" transform="rotate(-37 420.8 68.802)" d="M357.8 17h125.9v103.7H357.8z"/>
            <defs>
            <path id="c" transform="rotate(-37 420.8 68.802)" d="M357.8 17h125.9v103.7H357.8z"/>
            </defs>
            <clipPath id="a">
            <use overflow="visible" xlink:href="#c"/>
            </clipPath>
            <g class="st4">
            <ellipse class="st5" transform="rotate(-37.001 420.46 67.88)" cx="420.5" cy="67.9" rx="63" ry="51.8"/>
            </g>
            <path class="st6" transform="rotate(-37 420.8 68.802)" d="M357.8 17h125.9v103.7H357.8z"/>
            <ellipse class="st7" transform="rotate(-37.001 420.46 67.88)" cx="420.5" cy="67.9" rx="63" ry="51.8"/>
            <path class="st0" transform="rotate(-37 420.8 68.802)" d="M357.8 17h125.9v103.7H357.8z"/>
            <defs>
            <path id="b" transform="rotate(-37 420.8 68.802)" d="M357.8 17h125.9v103.7H357.8z"/>
            </defs>
            <clipPath id="j">
            <use overflow="visible" xlink:href="#b"/>
            </clipPath>
            <g class="st8">
            <ellipse class="st5" transform="rotate(-37.001 420.46 67.88)" cx="420.5" cy="67.9" rx="63" ry="51.8"/>
            </g>
            <path class="st9" transform="rotate(-37 420.8 68.802)" d="M357.8 17h125.9v103.7H357.8z"/>
            <path class="st7" transform="rotate(-37.001 420.82 68.353)" d="M330.9-14.2h179.8v165.1H330.9z"/>
            </g>
            <ellipse class="st7" transform="rotate(-37.001 420.46 67.88)" cx="420.5" cy="67.9" rx="63" ry="51.8"/>
            <path d="M392.4 61.3l10-7 12.3 17.5c2.1 2.8 3.7 5.8 4.9 9.1.7 2.5.5 5.2-.5 7.6-1.3 3-3.4 5.5-6.2 7.3-3.3 2.3-6.1 3.6-8.5 4-2.3.4-4.7 0-6.9-1-2.4-1.2-4.5-2.9-6.1-5.1l8.6-8c.7 1.1 1.6 2.1 2.6 2.9.7.5 1.5.8 2.4.8.7 0 1.4-.3 1.9-.7 1-.6 1.7-1.8 1.6-3-.3-1.7-1-3.4-2.1-4.7l-14-19.7zm30 11.1l9.1-7.2c1 1.2 2.3 2.1 3.7 2.6 2 .6 4.1.2 5.8-1.1 1.2-.8 2.2-1.9 2.6-3.3.6-1.8-.4-3.8-2.2-4.4-.3-.1-.6-.2-.9-.2-1.2-.1-3.3.4-6.4 1.7-5.1 2.1-9.1 2.9-12.1 2.6-2.9-.3-5.6-1.8-7.2-4.3-1.2-1.7-1.8-3.7-1.9-5.7 0-2.3.6-4.6 1.9-6.5 1.9-2.7 4.2-5 7-6.8 4.2-2.9 7.9-4.3 11.1-4.3 3.2 0 6.2 1.5 9 4.6l-9 7.1c-1.8-2.3-5.2-2.8-7.5-1l-.3.3c-1 .6-1.7 1.5-2.1 2.6-.3.8-.1 1.7.4 2.4.4.5 1 .9 1.7.9.8.1 2.2-.3 4.2-1.2 5-2.1 8.8-3.3 11.4-3.7 2.2-.4 4.5-.2 6.6.7 1.9.8 3.5 2.2 4.6 3.9 1.4 2 2.2 4.4 2.3 6.9.1 2.6-.6 5.1-2 7.3-1.8 2.7-4.1 5-6.8 6.8-5.5 3.8-10 5.4-13.6 4.8-3.9-.6-7.1-2.6-9.4-5.5z"/>
            </g>
            </g>
          </svg>
          </a>
          <div class="rs-other-links">
            <div class="rs-github-link">
              <a href="https://github.com/rolling-scopes-school" target="_blank">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.3035 0C5.50583 0 0 5.50583 0 12.3035C0 17.7478 3.52188 22.3463 8.41254 23.9765C9.02771 24.0842 9.2584 23.715 9.2584 23.3921C9.2584 23.0999 9.24302 22.131 9.24302 21.1005C6.15176 21.6696 5.35203 20.347 5.10596 19.6549C4.96755 19.3012 4.36775 18.2092 3.84485 17.917C3.41423 17.6863 2.79905 17.1173 3.82947 17.1019C4.79838 17.0865 5.49045 17.9939 5.72114 18.363C6.82846 20.2239 8.59709 19.701 9.30454 19.3781C9.4122 18.5783 9.73516 18.04 10.0889 17.7325C7.35136 17.4249 4.49079 16.3637 4.49079 11.6576C4.49079 10.3196 4.96755 9.21227 5.7519 8.35102C5.62886 8.04343 5.19824 6.78232 5.87493 5.09058C5.87493 5.09058 6.90535 4.76762 9.2584 6.3517C10.2427 6.07487 11.2885 5.93645 12.3343 5.93645C13.3801 5.93645 14.4259 6.07487 15.4102 6.3517C17.7632 4.75224 18.7936 5.09058 18.7936 5.09058C19.4703 6.78232 19.0397 8.04343 18.9167 8.35102C19.701 9.21227 20.1778 10.3042 20.1778 11.6576C20.1778 16.3791 17.3018 17.4249 14.5643 17.7325C15.0103 18.1169 15.3948 18.8552 15.3948 20.0086C15.3948 21.6542 15.3794 22.9768 15.3794 23.3921C15.3794 23.715 15.6101 24.0995 16.2253 23.9765C18.6679 23.1521 20.7904 21.5824 22.294 19.4884C23.7976 17.3944 24.6066 14.8815 24.6071 12.3035C24.6071 5.50583 19.1012 0 12.3035 0Z" fill="#462A69"/>
                </svg>
              </a>
            </div>
            <div class="rs-youtube-link">
              <a href="https://www.youtube.com/c/RollingScopesSchool" target="_blank">
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0765 0.998501H12.21C13.443 1.003 19.6905 1.048 21.375 1.501C21.8842 1.63925 22.3483 1.90873 22.7207 2.28251C23.0932 2.65629 23.361 3.12128 23.4975 3.631C23.649 4.201 23.7555 4.9555 23.8275 5.734L23.8425 5.89L23.8755 6.28L23.8875 6.436C23.985 7.807 23.997 9.091 23.9985 9.3715V9.484C23.997 9.775 23.9835 11.146 23.8755 12.574L23.8635 12.7315L23.85 12.8875C23.775 13.7455 23.664 14.5975 23.4975 15.2245C23.3615 15.7344 23.0938 16.1996 22.7212 16.5735C22.3487 16.9473 21.8844 17.2167 21.375 17.3545C19.635 17.8225 13.0215 17.8555 12.105 17.857H11.892C11.4285 17.857 9.5115 17.848 7.5015 17.779L7.2465 17.77L7.116 17.764L6.8595 17.7535L6.603 17.743C4.938 17.6695 3.3525 17.551 2.622 17.353C2.11273 17.2153 1.6486 16.9462 1.27609 16.5726C0.903575 16.199 0.63577 15.7342 0.4995 15.2245C0.333 14.599 0.222 13.7455 0.147 12.8875L0.135 12.73L0.123 12.574C0.0489714 11.5576 0.0079498 10.5391 0 9.52L0 9.3355C0.003 9.013 0.015 7.8985 0.096 6.6685L0.1065 6.514L0.111 6.436L0.123 6.28L0.156 5.89L0.171 5.734C0.243 4.9555 0.3495 4.1995 0.501 3.631C0.63704 3.12107 0.904743 2.65587 1.27727 2.28202C1.6498 1.90818 2.11405 1.63884 2.6235 1.501C3.354 1.306 4.9395 1.186 6.6045 1.111L6.8595 1.1005L7.1175 1.0915L7.2465 1.087L7.503 1.0765C8.93056 1.03056 10.3587 1.00506 11.787 1H12.0765V0.998501ZM9.6 5.8135V13.0405L15.8355 9.4285L9.6 5.8135Z" fill="#462A69"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="year">
          <p>&copy;  2022</p>
        </div>
        <div class="content-developers">
          <h4 class="developers-title">Developers</h4>
          <div class="developers">
            <a target="_blank" href="https://github.com/auddax" class="developer">auddax</a>
            <a target="_blank" href="https://github.com/zone0119" class="developer">zone0119</a>
            <a target="_blank" href="https://github.com/omkavtanke" class="developer">omkavtanke</a>
           </div>
        </div>
      </div>
  </section>
      `;
    }
  }
}
export default PageFooter;