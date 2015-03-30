var test = require("tape");
var streamHandlebars = require("../");

test("regular handlebars API exists", function(t){
    t.ok(streamHandlebars.registerPartial);
    t.ok(streamHandlebars.compile);
    t.end();
});

test("events", function(t){
    t.plan(3);
    var data = '{ "message": "test, yeah?" }';
    var compileStream = streamHandlebars.createCompileStream("result: {{message}}");
    compileStream.on("end", t.pass.bind(null, "end fired"));
    compileStream.on("finish", t.pass.bind(null, "finish fired"));
    compileStream.on("readable", function(){
        if (this.read()){
            t.pass("readable fired");
        }
    });
    compileStream.end(data);
});

test("text interface", function(t){
    t.plan(1);
    var data = '{ "message": "test, yeah?" }';
    var compileStream = streamHandlebars.createCompileStream("result: {{message}}");
    compileStream.on("readable", function(){
        var chunk = this.read();
        if (chunk){
            t.strictEqual(chunk.toString(), "result: test, yeah?");
        }
    })
    compileStream.end(data);
});

test("text interface with default data", function(t){
    t.plan(1);
    var input = '{ "message": "test, yeah?" }';
    var template = "result {{one}}: {{message}}";
    var compileStream = streamHandlebars.createCompileStream(template, { data: { one: 1 }});
    compileStream.on("readable", function(){
        var chunk = this.read();
        if (chunk){
            t.strictEqual(chunk.toString(), "result 1: test, yeah?");
        }
    });
    compileStream.end(input);
});

test("objectMode", function(t){
    t.plan(1);
    var data = { message: "objectMode", other: "something" };
    var compileStream = streamHandlebars.createCompileStream(
        "one: {{message}}, two: {{other}}", 
        { objectMode: true }
    );
    compileStream.on("readable", function(){
        var chunk = this.read();
        if (chunk){
            t.strictEqual(chunk.toString(), "one: objectMode, two: something");
        }
    })
    compileStream.end(data);
});
