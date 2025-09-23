'use client';

import { useEffect } from 'react';
import { DATA_SOURCES } from '@/contexts/DemoInspectorContext';

type DataSource = 'commerce' | 'catalog' | 'search';

interface SourceOverlayProps {
  activeSources: Set<DataSource>;
}

export function SourceOverlay({ activeSources }: SourceOverlayProps) {
  // Apply visual effects to pre-tagged elements based on active sources
  useEffect(() => {
    const applyHighlights = () => {
      // Remove old overlays
      document.querySelectorAll('.demo-inspector-overlay').forEach((el) => el.remove());

      // Reset all elements first to avoid double-styling
      const allElements = document.querySelectorAll('[data-inspector-source]');
      allElements.forEach((el) => {
        const element = el as HTMLElement;
        if (element.dataset.originalStyles) {
          try {
            const original = JSON.parse(element.dataset.originalStyles);
            element.style.backgroundColor =
              element.dataset.originalBackground || original.backgroundColor || '';
            element.style.boxShadow = original.boxShadow || '';
            element.style.position = original.position || '';
            element.style.zIndex = original.zIndex || '';
            element.style.borderRadius = original.borderRadius || '';

            // Also reset nested input
            const nestedInput = element.querySelector(
              'input[type="text"], input[type="search"], input:not([type])'
            );
            if (
              nestedInput &&
              nestedInput instanceof HTMLElement &&
              nestedInput.dataset.originalBoxShadow !== undefined
            ) {
              nestedInput.style.boxShadow = nestedInput.dataset.originalBoxShadow || '';
            }
          } catch {
            // Reset to defaults if parsing fails
            element.style.backgroundColor = element.dataset.originalBackground || '';
            element.style.boxShadow = '';
            element.style.position = '';
            element.style.zIndex = '';
            element.style.borderRadius = '';

            const nestedInput = element.querySelector(
              'input[type="text"], input[type="search"], input:not([type])'
            );
            if (
              nestedInput &&
              nestedInput instanceof HTMLElement &&
              nestedInput.dataset.originalBoxShadow !== undefined
            ) {
              nestedInput.style.boxShadow = nestedInput.dataset.originalBoxShadow || '';
            }
          }
        }
      });

      if (activeSources.size === 0) return;

      // Apply styles directly to elements instead of creating overlays
      const elements = document.querySelectorAll('[data-inspector-source]');

      // Filter out nested elements with the same source to avoid double borders
      const filteredElements = Array.from(elements).filter((el) => {
        const source = el.getAttribute('data-inspector-source');
        // Check if this element has a parent with the same source
        let parent = el.parentElement;
        while (parent) {
          if (parent.getAttribute('data-inspector-source') === source) {
            // Skip this element as its parent has the same source
            return false;
          }
          parent = parent.parentElement;
        }
        return true;
      });

      filteredElements.forEach((el) => {
        const element = el as HTMLElement;
        const source = element.getAttribute('data-inspector-source') as DataSource;

        // Store original styles
        if (!element.dataset.originalStyles) {
          element.dataset.originalStyles = JSON.stringify({
            backgroundColor: element.style.backgroundColor || '',
            boxShadow: element.style.boxShadow || '',
            position: element.style.position || '',
            zIndex: element.style.zIndex || '',
            borderRadius: element.style.borderRadius || '',
          });
        }

        if (activeSources.has(source)) {
          const sourceInfo = DATA_SOURCES.find((s) => s.id === source);
          if (sourceInfo) {
            // Get the computed border radius of the element
            const computedStyle = window.getComputedStyle(element);
            let borderRadius = computedStyle.borderRadius || '0px';

            // Special case: if this is a search bar or sort dropdown container, inherit border radius from the child
            const elementType = element.getAttribute('data-inspector-type');
            if (elementType === 'search-bar') {
              const input = element.querySelector('input');
              if (input) {
                const inputStyle = window.getComputedStyle(input);
                borderRadius = inputStyle.borderRadius || borderRadius;
              }
            } else if (elementType === 'sort-dropdown') {
              const select = element.querySelector('select');
              if (select) {
                const selectStyle = window.getComputedStyle(select);
                borderRadius = selectStyle.borderRadius || borderRadius;
              }
            }

            // Apply highlight styles directly to the element
            // Use box-shadow instead of outline for rounded corners support
            // Create both outer border and inner highlight
            const outerBorder = `0 0 0 3px ${sourceInfo.color}`;
            element.style.borderRadius = borderRadius;

            // Determine if element needs inset shadow or background
            // Use inset shadow for: text inputs, buttons, cards with images, or elements with white/light backgrounds
            // But NOT for checkboxes or radio buttons
            const isCheckboxOrRadio =
              element.tagName === 'INPUT' &&
              ((element as HTMLInputElement).type === 'checkbox' ||
                (element as HTMLInputElement).type === 'radio');

            const needsInsetShadow =
              (element.tagName === 'INPUT' && !isCheckboxOrRadio) ||
              element.tagName === 'BUTTON' ||
              element.tagName === 'SELECT' ||
              element.querySelector('img') ||
              element.querySelector('input[type="text"]') ||
              element.querySelector('input[type="search"]') ||
              element.classList.contains('card') ||
              element.classList.contains('product') ||
              (element.style.backgroundColor &&
                element.style.backgroundColor !== 'transparent' &&
                element.style.backgroundColor !== 'rgba(0, 0, 0, 0)');

            if (needsInsetShadow) {
              // Use combined box-shadow: outer border + inset shadow
              element.style.boxShadow = `${outerBorder}, inset 0 0 0 1000px ${sourceInfo.color}20`;

              // Also apply to nested text/search inputs if this is a container (but not checkboxes/radios)
              const nestedInput = element.querySelector(
                'input[type="text"], input[type="search"], input:not([type])'
              );
              if (nestedInput && nestedInput instanceof HTMLElement) {
                // Only store original if not already stored
                if (nestedInput.dataset.originalBoxShadow === undefined) {
                  nestedInput.dataset.originalBoxShadow = nestedInput.style.boxShadow || '';
                }
                nestedInput.style.boxShadow = `inset 0 0 0 1000px ${sourceInfo.color}20`;
              }
            } else {
              // For other elements, use outer border shadow + background color
              element.style.boxShadow = outerBorder;
              if (!element.dataset.originalBackground) {
                element.dataset.originalBackground = element.style.backgroundColor || 'transparent';
              }
              element.style.backgroundColor = `${sourceInfo.color}10`;
            }

            // Ensure the element is visible above others
            if (element.style.position === 'static' || !element.style.position) {
              element.style.position = 'relative';
            }
            element.style.zIndex = '10';
          }
        } else {
          // Reset styles (this block should not be reached due to the reset logic above, but kept for safety)
          try {
            const original = JSON.parse(element.dataset.originalStyles || '{}');
            element.style.backgroundColor =
              element.dataset.originalBackground || original.backgroundColor || '';
            element.style.boxShadow = original.boxShadow || '';
            element.style.position = original.position || '';
            element.style.zIndex = original.zIndex || '';
            element.style.borderRadius = original.borderRadius || '';

            // Also reset nested input if it was modified
            const nestedInput = element.querySelector(
              'input[type="text"], input[type="search"], input:not([type])'
            );
            if (
              nestedInput &&
              nestedInput instanceof HTMLElement &&
              nestedInput.dataset.originalBoxShadow !== undefined
            ) {
              nestedInput.style.boxShadow = nestedInput.dataset.originalBoxShadow || '';
              delete nestedInput.dataset.originalBoxShadow;
            }
          } catch {
            // Reset to defaults if parsing fails
            element.style.backgroundColor = element.dataset.originalBackground || '';
            element.style.boxShadow = '';
            element.style.position = '';
            element.style.zIndex = '';
            element.style.borderRadius = '';

            // Also reset nested input in error case
            const nestedInput = element.querySelector(
              'input[type="text"], input[type="search"], input:not([type])'
            );
            if (
              nestedInput &&
              nestedInput instanceof HTMLElement &&
              nestedInput.dataset.originalBoxShadow !== undefined
            ) {
              nestedInput.style.boxShadow = nestedInput.dataset.originalBoxShadow || '';
              delete nestedInput.dataset.originalBoxShadow;
            }
          }
        }
      });
    };

    // Apply highlights initially
    applyHighlights();

    // Set up MutationObserver to watch for both attribute changes and new elements
    const observer = new MutationObserver((mutations) => {
      let shouldReapply = false;

      mutations.forEach((mutation) => {
        // Check for attribute changes
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-inspector-source') {
          shouldReapply = true;
        }

        // Check for new nodes being added
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              // Check if new element or its children have data-inspector-source
              if (
                element.hasAttribute('data-inspector-source') ||
                element.querySelector('[data-inspector-source]')
              ) {
                shouldReapply = true;
              }
            }
          });
        }
      });

      if (shouldReapply) {
        // Small delay to ensure DOM is fully updated
        setTimeout(applyHighlights, 10);
      }
    });

    // Observe the entire document for changes
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-inspector-source'],
      childList: true,
      subtree: true,
    });

    // Cleanup
    return () => {
      observer.disconnect();
      // Reset all element styles
      const allElements = document.querySelectorAll('[data-inspector-source]');
      allElements.forEach((el) => {
        const element = el as HTMLElement;
        try {
          const original = JSON.parse(element.dataset.originalStyles || '{}');
          element.style.backgroundColor =
            element.dataset.originalBackground || original.backgroundColor || '';
          element.style.boxShadow = original.boxShadow || '';
          element.style.position = original.position || '';
          element.style.zIndex = original.zIndex || '';
          element.style.borderRadius = original.borderRadius || '';
          delete element.dataset.originalStyles;
          delete element.dataset.originalBackground;

          // Also cleanup nested input
          const nestedInput = element.querySelector(
            'input[type="text"], input[type="search"], input:not([type])'
          );
          if (
            nestedInput &&
            nestedInput instanceof HTMLElement &&
            nestedInput.dataset.originalBoxShadow !== undefined
          ) {
            nestedInput.style.boxShadow = nestedInput.dataset.originalBoxShadow || '';
            delete nestedInput.dataset.originalBoxShadow;
          }
        } catch {
          element.style.backgroundColor = element.dataset.originalBackground || '';
          element.style.boxShadow = '';
          element.style.position = '';
          element.style.zIndex = '';
          element.style.borderRadius = '';
          delete element.dataset.originalBackground;

          // Also cleanup nested input in error case
          const nestedInput = element.querySelector(
            'input[type="text"], input[type="search"], input:not([type])'
          );
          if (
            nestedInput &&
            nestedInput instanceof HTMLElement &&
            nestedInput.dataset.originalBoxShadow !== undefined
          ) {
            nestedInput.style.boxShadow = nestedInput.dataset.originalBoxShadow || '';
            delete nestedInput.dataset.originalBoxShadow;
          }
        }
      });
    };
  }, [activeSources]);

  return null;
}
