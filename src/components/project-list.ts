import {Component} from "./base-component";
import {DragTarget} from "../models/drag-drop";
import {autobind} from "../decorators/autobind";
import {Project, ProjectStatus} from "../models/project";
import {projectState} from "../state/project-state";
import {ProjectItem} from "./project-item";

export class ProjectList extends Component<HTMLElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[] = [];
    @autobind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer!.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul")!;
            listEl.classList.add("droppable")
        }
    }
    @autobind
    dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData("text/plain");
        projectState.moveProject(projectId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    @autobind
    dragLeaveHandler(_: DragEvent): void {
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.remove("droppable")
    }
    constructor(private type: 'active' | 'finished') {
        super("project-list", "app", false, `${type}-projects`);
        this.configure();
        this.renderContent();
    }
    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(proj => {
                if (this.type === "active") {
                    return proj.status === ProjectStatus.Active;
                }
                return proj.status === ProjectStatus.Finished;
            })
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`) as HTMLElement;
        listEl.innerHTML = "";
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
        }
    }
}
