var nexpect = require('nexpect');

proc = nexpect.spawn("python")
         .expect(">")
         .sendline("exit()")
         .run(function (err, stdout, exitcode) {
           if (!err) {
             console.log("output was: " + stdout);
           }
         });
