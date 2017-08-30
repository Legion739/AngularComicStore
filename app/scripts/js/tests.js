// The tests

  describe('alertsService', function () {
    beforeEach(module('myApp.services'));

    it("return def", inject(function() {
        alertsService.getAlerts(function(result) {
          expect(result).toEqual("def");
          //
          console.log("Look here !!!");
        });
      }))
});
