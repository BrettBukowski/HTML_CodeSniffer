var HTMLCS_RUNNER = new function() {

    this.reportLevels = {
        ALL: 0,
        ERRORS: 1,
        ERRORS_AND_WARNINGS: 2
    };

    this.reportLevel = this.reportLevels.ERRORS;

    this.run = function(standard) {
        this.testCount = 0;
        this.testedElements = {};

        console.log('TAP version 13');

        var self = this;
        HTMLCS.on('message', function(result) {
            self.output(result);
        });
        HTMLCS.on('start', function(elements) {
            // Prevent the topmost document element from
            // getting recorded twice.
            console.log('1..' + (elements.length - 1));
        });
        HTMLCS.process(standard, document, function() {
            Buffer.flush(self.testCount);
            console.log('done:' + ((TAP.failures) ? 'fail' : 'pass'));
        });
    };

    this.output = function(result) {
        if (shouldIgnoreResult(this.reportLevel, result.type)) return;

        var pathToNode = identifyNode(result.element).join(' > ');

        if (!this.testedElements[pathToNode]) {
            this.testedElements[pathToNode] = true;
            Buffer.flush(this.testCount);
            this.testCount++;
        }

        Buffer.add({
            type:       result.type,
            message:    result.msg,
            standard:   result.code,
            path:       pathToNode
        });
    };

    var Buffer = {
        _buffer: { pass: [], fail: [] },

        add: function(result) {
            if (result.type == HTMLCS.PASS) {
                this._buffer.pass.push(result);
            }
            else {
                this._buffer.fail.push(result);
            }
        },

        flush: function(testNumber) {
            if (!this._buffer.fail.length && !this._buffer.pass.length) return;

            if (this._buffer.fail.length) {
                TAP.emitNotOK(testNumber, this._buffer.fail[0].path);
                TAP.emitYamlNote(this._buffer.fail.reduce(function(prev, current) {
                    current.type = HTMLCS.MESSAGE_CODES[current.type];
                    return prev + TAP.yamlErrorDetailNote(current);
                }, TAP.yamlErrorNote(this._buffer.fail.length)));
            }
            else {
                TAP.emitOK(testNumber, this._buffer.pass[0].path);
            }

            this._buffer.pass.length =
            this._buffer.fail.length = 0;
        }
    };

    var TAP = {
        failures: 0,
        passes: 0,

        yamlErrorNote: function(errors) {
            return ['  errors: ' + errors, '  details: '].join('\n') + '\n';
        },

        yamlErrorDetailNote: function(note) {
            var entry = [];
            var indent = '    - ';
            for (var i in note) {
                entry.push(indent + i + ': ' + note[i]);
                indent = '      ';
            }
            return entry.join('\n') + '\n';
        },

        emitYamlNote: function(notes) {
            console.log(['  ---\n', notes, '  ...'].join(''));
        },

        emitOK: function(testNumber, tested) {
            this.passes++;
            console.log('ok ' + testNumber + ' ' + tested);
        },

        emitNotOK: function(testNumber, tested) {
            this.failures++;
            console.log('not ok ' + testNumber + ' ' + tested);
        }
    };

    // Produces a breadcrumb to the given node.
    // e.g. DOCUMENT > HTML > HEAD > LINK
    function identifyNode(node) {
        if (!node || !node.tagName) return [ 'DOCUMENT' ];

        var id = node.id ? '#' + node.id : '',
            tagName = node.tagName,
            className = node.className ? '.' + node.className.split(' ').join('.') : '',
            position = '';

        if (node.previousElementSibling && node.previousElementSibling.tagName == tagName) {
            var temp = node, count = 0;
            while (temp.previousElementSibling) {
                count++;
                temp = temp.previousElementSibling;
            }
            position = ' [' + count + '] ';
        }
        else if (node.nextElementSibling && node.nextElementSibling.tagName == tagName) {
            position = ' [0] ';
        }

        return identifyNode(node.parentNode).concat([tagName + id + className + position]);
    }

    function shouldIgnoreResult(currentReportLevel, resultType) {
        if (currentReportLevel == HTMLCS_RUNNER.reportLevels.ALL) return false;
        if (currentReportLevel == HTMLCS_RUNNER.reportLevels.ERRORS) {
            return resultType != HTMLCS.PASS && resultType != HTMLCS.ERROR;
        }
        if (currentReportLevel == HTMLCS_RUNNER.reportLevels.ERRORS_AND_WARNINGS) {
            return [HTMLCS.PASS, HTMLCS.WARNING, HTMLCS.ERROR].indexOf(resultType) == -1;
        }
    }
};
