import { Draggable } from "../models/drag-drop";
import { autobind } from "../decorators/autobind";
import { Component } from "./base-component";
import { Project } from "../models/project";

export class ProjectItem extends Component<HTMLUListElement, HTMLElement> implements Draggable {

    @autobind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData("text/plain", this.project.id);
        event.dataTransfer!.effectAllowed = "move";
        console.log(event.dataTransfer);
        console.log(event.dataTransfer!.getData("text/plain"))
    }
    @autobind
    dragEndHnadler(event: DragEvent): void {
        console.log(event)
    }
    private project: Project;
    get persons() {
        if (this.project.people === 1) {
            return "1 person";
        }
        return `${this.project.people} persons`;
    }
    constructor(hostId: string, project: Project) {
        super("single-project", hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);

    };
    renderContent() {
        this.element.querySelector("h2")!.textContent = this.project.title!;
        this.element.querySelector("h3")!.textContent = this.persons + " assigned";
        this.element.querySelector("p")!.textContent = this.project.description;
    };
}
