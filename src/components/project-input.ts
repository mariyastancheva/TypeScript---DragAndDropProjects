import {Component} from "./base-component";
import {Validatable, validate} from "../util/validation";
import {autobind} from "../decorators/autobind";
import {projectState} from "../state/project-state";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleElement: HTMLInputElement;
    descriptionElement: HTMLInputElement;
    peopleElement: HTMLInputElement;

    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleElement = this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionElement = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleElement = this.element.querySelector("#people") as HTMLInputElement;
        this.configure();
    }

    renderContent() { };
    configure() {
        this.element.addEventListener("submit", this.submitHandler)
    }
    private emptyInputs() {
        this.titleElement.value = "";
        this.descriptionElement.value = "";
        this.peopleElement.value = "";
    }
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleElement.value;
        const enteredDescription = this.descriptionElement.value;
        const enteredPeople = this.peopleElement.value;
        debugger
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
            maxLength: 50,
            minLength: 1
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            maxLength: 100,
            minLength: 1
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };
        if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
            alert("invalid input")
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.emptyInputs();
        }
    }
}
