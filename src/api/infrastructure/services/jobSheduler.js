/**
 * Created by dannyyassine on 2017-07-03.
 */

const schedule = require('node-schedule');
let verifyBuild = require('../../application/useCases/VerifyBuildTrigger');
let remoteRepository = require('./remoteRepository');

let interactor = verifyBuild({
   data: remoteRepository()
});

const jobScheduler = (({ interactor }) => {

    let jobs = [];

    const initJobs = (projects) => {
        for (let index in projects) {
            addSchedule(projects[index]);
        }
    };

    const addSchedule = (project) => {

        const job = jobs.filter((aJob) => {
            return aJob.name === project.id;
        });

        if (job.length !== 0) {
            return;
        }

        let newJob = schedule.scheduleJob(project.id, '*/1 * * * *', function() {
            interactor.verify(project);
        });

        jobs.push(newJob);
    };

    const cancelSchedule = (project) => {

        let job = jobs.filter((aJob) => {
            return aJob.name === project.id
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
    interactor: interactor
});

module.exports = jobScheduler;