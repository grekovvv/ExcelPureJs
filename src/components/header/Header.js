import {ExcelComponent} from "@/core/ExcelComponent";

export class Header extends ExcelComponent {
    static className = 'excel__header';
    toHTML() {
        return ` <input type="text" class="input" value="Новая таблица">

            <div>
                <div class="button">
                    <span class="material-symbols-outlined">delete</span>
                </div>
                <div class="button">
                    <span class="material-symbols-outlined">logout</span>
                </div>
            </div>`;
    }
}
