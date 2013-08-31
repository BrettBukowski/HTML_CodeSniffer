var HTMLCS_RUNNER = new function() {
    this.run = function(standard) {
        var self = this;

        // At the moment, it passes the whole DOM document.
        HTMLCS.process(standard, document, function() {
            var messages = HTMLCS.getMessages();
            var length   = messages.length;
            for (var i = 0; i < length; i++) {
                self.output(messages[i]);
            }

            console.log('done');
        });
    };

    this.identifyNode = function(node) {
        if (!node || !node.tagName) return [];

        var id = node.id ? '#' + node.id : '',
            className = node.className ? '.' + node.className.split(' ').join('.') : '';

        return this.identifyNode(node.parentNode).concat([node.tagName + id + className]);
    };

    this.output = function(msg) {
        // Simple output for now.
        var typeName = 'UNKNOWN';
        var pathToElement = this.identifyNode(msg.element).join(' > ');
        switch (msg.type) {
            case HTMLCS.ERROR:
                typeName = 'ERROR';
            break;

            case HTMLCS.WARNING:
                typeName = 'WARNING';
            break;

            case HTMLCS.NOTICE:
                typeName = 'NOTICE';
            break;
        }//end switch

        console.log([typeName, msg.code, msg.msg, pathToElement].join('|'));
    };

};
