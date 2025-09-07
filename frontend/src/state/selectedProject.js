let selectedProjectId = null;

try {
  const stored = typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('selectedProjectId') : null;
  if (stored !== null && stored !== '') {
    const parsed = parseInt(stored, 10);
    if (!Number.isNaN(parsed)) selectedProjectId = parsed;
  }
} catch (_) {}

const listeners = new Set();

export const getSelectedProjectId = () => selectedProjectId;

export const setSelectedProjectId = (id) => {
  selectedProjectId = id;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (id == null) {
        window.localStorage.removeItem('selectedProjectId');
      } else {
        window.localStorage.setItem('selectedProjectId', String(id));
      }
    }
  } catch (_) {}
  listeners.forEach((fn) => {
    try { fn(selectedProjectId); } catch (_) {}
  });
  try {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('selectedProjectChanged', { detail: selectedProjectId }));
    }
  } catch (_) {}
};

export const subscribeSelectedProject = (fn) => {
  if (typeof fn !== 'function') return () => {};
  listeners.add(fn);
  return () => listeners.delete(fn);
};



