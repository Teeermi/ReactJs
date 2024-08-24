import { useEffect } from "react";

export function useKey(key, action) {
  key = key.toLowerCase().slice(0, 1).toUpperCase() + key.toLowerCase().slice(1);
  useEffect(
    function () {
      function callback(e) {
        if (e.code === key) {
          action();
        }
      }

      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
