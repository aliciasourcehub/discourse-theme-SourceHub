import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "custom-search-bar",
  initialize() {
    withPluginApi("0.8.31", (api) => {
      api.onPageChange(() => {
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