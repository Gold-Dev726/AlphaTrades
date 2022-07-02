import React, { useEffect } from "react";

const EmbrWidget = () => {
  useEffect(() => {
    // Add Chatwoot Settings
    (function () {
      if (!window.EMBR) {
        const t = [];
        window.EMBR = { _init: t, mount: (e) => t.push(e) };
      }
    })();
    /* START EMBED CODE */
    window.EMBR.mount({
      type: "CheckoutLaunchButton",
      options: {
        checkoutId: "01G6ADJ8476VXBH7WXS6FTNCTT",
        label: "Buy $Wolf",
        logoUrl: "https://i.imgur.com/IWuupFi.jpeg",
        theme: "custom",
        backgroundColor: "#c03fc4"
      }
    });
    /* END EMBED CODE */
  }, []);
  return null;
};
export default EmbrWidget;
