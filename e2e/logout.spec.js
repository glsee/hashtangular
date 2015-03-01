'use strict';

describe('The login view', function () {
  beforeEach(function () {
    browser.get('http://localhost:3000/#/logout');
  });

  it('should redirect to the /login path when the user is not logged in', function() {});

  it('should redirect to /login path after successful log-outs', function () {});

  it('should redirect failed log-outs to /', function () {});

});
