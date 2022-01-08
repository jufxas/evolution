class EventPackage {
    constructor(packageName, packageContents) {
        this.packageName = packageName;
        this.packageContents = packageContents;
    }
}
class EventDeployer {
    constructor() {
        this.eventPackageManager = [];
    }
    shipPackage(pkg) {
        this.eventPackageManager.push(pkg);
    }
    removePackage(pkgName) {
        let previousEventPackageManagerLength = this.eventPackageManager.length;
        this.eventPackageManager = this.eventPackageManager.filter(x => x.packageName !== pkgName);
        if (this.eventPackageManager.length - previousEventPackageManagerLength === 0)
            throw `Did not find package named '${pkgName}'`;
    }
}

const EventCargo = {
    onmousedownPackages: new EventDeployer(),
    onmouseenterPackages: new EventDeployer(),
    onmouseleavePackages: new EventDeployer(),
    onmousemovePackages: new EventDeployer(),
    onmouseoutPackages: new EventDeployer(),
    onmouseoverPackages: new EventDeployer(),
    onmouseupPackages: new EventDeployer(),
    onkeyupPackages: new EventDeployer(),
    onkeydownPackages: new EventDeployer(),
};
onmousedown = (e) => {
    for (const pkg of EventCargo.onmousedownPackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onmouseenter = (e) => {
    for (const pkg of EventCargo.onmouseenterPackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onmouseleave = (e) => {
    for (const pkg of EventCargo.onmouseleavePackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onmousemove = (e) => {
    for (const pkg of EventCargo.onmousemovePackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onmouseout = (e) => {
    for (const pkg of EventCargo.onmouseoutPackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onmouseover = (e) => {
    for (const pkg of EventCargo.onmouseoverPackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onmouseup = (e) => {
    for (const pkg of EventCargo.onmouseupPackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onkeyup = (e) => {
    for (const pkg of EventCargo.onkeyupPackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onkeydown = (e) => {
    for (const pkg of EventCargo.onkeydownPackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};



let evt = {
    EventPackage: EventPackage, 
    EventDeployer: EventDeployer, 
    EventCargo: EventCargo, 
}