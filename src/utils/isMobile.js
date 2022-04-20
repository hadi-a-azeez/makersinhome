const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 600;
};

export default isMobile();
