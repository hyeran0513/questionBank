import React, { useEffect } from "react";

const DisplayAds = () => {
  useEffect(() => {
    try {
      if (window.adsbygoogle && window.adsbygoogle.length > 0) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("Adsbygoogle error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={process.env.REACT_APP_AD_CLIENT}
      data-ad-slot={process.env.REACT_APP_AD_SLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default DisplayAds;