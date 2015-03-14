var test = require("tape");
var streamHandlebars = require("../");

test("regular handlebars API exists", function(t){
    t.ok(streamHandlebars.registerPartial);
    t.ok(streamHandlebars.compile);
    t.end();
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
