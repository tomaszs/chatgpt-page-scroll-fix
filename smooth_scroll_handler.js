function initializeScrollHandler() {
    console.log("Initializing scroll handler...");

    let targetScrollPosition = 0; // Desired scroll position
    let isScrolling = false; // Flag to prevent multiple scrolling loops
    const basePageDistance = window.innerHeight; // Base distance for one page scroll
    let scrollSpeedMultiplier = 1; // Multiplier for increasing scroll speed
    const multiplierResetTime = 300; // Time in ms to reset multiplier if no press
    let lastKeyPressTime = 0; // Time of the last key press
    let multiplierTimeout = null; // Timeout ID for resetting the multiplier
    let isKeyHeld = false; // Tracks if the key is being held

    function isScrollable(element) {
        const style = window.getComputedStyle(element);
        return (
            element.scrollHeight > element.clientHeight || 
            element.scrollWidth > element.clientWidth
        ) && 
        (style.overflowY === 'scroll' || style.overflowY === 'auto');
    }

    function isInputTextareaOrContentEditableFocused() {
        const activeElement = document.activeElement;

        return (
            activeElement &&
            (
                ['INPUT', 'TEXTAREA'].includes(activeElement.tagName) || 
                activeElement.isContentEditable
            )
        );
    }

    function getScrollableElement() {
        const hoveredElement = Array.from(document.querySelectorAll('*')).find(
            (element) => isScrollable(element) && element.matches(':hover')
        );
        return hoveredElement || document.activeElement.closest('*') || document.activeElement || window;
    }

    function updateTargetScrollPosition(key) {
        const scrollContainer = getScrollableElement();
        const currentScrollTop = scrollContainer === window ? window.scrollY : scrollContainer.scrollTop;

        const pageDistance = basePageDistance * scrollSpeedMultiplier;

        if (key === 'PageDown') {
            targetScrollPosition = currentScrollTop + pageDistance;
        } else if (key === 'PageUp') {
            targetScrollPosition = currentScrollTop - pageDistance;
        } else if (key === 'Home') {
            targetScrollPosition = 0; // Scroll to the top
            if (scrollContainer === window) {
                window.scrollTo(0, targetScrollPosition); // Move immediately for window
            } else {
                scrollContainer.scrollTop = targetScrollPosition; // Move immediately for element
            }
            console.log("Home pressed: Moved to top immediately.");
            return true; // Indicates immediate scroll
        } else if (key === 'End') {
            if (scrollContainer === window) {
                targetScrollPosition = document.documentElement.scrollHeight - window.innerHeight;
                window.scrollTo(0, targetScrollPosition); // Move immediately for window
            } else {
                targetScrollPosition = scrollContainer.scrollHeight - scrollContainer.clientHeight;
                scrollContainer.scrollTop = targetScrollPosition; // Move immediately for element
            }
            console.log("End pressed: Moved to bottom immediately.");
            return true; // Indicates immediate scroll
        }

        // Ensure target position doesn't exceed boundaries
        if (scrollContainer !== window) {
            targetScrollPosition = Math.max(
                0,
                Math.min(targetScrollPosition, scrollContainer.scrollHeight - scrollContainer.clientHeight)
            );
        } else {
            targetScrollPosition = Math.max(0, targetScrollPosition); // No upper limit for window scroll
        }

        console.log(`Target scroll position updated: ${targetScrollPosition}, Speed multiplier: ${scrollSpeedMultiplier}`);
        return false; // Indicates smooth scroll
    }

    function smoothScroll() {
        if (isScrolling) return; // Prevent multiple loops
        isScrolling = true;

        function step() {
            const scrollContainer = getScrollableElement();
            const currentScrollTop = scrollContainer === window ? window.scrollY : scrollContainer.scrollTop;

            if (Math.abs(currentScrollTop - targetScrollPosition) < 1) {
                isScrolling = false; // Stop scrolling if close enough
                console.log("Scrolling complete.");
                return;
            }

            const distance = Math.min(50, Math.abs(targetScrollPosition - currentScrollTop)); // Speed of scroll
            const direction = currentScrollTop < targetScrollPosition ? 1 : -1;

            if (scrollContainer === window) {
                window.scrollBy(0, distance * direction);
            } else {
                scrollContainer.scrollBy(0, distance * direction);
            }

            requestAnimationFrame(step); // Continue scrolling
        }

        requestAnimationFrame(step); // Start the loop
    }

    function handleKeyDown(event) {
        if (['PageDown', 'PageUp', 'Home', 'End'].includes(event.key)) {
            // Allow default behavior if input/textarea/contenteditable is focused
            if (isInputTextareaOrContentEditableFocused()) {
                console.log("Input/textarea/contenteditable focused: allowing default behavior.");
                return;
            }

            const now = Date.now();

            // Reset multiplier for a new key press
            if (!isKeyHeld) {
                isKeyHeld = true;
                scrollSpeedMultiplier = 1;
            } else if (now - lastKeyPressTime < multiplierResetTime) {
                // Increment multiplier for rapid presses
                scrollSpeedMultiplier += 1;
            } else {
                // Reset multiplier if timeout passed
                scrollSpeedMultiplier = 1;
            }

            scrollSpeedMultiplier = Math.min(scrollSpeedMultiplier, 5); // Limit the multiplier

            lastKeyPressTime = now; // Update last press time

            const immediateScroll = updateTargetScrollPosition(event.key);
            if (!immediateScroll) {
                smoothScroll();
            }
            event.preventDefault(); // Prevent default browser behavior
        }
    }

    function handleKeyUp(event) {
        if (['PageDown', 'PageUp', 'Home', 'End'].includes(event.key)) {
            isKeyHeld = false; // Reset key hold tracking
            clearTimeout(multiplierTimeout); // Clear any previous timeout
            multiplierTimeout = setTimeout(() => {
                if (Date.now() - lastKeyPressTime >= multiplierResetTime) {
                    scrollSpeedMultiplier = 1; // Reset speed multiplier after timeout
                    console.log("Speed multiplier reset due to inactivity.");
                }
            }, multiplierResetTime);
            console.log(`Key released: ${event.key}`);
        }
    }

    function addKeyListeners() {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        console.log("Keydown and keyup listeners added.");
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addKeyListeners);
    } else {
        addKeyListeners();
    }
}

// Initialize the script
initializeScrollHandler();
