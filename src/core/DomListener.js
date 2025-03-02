import {capitalize} from "@/core/utils";

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('DomListener requires $root element');
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            if (!this[method]) {
                const name = this.name || '';
                throw new Error(
                    `Method ${method} is not implemented in ${name} Component`
                );
            }
            // now this[method] always use with context
            this[method] = this[method].bind(this);
            // Тоже самое что и addEventListener
            this.$root.on(listener, this[method]);
        });
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method]);
        });
    }
}

// input => onInput
function getMethodName(eventName) {
    return 'on' + capitalize(eventName);
}
