/**
 * Created by dannyyassine on 2017-07-03.
 */

var schedule = require('node-schedule');
var verifyBuild = require('./../useCases/VerifyBuildTrigger');

const verifyProjectDiff = (project) => {
    return new Promise((resolve, reject) => {
        resolve(true);
    })
};

let interactor = verifyBuild({verifyProjectDiff});

const jobScheduler = (({ verifyBuild }) => {

    var jobs = [];

    const initJobs = (projects) => {
        //TODO check db of all projects
        for (let index in projects) {
            addSchedule(projects[index]);
        }
    };

    const addSchedule = (project) => {

        let newJob = schedule.scheduleJob('*/1 * * * *', function() {
            verifyBuild.verify(project);
        });

        jobs.push(newJob);
    };

    const cancelSchedule = (project) => {

        let job = jobs.filter((aJob) => {
            return aJob.id === project.repo.id
        });

        let index = jobs.indexOf(job);
        job.cancel();
        jobs.splice(index, 0);
    };

    return {
        initJobs,
        addSchedule,
        cancelSchedule
    }

})({
    verifyBuild: interactor
});

module.exports = jobScheduler;