export class EventPackage {
    packageName: string  
    packageContents: ((e?: any) => void)    // for ref, 'e' could be MouseEvent or KeyboardEvent
    constructor(packageName: string,  packageContents: (e?: any) => void) {
        this.packageName = packageName
        this.packageContents = packageContents
    }
}

export class EventDeployer {
    eventPackageManager: EventPackage[] = []
    shipPackage(pkg: EventPackage) {
        this.eventPackageManager.push(pkg)
    }
    removePackage(pkgName: string) {
        let previousEventPackageManagerLength = this.eventPackageManager.length
        this.eventPackageManager = this.eventPackageManager.filter(x => x.packageName !== pkgName)
        if (this.eventPackageManager.length - previousEventPackageManagerLength === 0) throw `Did not find package named '${pkgName}'`
    }
}
export const EventCargo = {
    onmousedownPackages:    new EventDeployer(), 
    onmouseenterPackages:   new EventDeployer(),
    onmouseleavePackages:   new EventDeployer(),
    onmousemovePackages:    new EventDeployer(),
    onmouseoutPackages:     new EventDeployer(),
    onmouseoverPackages:    new EventDeployer(),
    onmouseupPackages:      new EventDeployer(),
    onkeyupPackages:        new EventDeployer(), 
    onkeydownPackages:      new EventDeployer(), 
}

onmousedown = (e: MouseEvent) => {
    for (const pkg of EventCargo.onmousedownPackages.eventPackageManager)  {
        pkg.packageContents(e)
    }
}

onmouseenter = (e: MouseEvent) => {
    for (const pkg of EventCargo.onmouseenterPackages.eventPackageManager)  {
        pkg.packageContents(e)
    }
}

onmouseleave = (e: MouseEvent) => {
    for (const pkg of EventCargo.onmouseleavePackages.eventPackageManager)  {
        pkg.packageContents(e)
    }
}

onmousemove = (e: MouseEvent) => {
    for (const pkg of EventCargo.onmousemovePackages.eventPackageManager)  {
        pkg.packageContents(e)
    }
}

onmouseout = (e: MouseEvent) => {
    for (const pkg of EventCargo.onmouseoutPackages.eventPackageManager)  {
        pkg.packageContents(e)
    }
}

onmouseover = (e: MouseEvent) => {
    for (const pkg of EventCargo.onmouseoverPackages.eventPackageManager)  {
        pkg.packageContents(e)
    }
}

onmouseup = (e: MouseEvent) => {
    for (const pkg of EventCargo.onmouseupPackages.eventPackageManager)  {
        pkg.packageContents(e)
    }
}



onkeyup = (e: KeyboardEvent) => {
    for (const pkg of EventCargo.onkeyupPackages.eventPackageManager)  {
        pkg.packageContents(e)
    }
}

onkeydown = (e: KeyboardEvent) => {
    for (const pkg of EventCargo.onkeydownPackages.eventPackageManager)  {
        pkg.packageContents(e)
    }
}