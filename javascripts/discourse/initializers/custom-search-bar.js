import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "custom-search-bar",
  initialize() {
    withPluginApi("0.8.31", (api) => {
      api.onPageChange(() => {
        // Move the banner to the correct spot
        const banner = document.querySelector(".search-banner");
        const wrap = document.querySelector(".wrap");
        const mainOutlet = document.querySelector("#main-outlet");

        if (banner && wrap && mainOutlet) {
          // Insert the banner inside the wrap, just before the main-outlet
          wrap.insertBefore(banner, mainOutlet);
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