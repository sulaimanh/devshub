const size = {
  phone: "37.5em",
  tabPort: "56.25em",
  tabLand: "75em",
  bigDesktop: "112.5em"
};

export const device = {
  phone: `(max-width: ${size.phone})`,
  tabPort: `(max-width: ${size.tabPort})`,
  tabLand: `(max-width: ${size.tabLand})`,
  bigDesktop: `(min-width: ${size.bigDesktop})`
};
