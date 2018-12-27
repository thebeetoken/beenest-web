export function cover(
  hasContent: boolean = false, 
  hasPointerEventsNone: boolean = true, 
  isFixed: boolean = false
) {
  return `
    content: ${hasContent ? "''" : 'normal'};
    bottom: 0;
    left: 0;
    pointer-events: ${hasPointerEventsNone ? 'none' : 'auto'};
    position: ${isFixed ? 'fixed' : 'absolute'};
    right: 0;
    top: 0;
  `;
}
