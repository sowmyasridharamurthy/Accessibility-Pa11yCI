const fs = require('fs');
const pa11y = require('pa11y');
const htmlReporter = require('pa11y-reporter-html');
const targetUrl = 'https://www.owasp.org/';
const reportsDir = "reports";

if (!fs.existsSync(reportsDir))
    fs.mkdirSync(reportsDir);

runAccessibilityTest();

async function runAccessibilityTest() {
    try {

        const result = await pa11y(targetUrl, {

            // Run some actions before the tests e.g. login to the site
            actions: [
                //'set field #Username to username',
                //'set field #Password to password!',
                //'click element #Submit',
                //`wait for url to be ${targetUrl}`,
                ],

            //Take a screenshot after running above actions
            screenCapture: `${reportsDir}/screenshot.png`,

            // Log what's happening to the console
            log: {
                debug: console.log,
                error: console.error,
                info: console.log
            }
        });

        const html = await htmlReporter.results(result);

        fs.writeFile(`${reportsDir}/pa11y-test-report.html`, html, (err) => {
             if (err) throw err;
        })

    } catch (error) {
        console.error(error.message);
    }
}
