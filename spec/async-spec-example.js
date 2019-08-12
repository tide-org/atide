'use babel';

var value;

describe("long asynchronous specs", () => {
  beforeEach((done) => {
    done();
  }, 1000);

  it("takes a long time", (done) => {
    setTimeout(() => {
      done();
    }, 9000);
  }, 10000);

  afterEach((done) => {
    done();
  }, 1000);
});
