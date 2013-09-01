var page = require('webpage').create(),
    system = require('system'),
    standards = ['WCAG2A', 'WCAG2AA', 'WCAG2AAA'],
    address, standard, reportLevel;

if (system.args.length < 3 || system.args.length > 4) {
    console.log('Usage: phantomjs HTMLCS_Run.js URL standard [report level]');
    console.log('  standards:     ' + standards.join(', '));
    console.log('  report levels: ALL, ERRORS_AND_WARNINGS, ERRORS (default)');
    phantom.exit();
} else {
    address  = system.args[1];
    standard = system.args[2];
    reportLevel = system.args[3];
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit();
        } else {
            window.setTimeout(function () {

                // Override onConsoleMessage function for outputting.
                page.onConsoleMessage = function (msg) {
                    if (msg === 'done:pass') phantom.exit(0);
                    if (msg === 'done:fail') phantom.exit(1);
                    console.log(msg);
                };

                // Include all sniff files.
                var fs = require('fs');
                var injectAllStandards = function(dir) {
                    var files = fs.list(dir),
                        filesLen = files.length,
                        absPath = '';
                    for (var i = 0; i < filesLen; i++) {
                        if (files[i] === '.' || files[i] === '..') continue;

                        absPath = fs.absolute(dir + '/' + files[i]);
                        if (fs.isDirectory(absPath) === true) {
                            injectAllStandards(absPath);
                        } else if (fs.isFile(absPath) === true) {
                            page.injectJs(absPath);
                        }
                    }
                };

                injectAllStandards('../Standards');
                page.injectJs('../HTMLCS.js');
                page.injectJs('runner.js');

                if (standards.indexOf(standard) == -1) {
                    console.log('Unknown standard.');
                    phantom.exit();
                }
                page.evaluate(function(standard, reportLevel) {
                    if (reportLevel) {
                        HTMLCS_RUNNER.reportLevel = HTMLCS_RUNNER.reportLevels[reportLevel] || HTMLCS_RUNNER.reportLevels.ALL;
                    }
                    HTMLCS_RUNNER.run(standard);
                }, standard, reportLevel);
            }, 200);
        }//end if
    });//end
}//end if