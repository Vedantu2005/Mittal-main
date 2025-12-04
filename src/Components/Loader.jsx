import React from "react";

const Loader = () => {
  return (
    <div style={styles.overlay}>
      <img src="/logo.png" alt="Loading" style={styles.logo} />
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
  },

  logo: {
    height: "90px",
    animation: "colorPulse 3s ease-in-out infinite",
  },
};

export default Loader;

// Inject keyframes globally
const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes colorPulse {
  0% { filter: brightness(0.6) saturate(0.8); }
  50% { filter: brightness(1.4) saturate(1.3); }
  100% { filter: brightness(0.6) saturate(0.8); }
}
`;
document.head.appendChild(styleSheet);
