'use strict';

/* global chrome */

module.exports = function(done) {
  chrome.devtools.inspectedWindow.eval(`!!(
    Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length || window.React || (window.require && (require('react') || require('React')))
  )`, function(pageHasBaobab) {
    done(pageHasBaobab);
  });
};
