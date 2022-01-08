"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCargo = exports.EventDeployer = exports.EventPackage = void 0;
class EventPackage {
    constructor(packageName, packageContents) {
        this.packageName = packageName;
        this.packageContents = packageContents;
    }
}
exports.EventPackage = EventPackage;
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
exports.EventDeployer = EventDeployer;
exports.EventCargo = {
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
    for (const pkg of exports.EventCargo.onmousedownPackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onmouseenter = (e) => {
    for (const pkg of exports.EventCargo.onmouseenterPackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onmouseleave = (e) => {
    for (const pkg of exports.EventCargo.onmouseleavePackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onmousemove = (e) => {
    for (const pkg of exports.EventCargo.onmousemovePackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onmouseout = (e) => {
    for (const pkg of exports.EventCargo.onmouseoutPackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onmouseover = (e) => {
    for (const pkg of exports.EventCargo.onmouseoverPackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onmouseup = (e) => {
    for (const pkg of exports.EventCargo.onmouseupPackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onkeyup = (e) => {
    for (const pkg of exports.EventCargo.onkeyupPackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
onkeydown = (e) => {
    for (const pkg of exports.EventCargo.onkeydownPackages.eventPackageManager) {
        pkg.packageContents(e);
    }
};
