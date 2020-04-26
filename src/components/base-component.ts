export abstract class Component<T extends HTMLElement, U extends HTMLElement>{
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElementId: string, insertAtstart: boolean, newElId?: string) {
        this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId) as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElId) {
            this.element.id = newElId;
        }
        this.attach(insertAtstart);
    }
    private attach(insertAtStart: boolean) {
        if (insertAtStart) {
            this.hostElement.insertAdjacentElement("afterbegin", this.element);
        } else {
            this.hostElement.insertAdjacentElement("beforeend", this.element);
        }
    }
    abstract configure(): void;
    abstract renderContent(): void;
}
