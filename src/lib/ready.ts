/**
 * Two moments in a page's arrival:
 *
 * - "ready": the page is starting to show — the preloader lifting on a full
 *   load, or the transition pixels beginning to clear after a client
 *   navigation. Entrance animations start here, so they play as the cover
 *   dissolves rather than behind it.
 * - "revealed": the cover has fully cleared. Longer set pieces (the hero's
 *   pixels assembling) wait for this so they are seen from the start.
 *
 * Without a cover (back/forward, reduced motion) both happen at once.
 */
let ready = false;
let revealed = false;
const readyListeners = new Set<() => void>();
const revealedListeners = new Set<() => void>();

function flush(set: Set<() => void>) {
  const queued = [...set];
  set.clear();
  queued.forEach((fn) => fn());
}

export function markReady() {
  if (ready) return;
  ready = true;
  flush(readyListeners);
}

export function markRevealed() {
  markReady();
  if (revealed) return;
  revealed = true;
  flush(revealedListeners);
}

export function resetReady() {
  ready = false;
  revealed = false;
}

export function isReady() {
  return ready;
}

function subscribe(set: Set<() => void>, done: boolean, fn: () => void) {
  if (done) {
    fn();
    return () => {};
  }
  set.add(fn);
  return () => {
    set.delete(fn);
  };
}

/** Runs `fn` once the page starts to show. Returns an unsubscribe. */
export function onReady(fn: () => void) {
  return subscribe(readyListeners, ready, fn);
}

/** Runs `fn` once the page is fully uncovered. Returns an unsubscribe. */
export function onRevealed(fn: () => void) {
  return subscribe(revealedListeners, revealed, fn);
}
