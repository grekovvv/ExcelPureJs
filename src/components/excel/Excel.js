import {$} from "@/core/dom";

export class Excel {
    constructor(selector, options) {
        // $ в названии для удобства, чтобы понимать, что переменная есть элемент разметки.
        this.$el = $(selector);
        this.components = options.components || [];
    }

    getRoot() {
        const $root = $.create('div', 'excel');

        this.components = this.components.map((Component) => {
            const $el = $.create('div', Component.className);
            const component = new Component($el);
            $el.html(component.toHTML());
            $root.append($el);
            return component;
        });
        return $root;
    }

    render() {
        this.$el.append(this.getRoot());
        this.components.forEach(component => {
            component.init();
        });
        // Можно создавать руками
        // const node = document.createElement("div");
        // node.textContent = 'Test';
        // this.$el.append(node);
    }
}
