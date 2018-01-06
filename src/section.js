function Section(volume, sectionName){
    this.sectionName = sectionName;
    this.sectionFolder = volume.makeFolderInVolume(volume.volumeFolder, this.sectionName);

    this.makeAllIssuesInSection = function(){
        //makes a sectionIssueFolder for each issue
        var allIssueFolders = [];
        for(var i in volume.allIssueObjects){
            var issue = volume.allIssueObjects[i];
            var sectionIssueFolder = IssueFolder(this, issue, volume);
            allIssueFolders.push(sectionIssueFolder);
        }
        return allIssueFolders;
    };

    //Logger.log("Trying to make issue folders....");
    this.allSectionIssueFolders = this.makeAllIssuesInSection();
}