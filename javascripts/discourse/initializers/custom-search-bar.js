import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "custom-search-bar",
  initialize() {
    withPluginApi("0.8.31", (api) => {
      api.onPageChange(() => {
        // Check if the banner already exists to avoid duplicates
        if (!document.querySelector(".search-banner")) {
          // Create the banner element
          const banner = document.createElement("div");
          banner.className = "below-site-header-outlet search-banner welcome-banner";
          banner.innerHTML = `
            <div class="custom-search-banner welcome-banner__inner-wrapper">
              <div class="custom-search-banner-wrap welcome-banner__wrap">
                <h1>Welcome to SourceHub Forum</h1>
                <p>Helpful resources: <a href="/t/about" style="text-decoration:underline;color:#fff">About</a> | <a href="/faq" style="text-decoration:underline;color:#fff">FAQ</a></p>
                <div class="search-menu welcome-banner__search-menu">
                  <a href="/search?expanded=true" class="btn no-text btn-icon btn search-icon" title="Open advanced search">
                    <svg class="fa d-icon d-icon-magnifying-glass svg-icon svg-string" xmlns="http://www.w3.org/2000/svg">
                      <use href="#magnifying-glass"></use>
                    </svg>
                    <span aria-hidden="true"></span>
                  </a>
                  <div class="search-menu-container menu-panel-results">
                    <div class="search-input-wrapper">
                      <div class="search-input search-input--">
                        <input id="custom-search-input" class="search-term__input" autocomplete="off" enterkeyhint="search" placeholder="Search" aria-label="Search" type="search">
                        <button class="btn no-text btn-icon btn-transparent show-advanced-search" title="Open advanced search" type="button">
                          <svg class="fa d-icon d-icon-sliders svg-icon svg-string" xmlns="http://www.w3.org/2000/svg">
                            <use href="#sliders"></use>
                          </svg>
                          <span aria-hidden="true"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;

          // Insert the banner into the DOM
          const headerOutlet = document.querySelector(".below-site-header-outlet");
          if (headerOutlet) {
            headerOutlet.appendChild(banner);
          } else {
            // Fallback: If the outlet isn't found, append to the body
            document.body.appendChild(banner);
          }
        }

        // Add search functionality
        const searchInput = document.getElementById("custom-search-input");
        if (searchInput) {
          searchInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
              const query = encodeURIComponent(searchInput.value);
              window.location.href = `/search?q=${query}`;
            }
          });
        }
      });
    });
  },
};